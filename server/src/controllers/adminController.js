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
		if (userRole !== 'ADMIN') {
			throw new Error('You are not authorized to delete users');
		}
		await session.run(`MATCH (u:User { id: $id }) DETACH DELETE u`, { id });
		return { message: 'User has been deleted' };
	} catch (err) {
		throw new Error(err);
	}
};
