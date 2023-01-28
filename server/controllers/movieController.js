require('dotenv').config();
const neo4j = require('neo4j-driver');
const driver = neo4j.driver(
	'neo4j+s://5275b02e.databases.neo4j.io',
	neo4j.auth.basic('neo4j', 'HcaUfER2e7g9reaNsUzDsFn2M0567Pyv6gwp3CQsNkM')
);

module.exports.addMovie = async (req, res) => {
	try {
		const session = driver.session();
		const { title, year, genre, director } = req.body;
		const createMovieQuery = `CREATE (m:Movie { title: $title, image: $image, description: $description, year: $year, genre: $genre, director: $director, mainActors: $mainActors, link: $link, grade: $grade, imageGallery: $imageGallery }) RETURN m`;
		await session.run(createMovieQuery, { title, year, genre, director });
		await session.close();
		res.status(200).json({ message: 'Movie created' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

module.exports.addManyMovies = async (req, res) => {
	try {
		const session = driver.session();
		const { movies } = req.body;
		const createMovieQuery = `
			UNWIND $movies AS movie
			CREATE (m:Movie { title: movie.title, released: movie.released, runtime: movie.runtime, genre: movie.genre, director: movie.director, plot: movie.plot, poster: movie.poster, rating: movie.rating, posterArray: movie.posterArray })`;
		await session.run(createMovieQuery, { movies });
		await session.close();
		res.status(200).json({ message: 'Movies created' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

module.exports.fetchMovies = async (req, res) => {
	try {
		const session = driver.session();
		const fetchMoviesQuery = `MATCH (m:Movie) RETURN m`;
		const result = await session.run(fetchMoviesQuery);
		const movies = result.records.map((record) => record.get('m').properties);
		await session.close();
		res.status(200).json(movies);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
