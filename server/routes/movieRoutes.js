const { Router } = require('express');
const movieController = require('../controllers/movieController');

const router = Router();

router.post('/addmovie', movieController.addMovie);
router.post('/addmovies', movieController.addManyMovies);
router.get('/fetch', movieController.fetchMovies);

module.exports = router;
