const session = require('../config/connector');

exports.getTopMovies = async () => {
	try {
		const result = await session.run(
			'MATCH (m:Movie)<-[:RATED]-(u:User) RETURN m.title AS title, avg(toFloat(u.rating)) AS rating ORDER BY rating DESC LIMIT 10'
		);
		const topMovies = result.records.map((record) => ({
			title: record.get('title'),
			rating: record.get('rating'),
		}));
		return topMovies;
	} catch (err) {
		throw new Error(err);
	}
};
