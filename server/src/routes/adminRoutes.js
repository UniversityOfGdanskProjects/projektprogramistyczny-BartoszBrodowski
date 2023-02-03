const express = require('express');
const { register, deleteUser } = require('../controllers/adminController');

const router = express.Router();

router.post('/register', async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		const userCredentials = await register(firstName, lastName, email, password);
		return res.status(200).json(userCredentials);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.delete('/delete', async (req, res) => {
	try {
		const { userId, userRole } = req.body;
		const response = await deleteUser(userId, userRole);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
