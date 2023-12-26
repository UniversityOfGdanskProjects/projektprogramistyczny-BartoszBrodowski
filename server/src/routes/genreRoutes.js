const express = require('express');
const { addGenre, deleteGenre, getAllGenres } = require('../controllers/genreController');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const response = await getAllGenres();
		res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.post('/', async (req, res) => {
	try {
		const { name } = req.body;
		if (typeof name !== 'string' || name.length < 2) {
			return res.status(400).json('Invalid genre name');
		}
		const response = await addGenre(name);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.delete('/', async (req, res) => {
	try {
		const { genreId } = req.body;
		if (
			genreId.match(
				/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
			)
		) {
			const response = await deleteGenre(genreId);
			return res.status(200).json(response);
		} else {
			return res.status(400).json('Invalid genre id');
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
