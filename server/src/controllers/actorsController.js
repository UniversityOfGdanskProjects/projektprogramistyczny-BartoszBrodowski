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
