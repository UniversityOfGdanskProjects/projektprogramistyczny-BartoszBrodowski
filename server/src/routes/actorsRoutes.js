const express = require('express');
const { getActorsLatestMovie, updateActor } = require('../controllers/actorsController');

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

router.put('/edit', (req, res) => {
	const { id, name, born, popularity, profile_image } = req.body;
	updateActor(id, name, born, popularity, profile_image)
		.then((response) => {
			return res.status(200).json(response);
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).json(err.message);
		});
});

module.exports = router;
