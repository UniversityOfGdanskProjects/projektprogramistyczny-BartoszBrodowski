const session = require('../config/connector');

exports.login = async (email, password) => {
	try {
		const result = await session.run('MATCH (u:User { email: $email }) RETURN u', { email });
		if (result) {
			const user = result.records[0].get('u').properties;
			return user;
		} else {
			return Error('User not found');
		}
	} catch (err) {
		throw new Error(err);
	}
};

exports.register = async (id, firstName, lastName, email, password) => {
	try {
		const result = await session.run(
			'CREATE (u:User { id: $id, name: $firstName, last_name: $lastName, email: $email, password: $password, role: "USER" }) RETURN u',
			{ id, firstName, lastName, email, password }
		);
		const user = result.records[0].get('u').properties;
		return user;
	} catch (err) {
		throw new Error(err);
	}
};
