const session = require('../config/connector');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/variables');

exports.login = async (email, password) => {
	try {
		const doesExist = await session.run('MATCH (u:User { email: $email }) RETURN u', { email });
		if (doesExist.records.length === 0) {
			throw new Error('User not found');
		}
		const user = doesExist.records[0]._fields[0].properties;
		const comparePassword = await bcrypt.compare(password, user.password);
		if (!comparePassword) {
			throw new Error('Password is incorrect');
		}
		const token = jwt.sign({ role: user.role, id: user.id }, JWT_SECRET, {
			expiresIn: '1h',
		});
		return token;
	} catch (err) {
		throw new Error(err);
	}
};

exports.register = async (firstName, lastName, email, password) => {
	try {
		const isUnique = await session.run('MATCH (u:User { email: $email }) RETURN u', { email });
		if (isUnique.records.length > 0) {
			throw new Error('User already exists');
		}
		await session.run(
			`CALL apoc.create.node(["User"], { id: apoc.create.uuid(), name: $firstName, last_name: $lastName, email: $email, password: $password, role: "USER" })`,
			//'CREATE (u:User { id: apoc.create.uuid(), name: $firstName, last_name: $lastName, email: $email, password: $password, role: "USER" }) RETURN u',
			{ firstName, lastName, email, password }
		);
		return { message: 'User has been created' };
	} catch (err) {
		throw new Error(err);
	}
};
