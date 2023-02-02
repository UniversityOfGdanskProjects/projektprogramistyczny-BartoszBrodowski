const session = require('../config/connector');

exports.rateMovie = async (title, email, rating) => {
	try {
		const result = await session.run(
			`MATCH (m:Movie { title: $title }), (u:User { email: $email })
            MERGE (m)<-[r:RATED]-(u)
            SET r.rating = $rating
            RETURN m.title as title, r.rating as rating`,
			{ title, email, rating }
		);
		const movie = result.records.map((record) => ({
			title: record.get('title'),
			rating: record.get('rating'),
		}));
		return movie;
	} catch (err) {
		throw new Error(err);
	}
};
