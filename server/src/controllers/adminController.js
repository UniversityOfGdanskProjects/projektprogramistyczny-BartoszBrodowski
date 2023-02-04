const session = require('../config/connector');

exports.register = async (firstName, lastName, email, password) => {
	try {
		const isUnique = await session.run('MATCH (u:User { email: $email }) RETURN u', { email });
		if (isUnique.records.length > 0) {
			throw new Error('User already exists');
		}
		await session.run(
			`CALL apoc.create.node(["User"], { id: apoc.create.uuid(), name: $firstName, last_name: $lastName, email: $email, password: $password, role: "ADMIN" })`,
			{ firstName, lastName, email, password }
		);
		return { message: 'User has been created' };
	} catch (err) {
		throw new Error(err);
	}
};

exports.deleteUser = async (id, userRole) => {
	try {
		if (userRole === 'ADMIN') {
			await session.run(`MATCH (u:User { id: $id }) DETACH DELETE u`, { id });
			return { message: 'User has been deleted' };
		} else {
			throw new Error('You are not authorized to delete users');
		}
	} catch (err) {
		throw new Error(err);
	}
};

exports.deleteMovie = async (movieId, userRole) => {
	try {
		if (userRole === 'ADMIN') {
			await session.run(`MATCH (m:Movie { id: $movieId }) DETACH DELETE m`, { movieId });
			return { message: 'Movie has been deleted' };
		} else {
			throw new Error('You are not authorized to delete movies');
		}
	} catch (err) {
		throw new Error(err);
	}
};

exports.deleteComment = async (comment_id, user_id, userRole) => {
	try {
		if (userRole === 'ADMIN') {
			await session.run(
				`MATCH (m:Movie)<-[c:COMMENTED]-(u:User { id: $user_id }})
				WHERE c.id = $comment_id
				DETACH DELETE c`,
				{ comment_id, user_id }
			);
			return { message: `Comment with id: ${comment_id} has been deleted` };
		} else {
			return Error('You are not authorized to delete this comment');
		}
	} catch (err) {
		throw new Error(err);
	}
};

exports.adminUpdateMovie = async (
	userId,
	movieId,
	poster_image,
	released,
	tagline,
	title,
	directors,
	actors,
	genre
) => {
	try {
		const user = await session.run('MATCH (u:User { id: $userId }) RETURN u', { userId });
		if (user) {
			if (user.records[0]._fields[0].properties.role === 'ADMIN') {
				await session.run(
					`MATCH (m:Movie { id: $movieId, addedBy: $userId })
					SET m.poster_image = $poster_image, m.released = $released, m.tagline = $tagline
					WITH m
					MATCH (m)-[dir:DIRECTED]-()
					DETACH DELETE dir
					WITH m
					UNWIND $directors AS director
					MERGE (d:Person { name: director })
					MERGE (m)<-[:DIRECTED]-(d)
					WITH m
					MATCH (m)-[act:ACTED_IN]-()
					DETACH DELETE act
					WITH m
					UNWIND $actors AS actor
					MERGE (a:Person { name: actor })
					MERGE (m)<-[:ACTED_IN]-(a)
					WITH m
					MATCH (m)-[type:TYPE]-()
					DETACH DELETE type
					WITH m
					UNWIND $genre AS genre
					MERGE (g:Genre { name: genre })
					MERGE (m)-[:TYPE]->(g)
					RETURN m`,
					{
						userId,
						movieId,
						poster_image,
						released,
						tagline,
						title,
						directors,
						actors,
						genre,
					}
				);
				return { message: 'Movie has been updated' };
			} else {
				return { message: 'You are not authorized to update movies' };
			}
		}
		return Error('User not found');
	} catch (err) {
		throw new Error(err);
	}
};

exports.adminUpdateComment = async (userId, commentId, comment) => {
	try {
		const user = await session.run('MATCH (u:User { id: $userId }) RETURN u', { userId });
		if (user) {
			if (user.records[0]._fields[0].properties.role === 'ADMIN') {
				await session.run(
					`MATCH (u:User)-[c:COMMENTED]->(m:Movie)
					WHERE c.id = $commentId
					SET c.comment = $comment
					RETURN c`,
					{ userId, commentId, comment }
				);
				return { message: 'Comment has been updated' };
			} else {
				return { message: 'You are not authorized to update comments' };
			}
		}
		return Error('User not found');
	} catch (err) {
		throw new Error(err);
	}
};

exports.adminAddMovie = async (
	userId,
	poster_image,
	released,
	tagline,
	title,
	directors,
	actors,
	genre
) => {
	try {
		const user = await session.run('MATCH (u:User { id: $userId }) RETURN u', { userId });
		if (user) {
			if (user.records[0]._fields[0].properties.role === 'ADMIN') {
				await session.run(
					`CREATE (m:Movie { id: apoc.create.uuid(), poster_image: $poster_image, released: $released, tagline: $tagline, title: $title, addedBy: $userId })
						WITH m
						UNWIND $directors AS director
						MERGE (d:Person { name: director })
						MERGE (m)<-[:DIRECTED]-(d)
						WITH m
						UNWIND $actors AS actor
						MERGE (a:Person { name: actor })
						MERGE (m)<-[:ACTED_IN]-(a)
						WITH m
						UNWIND $genre AS genre
						MERGE (g:Genre { name: genre })
						MERGE (m)-[:TYPE]->(g)
						RETURN m`,
					{
						userId,
						poster_image,
						released,
						tagline,
						title,
						directors,
						actors,
						genre,
					}
				);
				return { message: 'Movie has been added' };
			} else {
				return { message: 'You are not authorized to add movies' };
			}
		}
		return Error('User not found');
	} catch (err) {
		throw new Error(err);
	}
};

exports.adminAddComment = async (userId, movieId, comment) => {
	try {
		const user = await session.run('MATCH (u:User { id: $userId }) RETURN u', { userId });
		if (user) {
			if (user.records[0]._fields[0].properties.role === 'ADMIN') {
				await session.run(
					`MATCH (u:User { id: $userId }), (m:Movie { id: $movieId })
					CREATE (u)-[c:COMMENTED { id: apoc.create.uuid(), comment: $comment }]->(m)
					RETURN c`,
					{ userId, movieId, comment }
				);
				return { message: 'Comment has been added' };
			} else {
				return { message: 'You are not authorized to add comments as ADMIN user' };
			}
		}
		return Error('User not found');
	} catch (err) {
		throw new Error(err);
	}
};
