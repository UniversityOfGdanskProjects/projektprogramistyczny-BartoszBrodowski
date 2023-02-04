const session = require('../config/connector');

exports.rateMovie = async (movieId, userId, rating) => {
	try {
		await session.run(
			`MATCH (m:Movie { id: $movieId }), (u:User { id: $userId })
            MERGE (m)<-[r:RATED]-(u)
            SET r.rating = $rating`,
			{ userId, movieId, rating }
		);
		return { message: 'Movie has been rated' };
	} catch (err) {
		throw new Error(err);
	}
};
