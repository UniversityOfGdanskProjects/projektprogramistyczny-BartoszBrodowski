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
const statsRoutes = require('./src/routes/statsRoutes');
const verifyToken = require('./src/middleware/authMiddleware');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth', authRoutes);
app.use('/movies/top', topMovieRoutes);
app.use('/movies', verifyToken, getMoviesRoutes);
app.use('/rate', verifyToken, rateRoutes);
app.use('/user/movie', verifyToken, userMovieRoutes);
app.use('/comment', verifyToken, comementMovieRoutes);
app.use('/admin', verifyToken, adminRoutes);
app.use('/actors', verifyToken, actorRoutes);
app.use('/stats', verifyToken, statsRoutes);

app.listen(8000, () => {
	console.log('Server is running on port 8000');
});
