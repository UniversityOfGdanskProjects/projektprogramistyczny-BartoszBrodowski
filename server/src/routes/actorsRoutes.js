const express = require('express');
const { getActorsLatestMovie } = require('../controllers/actorsController');

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

module.exports = router;
