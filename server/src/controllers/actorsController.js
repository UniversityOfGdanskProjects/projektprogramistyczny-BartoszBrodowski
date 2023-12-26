const session = require('../config/connector');

exports.getActorsLatestMovie = async (id) => {
	try {
		const actor = await session.run(
			`MATCH (p:Person { id: '${id}' })-[r:ACTED_IN]->(m:Movie) RETURN p,r,m`
		);
		if (actor.records[0]) {
			const result = await session.run(
				`MATCH (p:Person { id: $id })-[:ACTED_IN]->(m:Movie)
				WITH p, m
				RETURN p.name AS person, apoc.agg.last(m) AS latestMovie`,
				{ id }
			);
			return result.records[0].get('latestMovie').properties;
		} else {
			return { error: 'Actor not found' };
		}
	} catch (err) {
		throw new Error(err);
	}
};

exports.updateActor = (id, name, born, popularity, profile_image) => {
	return new Promise((resolve, reject) => {
		session
			.run(
				`MATCH (p:Person { id: '${id}' })
				SET p.name = '${name}', p.born = '${born}', p.popularity = '${popularity}', p.profile_image = '${profile_image}'
				RETURN p
				`
			)
			.then((result) => {
				resolve({
					message: 'Actor has been updated',
					data: result.records[0].get('p').properties,
				});
			})
			.catch((err) => {
				reject({ error: err });
			});
	});
};

exports.deleteActor = async (id) => {
	try {
		const actor = await session.run(
			`MATCH (p:Person { id: '${id}' })-[r:ACTED_IN]->(m:Movie) RETURN p,r,m`
		);
		if (actor.records[0]) {
			await session.run(
				`MATCH (p:Person { id: '${id}' })-[r:ACTED_IN]->(m:Movie)
				DETACH DELETE p, r
				RETURN p`
			);
			return { message: `Actor with id: ${id} has been deleted` };
		} else {
			return { error: 'Actor not found' };
		}
	} catch (err) {
		throw new Error(err);
	}
};
