const express = require('express');
const { getActorsLatestMovie, updateActorsOnMovie } = require('../controllers/actorsController');

const router = express.Router();

router.get('/latest/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const result = await getActorsLatestMovie(id);
		return res.status(200).json(result);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.put('/edit', async (req, res) => {
	try {
		const { movieId, actorsList } = req.body;
		const result = await updateActorsOnMovie(movieId, actorsList);
		return res.status(200).json(result);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
