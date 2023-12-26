const express = require('express');
const { commentMovie, deleteComment } = require('../controllers/commentsController');

const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const { movieId, userId, comment } = req.body;
		if (
			!movieId.match(
				/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
			)
		) {
			return res.status(400).json('Invalid movie id');
		}
		if (
			!userId.match(
				/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
			)
		) {
			return res.status(400).json('Invalid user id');
		}
		if (typeof comment !== 'string' || comment.length <= 5 || !comment.match(/^[a-zA-Z]\S+$/)) {
			return res.status(200).json('Invalid comment');
		}
		await commentMovie(movieId, userId, comment);
		return res.status(200).json('Comment added');
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.delete('/', async (req, res) => {
	try {
		const { commentId, userId } = req.body;
		if (
			!commentId.match(
				/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
			)
		) {
			return res.status(400).json('Invalid comment id');
		}
		if (
			!userId.match(
				/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
			)
		) {
			return res.status(400).json('Invalid user id');
		}
		const response = await deleteComment(commentId, userId);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
