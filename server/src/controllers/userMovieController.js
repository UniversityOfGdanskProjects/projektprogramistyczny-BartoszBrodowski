const session = require('../config/connector');

exports.addMovie = async (id, poster_image, released, tagline, title, directors, actors, genre) => {
	try {
		const user = await session.run('MATCH (u:User { id: $id }) RETURN u', { id });
		if (user) {
			await session.run(
				`CREATE (m:Movie { id: apoc.create.uuid(), poster_image: $poster_image, released: $released, tagline: $tagline, title: $title, addedBy: $id })
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
				{ id, poster_image, released, tagline, title, directors, actors, genre }
			);
			return { message: 'Movie has been added' };
		}
		return Error('User not found');
	} catch (err) {
		throw new Error(err);
	}
};

exports.deleteMovie = async (userId, movieId) => {
	try {
		const user = await session.run('MATCH (u:User { id: $userId }) RETURN u', { userId });
		if (user) {
			const result = await session
				.run(
					`MATCH (m:Movie { id: $movieId })
					DETACH DELETE m`,
					{ userId, movieId }
				)
				.then((res) => res.summary.counters._stats.nodesDeleted > 0);
			if (result) {
				return { message: 'Movie has been deleted' };
			} else {
				return Error('Movie not found');
			}
		}
		return Error('User not found');
	} catch (err) {
		throw new Error(err);
	}
};

exports.updateMovie = async (
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
				`MATCH (m:Movie { title: $title, addedBy: $email })
				SET m.poster_image = $poster_image, m.released = $released, m.tagline = $tagline
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
