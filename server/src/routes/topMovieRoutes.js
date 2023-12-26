const express = require('express');
const {
	getTopMoviesLoggedOut,
	getTopMoviesLoggedIn,
} = require('../controllers/topMoviesController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/loggedout', async (req, res) => {
	try {
		const response = await getTopMoviesLoggedOut();
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.get('/loggedin', verifyToken, async (req, res) => {
	try {
		const response = await getTopMoviesLoggedIn();
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
