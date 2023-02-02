const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const topMovieRoutes = require('./src/routes/topMovieRoutes');
const moviesRoutes = require('./src/routes/moviesRoutes');
const authRoutes = require('./src/routes/authRoutes');
const rateRoutes = require('./src/routes/rateMovieRoutes');
const addMovieRoutes = require('./src/routes/addMovieRoutes');
const comementMovieRoutes = require('./src/routes/commentsRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/movies/top', topMovieRoutes);
app.use('/movies', moviesRoutes);
app.use('/auth', authRoutes);
app.use('/rate', rateRoutes);
app.use('/add/movie', addMovieRoutes);
app.use('/comment', comementMovieRoutes);

app.listen(8000, () => {
	console.log('Server is running on port 8000');
});
