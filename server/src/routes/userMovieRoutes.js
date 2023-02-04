const express = require('express');
const { addMovie, deleteMovie, updateMovie } = require('../controllers/userMovieController');

const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const { userId, poster_image, released, tagline, title, directors, actors, genre } =
			req.body;
		const response = await addMovie(
			userId,
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

router.put('/edit', async (req, res) => {
	try {
		const {
			userId,
			movieId,
			poster_image,
			released,
			tagline,
			title,
			directors,
			actors,
			genre,
		} = req.body;
		const response = await updateMovie(
			userId,
			movieId,
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

module.exports = router;
