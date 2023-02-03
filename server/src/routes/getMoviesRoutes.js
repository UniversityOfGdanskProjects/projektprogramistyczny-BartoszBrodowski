const express = require('express');
const {
	getMovies,
	getMoviesSearch,
	filterByReleaseDate,
} = require('../controllers/getMoviesController');

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

router.get('/all/search', async (req, res) => {
	try {
		const { title = '', genre = '', actor = '', sort = 'ratings' } = req.query;
		const response = await getMoviesSearch(title, genre, actor, sort);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.get('/all/filter/:start/:end', async (req, res) => {
	try {
		const { start, end } = req.params;
		const response = await filterByReleaseDate(start, end);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
