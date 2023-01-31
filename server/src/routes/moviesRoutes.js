const express = require('express');
const { getMovies } = require('../controllers/moviesController');

const router = express.Router();

router.get('/all', async (req, res) => {
	try {
		const response = await getMovies();
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
