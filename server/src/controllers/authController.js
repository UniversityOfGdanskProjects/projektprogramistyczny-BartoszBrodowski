const session = require('../config/connector');

exports.login = async (email, password) => {
	const result = await session.run('MATCH (u:User { email: $email }) RETURN u', { email });
	const user = result.records[0].get('u').properties;
	return user;
};

exports.register = async (firstName, lastName, email, password) => {
	const result = await session.run(
		'CREATE (u:User { name: $firstName, last_name: $lastName, email: $email, password: $password }) RETURN u',
		{ email, password }
	);
	const user = result.records[0].get('u').properties;
	return user;
};
