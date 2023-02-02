const session = require('../config/connector');

exports.addMovie = async (
	email,
	poster_image,
	released,
	tagline,
	title,
	directors,
	actors,
	genre
) => {
	try {
		const user = await session.run('MATCH (u:User { email: $email }) RETURN u', { email });
		if (user) {
			const result = await session.run(
				`CREATE (m:Movie { poster_image: $poster_image, released: $released, tagline: $tagline, title: $title, addedBy: $email })
                WITH m
                MATCH (m)
                UNWIND $directors AS director
                MERGE (d:Person { name: director })
                MERGE (m)<-[:DIRECTED]-(d)
                WITH m
                MATCH (m)
                UNWIND $actors AS actor
                MERGE (a:Person { name: actor })
                MERGE (m)<-[:ACTED_IN]-(a)
                WITH m
                MATCH (m)
                UNWIND $genre AS genre
                MERGE (g:Genre { name: genre })
                MERGE (m)-[:TYPE]->(g)
                RETURN m`,
				{ email, poster_image, released, tagline, title, directors, actors, genre }
			);
			const movie = result.summary.query.parameters;
			return movie;
		}
		return Error('User not found');
	} catch (err) {
		throw new Error(err);
	}
};
