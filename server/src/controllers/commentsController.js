const session = require('../config/connector');

exports.commentMovie = async (movieId, userId, comment) => {
	try {
		const user = await session.run('MATCH (u:User { id: $userId }) RETURN u', { userId });
		const movie = await session.run('MATCH (m:Movie { id: $movieId }) RETURN m', { movieId });
		if (user) {
			if (movie) {
				await session.run(
					`MATCH (m:Movie { id: $movieId }), (u:User { id: $userId })
					CALL apoc.create.relationship(u, 'COMMENTED', {comment: apoc.text.capitalize($comment), id: apoc.create.uuid()}, m) YIELD rel
					RETURN rel`,
					{ movieId, userId, comment }
				);
				return { message: 'Comment has been added' };
			}
			return Error('Movie not found');
		}
		return Error('User not found');
	} catch (err) {
		throw new Error(err);
	}
};
