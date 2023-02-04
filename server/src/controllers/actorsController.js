const session = require('../config/connector');

exports.getActorsLatestMovie = async (id) => {
	try {
		const result = await session.run(
			`MATCH (p:Person { id: $id })-[:ACTED_IN]->(m:Movie)
            WITH p, m
            RETURN p.name AS person, apoc.agg.last(m) AS latestMovie`,
			{ id }
		);
		return result.records[0].get('latestMovie').properties;
	} catch (err) {
		throw new Error(err);
	}
};

exports.updateActorsOnMovie = async (movieId, actorsList) => {
	try {
		const movie = await session.run('MATCH (m:Movie { id: $movieId }) RETURN m', { movieId });
		if (movie.records[0]) {
			await session.run(
				`MATCH (m:Movie { id: $movieId })-[a:ACTED_IN]-(act:Person)
				DETACH DELETE a
				WITH m
				UNWIND $actorsList AS actor
				MERGE (newActor:Person { name: actor })
				MERGE (m)<-[:ACTED_IN]-(newActor)`,
				{ movieId, actorsList }
			);
			return { message: "Actors' list has been updated" };
		} else {
			return { message: "Movie doesn't exist" };
		}
	} catch (err) {
		throw new Error(err);
	}
};
