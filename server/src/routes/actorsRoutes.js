const express = require('express');
const {
	getActorsLatestMovie,
	updateActor,
	deleteActor,
} = require('../controllers/actorsController');

const router = express.Router();

router.get('/latest/:id', async (req, res) => {
	try {
		const { id } = req.params;
		if (
			id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
		) {
			const result = await getActorsLatestMovie(id);
			return res.status(200).json(result);
		} else {
			return res.status(400).json('Invalid actor id');
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.put('/', (req, res) => {
	const { id, name, born, popularity, profile_image } = req.body;
	if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
		return res.status(400).json('Invalid actor id');
	}
	if (typeof name !== 'string' || name.length <= 5) {
		return res.status(400).json('Invalid actor name');
	}
	if (typeof born !== 'number' || born < 1900) {
		return res.status(400).json('Invalid born');
	}
	if (typeof popularity !== 'number' || popularity < 0 || popularity > 100) {
		return res.status(400).json('Invalid popularity');
	}
	if (typeof profile_image !== 'string' || profile_image.length < 15) {
		return res.status(400).json('Invalid profile image');
	}
	updateActor(id, name, born, popularity, profile_image)
		.then((response) => {
			return res.status(200).json(response);
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).json(err.message);
		});
});

router.delete('/', async (req, res) => {
	const { id } = req.body;
	try {
		if (
			id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
		) {
			const result = await deleteActor(id);
			return res.status(200).json(result);
		} else {
			return res.status(400).json('Invalid actor id');
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
