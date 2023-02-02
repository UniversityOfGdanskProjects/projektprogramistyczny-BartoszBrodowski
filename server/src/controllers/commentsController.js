const session = require('../config/connector');

exports.commentMovie = async (email, title, comment) => {
	try {
		const user = await session.run('MATCH (u:User { email: $email }) RETURN u', { email });
		if (user) {
			const result = await session.run(
				`MATCH (m:Movie { title: $title }), (u:User { email: $email })
                MERGE (m)<-[c:COMMENTED]-(u)
                SET c.comment = $comment
                RETURN m.title as title, c.comment as comment`,
				{ email, title, comment }
			);
			return result.records.map((record) => ({
				title: record.get('title'),
				comment: record.get('comment'),
			}));
		}
		return Error('User not found');
	} catch (err) {
		throw new Error(err);
	}
};
