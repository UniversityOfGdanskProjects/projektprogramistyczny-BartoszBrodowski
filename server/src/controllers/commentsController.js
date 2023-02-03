const session = require('../config/connector');

exports.commentMovie = async (email, title, comment, id) => {
	try {
		const user = await session.run('MATCH (u:User { email: $email }) RETURN u', { email });
		if (user) {
			const result = await session.run(
				`MATCH (m:Movie { title: $title }), (u:User { email: $email })
                CREATE (m)<-[c:COMMENTED]-(u)
                SET c.comment = $comment, c.id = $id
                RETURN m.title as title, c.comment as comment, c.id as id`,
				{ email, title, comment, id }
			);
			return result.records.map((record) => ({
				title: record.get('title'),
				comment: record.get('comment'),
				id: record.get('id'),
			}));
		}
		return Error('User not found');
	} catch (err) {
		throw new Error(err);
	}
};

exports.deleteComment = async (id) => {
	try {
		const result = await session.run(
			`MATCH (m:Movie)<-[c:COMMENTED]-(u:User)
			WHERE c.id = $id
			DETACH DELETE c
			RETURN m.title as title`,
			{ id }
		);
		return `Comment with id: ${id} has been deleted`;
	} catch (err) {
		throw new Error(err);
	}
};
