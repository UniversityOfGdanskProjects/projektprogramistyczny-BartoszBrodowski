const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { commentMovie, deleteComment } = require('../controllers/commentsController');

const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const { title, email, comment } = req.body;
		const id = uuidv4();
		const response = await commentMovie(email, title, comment, id);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.delete('/', async (req, res) => {
	try {
		const { id } = req.body;
		const response = await deleteComment(id);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
