module.exports.getRegister = (req, res) => {
	null;
};

module.exports.getLogin = (req, res) => {
	null;
};

module.exports.postRegister = async (req, res) => {
	try {
		const session = driver.session();
		const { nickname, email, password } = req.body;
		const createUserQuery = `CREATE (u:User { nickname: $nickname, email: $email, password: $password }) RETURN u`;
		await session.run(createUserQuery, { nickname, email, password });
		await session.close();
		res.status(200).json({ message: 'User created' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

module.exports.postLogin = async (req, res) => {
	try {
		const session = driver.session();
		const { email, password } = req.body;
		const findUserQuery = `MATCH (u:User { email: $email, password: $password }) RETURN u`;
		const result = await session.run(findUserQuery, { email, password });
		await session.close();
		if (result.records.length === 0) {
			res.status(404).json({ message: 'User not found' });
		} else {
			res.status(200).json({ message: result.records[0]._fields[0].properties });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
