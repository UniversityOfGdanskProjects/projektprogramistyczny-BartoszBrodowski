const session = require('../config/connector');

exports.getMovies = async (req, res) => {
	try {
		const result = await session.run(
			`MATCH (m:Movie)<-[r:RATED]-(u:User)
			WITH m, r
			MATCH (m)-[t:TYPE]->(g:Genre)
			WITH m, r, g
			MATCH (m)<-[a:ACTED_IN]-(p:Person)
			WITH m, r, g, collect(p.name) as actors
			MATCH (m)<-[d:DIRECTED]-(director:Person)
			WITH m, r, g, actors, director
			RETURN DISTINCT m.title as title, m.poster_image as poster, m.tagline as tagline, m.released as released, g.name as genre, actors, director.name as director, r.rating as rating ORDER BY rating DESC`
		);
		const movies = result.records.map((record) => ({
			title: record.get('title'),
			poster: record.get('poster'),
			tagline: record.get('tagline'),
			released: record.get('released'),
			genre: record.get('genre'),
			actors: record.get('actors'),
			director: record.get('director'),
			rating: record.get('rating'),
		}));
		return movies;
	} catch (err) {
		throw new Error(err);
	}
};
