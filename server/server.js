require('dotenv').config();
const express = require('express');
const neo4j = require('neo4j-driver');
// const uri = process.env.DB_URI;
// const user = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);

app.listen(8000, () => {
	console.log('Server is running on port 8000');
});

// End of neo4j session (SIGINT listens to process terminaiton signal)
// process.on('SIGINT', () => {
// 	session.close();
// 	driver.close();
// 	console.log('Neo4j session closed');
// 	process.exit();
// });
