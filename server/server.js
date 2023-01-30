const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const topMovieRoutes = require('./src/routes/topMovieRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/top', topMovieRoutes);

app.listen(8000, () => {
	console.log('Server is running on port 8000');
});
