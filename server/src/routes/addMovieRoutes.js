const express = require('express');
const { addMovie } = require('../controllers/addMovieController');

const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const { email, poster_image, released, tagline, title, directors, actors, genre } =
			req.body;
		const response = await addMovie(
			email,
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
