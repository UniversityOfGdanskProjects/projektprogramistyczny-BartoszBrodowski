const express = require('express');
const { rateMovie } = require('../controllers/rateMovieController');

const router = express.Router();
router.post('/', async (req, res) => {
	try {
		const { movieId, userId, rating } = req.body;
		if (
			movieId.match(
				/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
			)
		) {
			if (
				userId.match(
					/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
				)
			) {
				if (rating >= 1 && rating <= 5 && typeof rating === 'number') {
					const response = await rateMovie(movieId, userId, rating);
					return res.status(200).json(response);
				} else {
					return res.status(400).json('Invalid rating');
				}
			} else {
				return res.status(400).json('Invalid user id');
			}
		} else {
			return res.status(400).json('Invalid movie id');
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
