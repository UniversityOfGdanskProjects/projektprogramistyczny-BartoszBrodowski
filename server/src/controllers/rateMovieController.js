const session = require('../config/connector');

exports.rateMovie = async (movieId, userId, rating) => {
	try {
		await session.run(
			`MATCH (m:Movie { id: $movieId }), (u:User { id: $userId })
            MERGE (m)<-[r:RATED]-(u)
			WITH m, r 
            CALL apoc.create.setRelProperty(r, "rating", $rating) YIELD rel
			RETURN rel`,
			{ userId, movieId, rating }
		);
		return { message: 'Movie has been rated' };
	} catch (err) {
		throw new Error(err);
	}
};
