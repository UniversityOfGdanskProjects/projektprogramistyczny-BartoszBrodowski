const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const topMovieRoutes = require('./src/routes/topMovieRoutes');
const getMoviesRoutes = require('./src/routes/getMoviesRoutes');
const authRoutes = require('./src/routes/authRoutes');
const rateRoutes = require('./src/routes/rateMovieRoutes');
const userMovieRoutes = require('./src/routes/userMovieRoutes');
const comementMovieRoutes = require('./src/routes/commentsRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const actorRoutes = require('./src/routes/actorsRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/movies/top', topMovieRoutes);
app.use('/movies', getMoviesRoutes);
app.use('/auth', authRoutes);
app.use('/rate', rateRoutes);
app.use('/user/movie', userMovieRoutes);
app.use('/comment', comementMovieRoutes);
app.use('/admin', adminRoutes);
app.use('/actors', actorRoutes);

app.listen(8000, () => {
	console.log('Server is running on port 8000');
});
