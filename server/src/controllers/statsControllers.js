const session = require('../config/connector');

exports.generatePopularityForMovies = async () => {
	try {
		await session.run(
			`MATCH (m:Movie)
			WITH 1 AS min, 100 AS max, m
			SET m.popularity = floor(rand() * (max - min + 1) + min)`
		);
		return { message: 'Popularity for movies has been generated' };
	} catch (err) {
		throw new Error(err);
	}
};

exports.generatePopularityForActors = async () => {
	try {
		await session.run(
			`MATCH (p:Person)-[:ACTED_IN]->(m:Movie)
			WITH 1 AS min, 100 AS max, m, p
            SET p.popularity = floor(rand() * (max - min + 1) + min)`
		);
		return { message: 'Popularity for actors has been generated' };
	} catch (err) {
		throw new Error(err);
	}
};

exports.generatePopularityForDirectors = async () => {
	try {
		await session.run(
			`MATCH (p:Person)-[:DIRECTED]->(m:Movie)
			WITH 1 AS min, 100 AS max, m, p
			SET p.popularity = floor(rand() * (max - min + 1) + min)`
		);
		return { message: 'Popularity for directors has been generated' };
	} catch (err) {
		throw new Error(err);
	}
};

exports.getOldestMovieInDatabase = async () => {
	try {
		const result = await session.run(
			`MATCH (m:Movie)
			RETURN m
			ORDER BY m.released
			LIMIT 1`
		);
		return result.records[0]._fields[0].properties;
	} catch (err) {
		throw new Error(err);
	}
};

exports.getAmountOfUsers = async () => {
	try {
		const result = await session.run(
			`MATCH (u:User)
			RETURN count(u) AS amount`
		);
		return result.records[0]._fields[0].low;
	} catch (err) {
		throw new Error(err);
	}
};

exports.getAmountOfMovies = async () => {
	try {
		const result = await session.run(
			`MATCH (m:Movie)
			RETURN count(m) AS amount`
		);
		return result.records[0]._fields[0].low;
	} catch (err) {
		throw new Error(err);
	}
};

exports.getAmountOfActors = async () => {
	try {
		const result = await session.run(
			`MATCH (p:Person)-[:ACTED_IN]->(m:Movie)
			RETURN count(DISTINCT p) AS amount`
		);
		return result.records[0]._fields[0].low;
	} catch (err) {
		throw new Error(err);
	}
};

exports.getAmountOfDirectors = async () => {
	try {
		const result = await session.run(
			`MATCH (p:Person)-[:DIRECTED]->(m:Movie)
			RETURN count(DISTINCT p) AS amount`
		);
		return result.records[0]._fields[0].low;
	} catch (err) {
		throw new Error(err);
	}
};

exports.getOldestActorInDatabase = async () => {
	try {
		const result = await session.run(
			`MATCH (p:Person)-[:ACTED_IN]->(m:Movie)
			RETURN p
			ORDER BY p.born
			LIMIT 1`
		);
		return result.records.map((record) => ({
			name: record.get('p').properties.name,
			born: record.get('p').properties.born.low,
			popularity: record.get('p').properties.popularity,
		}))[0];
	} catch (err) {
		throw new Error(err);
	}
};

exports.statsForMovie = async (movieId) => {
	try {
		const result = await session.run(
			`MATCH (m:Movie { id: $movieId })<-[a:ACTED_IN]-(act:Person), (m)<-[d:DIRECTED]-(dir:Person)
			WITH m, min(act.born) AS oActorAge, max(act.born) AS yActorAge, min(dir.born) AS yDirectorAge, max(dir.born) AS oDirectorAge, max(act.popularity) AS yActorPop, avg(act.popularity) AS avgActorPop
			MATCH (yAct:Person)-[:ACTED_IN]->(m) WHERE yAct.born = yActorAge
			WITH m, oActorAge, yActorAge, yAct, yDirectorAge, oDirectorAge, yActorPop, round(avgActorPop, 2) as avgActorPop
			OPTIONAL MATCH (m)<-[c:COMMENTED]-(u:User)
			WITH m, oActorAge, yActorAge, yAct, yDirectorAge, oDirectorAge, yActorPop, count(c) AS comments, avgActorPop
			MATCH (oAct:Person)-[:ACTED_IN]->(m) WHERE oAct.born = oActorAge
			WITH m, oActorAge, yActorAge, yAct, oAct, yDirectorAge, oDirectorAge, yActorPop, comments, avgActorPop
			MATCH (yDir:Person)-[:DIRECTED]->(m) WHERE yDir.born = yDirectorAge
			WITH m, oActorAge, yActorAge, yAct, oAct, yDirectorAge, oDirectorAge, yDir, yActorPop, comments, avgActorPop
			MATCH (oDir:Person)-[:DIRECTED]->(m) WHERE oDir.born = oDirectorAge
			WITH m, oActorAge, yActorAge, yAct, oAct, yDirectorAge, oDirectorAge, yDir, oDir, yActorPop, comments, avgActorPop
			MATCH (popularActor:Person)-[:ACTED_IN]->(m) WHERE popularActor.popularity = yActorPop
			WITH m, oActorAge, yActorAge, yAct, oAct, yDirectorAge, oDirectorAge, yDir, oDir, yActorPop, comments, popularActor, avgActorPop
			MATCH (m)<-[r:RATED]-(u:User)
			WITH m, oActorAge, yActorAge, yAct, oAct, yDirectorAge, oDirectorAge, yDir, oDir, yActorPop, comments, avg(r.rating) AS avgRating, popularActor, avgActorPop
			RETURN m, oActorAge, yActorAge, yAct.name as youngestActor, oAct.name as oldestActor, yDirectorAge, oDirectorAge, yDir.name as youngestDirector, oDir.name as oldestDirector, popularActor.name as mostPopularActor, yActorPop as maxActorPopularity, comments, avgRating, avgActorPop`,
			{ movieId }
		);
		// return result;
		return result.records.map((record) => ({
			youngestActor: record.get('youngestActor') + ', born ' + record.get('yActorAge')['low'],
			oldestActor: record.get('oldestActor') + ', born ' + record.get('oActorAge')['low'],
			youngestDirector:
				record.get('youngestDirector') + ', born ' + record.get('yDirectorAge')['low'],
			oldestDirector:
				record.get('oldestDirector') + ', born ' + record.get('oDirectorAge')['low'],
			mostPopularActor:
				record.get('mostPopularActor') + ', score: ' + record.get('maxActorPopularity'),
			commentsAmount: record.get('comments')['low'],
			movieRating: record.get('avgRating'),
			avgActorPopularity: record.get('avgActorPop'),
		}))[0];
	} catch (err) {
		throw new Error(err);
	}
};
