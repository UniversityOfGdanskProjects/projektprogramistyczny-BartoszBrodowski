const express = require('express');
const { commentMovie, deleteComment } = require('../controllers/commentsController');

const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const { movieId, userId, comment } = req.body;
		const response = await commentMovie(movieId, userId, comment);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.delete('/', async (req, res) => {
	try {
		const { commentId, userId, role } = req.body;
		const response = await deleteComment(commentId, userId, role);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
