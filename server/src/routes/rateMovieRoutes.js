const express = require('express');
const { rateMovie } = require('../controllers/rateMovieController');

const router = express.Router();
router.post('/', async (req, res) => {
	try {
		const { movieId, userId, rating } = req.body;
		const response = await rateMovie(movieId, userId, rating);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
