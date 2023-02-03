const express = require('express');
const { addMovie, deleteMovie } = require('../controllers/userMovieController');

const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const { id, poster_image, released, tagline, title, directors, actors, genre } = req.body;
		const response = await addMovie(
			id,
			poster_image,
			released,
			tagline,
			title,
			directors,
			actors,
			genre
		);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.delete('/', async (req, res) => {
	try {
		const { userId, movieId } = req.body;
		const response = await deleteMovie(userId, movieId);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
