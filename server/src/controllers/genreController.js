const session = require('../config/connector');

exports.getAllGenres = async () => {
	try {
		const result = await session.run('MATCH (g:Genre) RETURN g');
		return result.records.map((record) => record._fields[0].properties);
	} catch (err) {
		throw new Error(err);
	}
};

exports.addGenre = async (name) => {
	try {
		await session.run(
			'CALL apoc.create.node(["Genre"], { id: apoc.create.uuid(), name: $name })',
			{ name }
		);
		return { message: 'Genre has been added' };
	} catch (err) {
		throw new Error(err);
	}
};

exports.deleteGenre = async (genreId) => {
	try {
		const result = await session.run('MATCH (g:Genre { id: $genreId }) DETACH DELETE g', {
			genreId,
		});
		if (result.summary.counters._stats.nodesDeleted === 0) {
			return Error('Genre not found');
		}
		return { message: 'Genre has been deleted' };
	} catch (err) {
		throw new Error(err);
	}
};
