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
		const response = await deleteGenre(genreId);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
