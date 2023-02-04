const express = require('express');
const {
	register,
	deleteUser,
	deleteComment,
	adminUpdateMovie,
	adminUpdateComment,
	adminAddMovie,
	adminAddComment,
} = require('../controllers/adminController');

const router = express.Router();

router.post('/register', async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		const userCredentials = await register(firstName, lastName, email, password);
		return res.status(200).json(userCredentials);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.delete('/delete/user', async (req, res) => {
	try {
		const { userId, userRole } = req.body;
		const response = await deleteUser(userId, userRole);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.delete('/delete/comment', async (req, res) => {
	try {
		const { comment_id, user_id, role } = req.body;
		const response = await deleteComment(comment_id, user_id, role);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.put('/edit/movie', async (req, res) => {
	try {
		const {
			userId,
			movieId,
			poster_image,
			released,
			tagline,
			title,
			directors,
			actors,
			genre,
		} = req.body;
		const response = await adminUpdateMovie(
			userId,
			movieId,
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

router.put('/edit/comment', async (req, res) => {
	try {
		const { userId, commentId, comment } = req.body;
		const response = await adminUpdateComment(userId, commentId, comment);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

router.post('/add/movie', async (req, res) => {
	try {
		const { userId, poster_image, released, tagline, title, directors, actors, genre } =
			req.body;
		const response = await adminAddMovie(
			userId,
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

router.post('/add/comment', async (req, res) => {
	try {
		const { userId, movieId, comment } = req.body;
		const response = await adminAddComment(userId, movieId, comment);
		return res.status(200).json(response);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

module.exports = router;
