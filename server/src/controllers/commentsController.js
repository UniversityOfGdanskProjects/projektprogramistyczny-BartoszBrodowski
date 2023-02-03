const session = require('../config/connector');

exports.commentMovie = async (email, title, comment) => {
	try {
		const user = await session.run('MATCH (u:User { email: $email }) RETURN u', { email });
		const movie = await session.run('MATCH (m:Movie { title: $title }) RETURN m', { title });
		if (user) {
			if (movie) {
				await session.run(
					`MATCH (m:Movie { title: $title }), (u:User { email: $email })
					CALL apoc.create.relationship(u, 'COMMENTED', {comment: apoc.text.capitalize($comment), id: apoc.create.uuid()}, m) YIELD rel
					RETURN rel`,
					{ email, title, comment }
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

exports.deleteComment = async (comment_id, user_id) => {
	try {
		await session.run(
			`MATCH (m:Movie)<-[c:COMMENTED]-(u:User { id: $user_id }})
			WHERE c.id = $comment_id
			DETACH DELETE c
			RETURN m.title as title`,
			{ comment_id, user_id }
		);
		return { message: `Comment with id: ${comment_id} has been deleted` };
	} catch (err) {
		throw new Error(err);
	}
};
