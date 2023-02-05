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
