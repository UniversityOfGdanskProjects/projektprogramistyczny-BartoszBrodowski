const express = require('express');

const {
	generatePopularityForActors,
	generatePopularityForMovies,
	generatePopularityForDirectors,
	getOldestMovieInDatabase,
	getAmountOfUsers,
	getAmountOfMovies,
	getAmountOfActors,
	getAmountOfDirectors,
	getOldestActorInDatabase,
	statsForMovie,
} = require('../controllers/statsControllers');

const router = express.Router();

router.post('/movies', async (req, res) => {
	try {
		const response = await generatePopularityForMovies();
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.post('/actors', async (req, res) => {
	try {
		const response = await generatePopularityForActors();
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.post('/directors', async (req, res) => {
	try {
		const response = await generatePopularityForDirectors();
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.get('/movies/oldest', async (req, res) => {
	try {
		const response = await getOldestMovieInDatabase();
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.get('/users/amount', async (req, res) => {
	try {
		const response = await getAmountOfUsers();
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.get('/movies/amount', async (req, res) => {
	try {
		const response = await getAmountOfMovies();
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.get('/actors/amount', async (req, res) => {
	try {
		const response = await getAmountOfActors();
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.get('/directors/amount', async (req, res) => {
	try {
		const response = await getAmountOfDirectors();
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.get('/actors/oldest', async (req, res) => {
	try {
		const response = await getOldestActorInDatabase();
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.get('/movies/stats/movie', async (req, res) => {
	try {
		const { movieId } = req.body;
		const response = await statsForMovie(movieId);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
