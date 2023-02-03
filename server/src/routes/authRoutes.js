const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const id = uuidv4();
		const userCredentials = await register(id, firstName, lastName, email, hashedPassword);
		return res.status(200).json(userCredentials);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const userCredentials = await login(email, password);
		await bcrypt.compare(password, userCredentials.password);
		return res.status(200).json(userCredentials);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
