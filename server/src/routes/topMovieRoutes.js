const express = require('express');
const { getTopMovies } = require('../controllers/topMoviesController');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const response = await getTopMovies();
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
