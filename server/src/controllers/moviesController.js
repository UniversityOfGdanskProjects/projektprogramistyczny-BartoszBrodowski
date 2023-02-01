const session = require('../config/connector');

exports.getMovies = async (req, res) => {
	try {
		const result = await session.run(
			`MATCH (m:Movie)<-[r:RATED]-(u:User)
			WITH m, collect(r.rating) as ratings
			MATCH (m)-[t:TYPE]->(g:Genre)
			WITH m, ratings, g
			MATCH (m)<-[a:ACTED_IN]-(p:Person)
			WITH m, ratings, g, collect(p.name) as actors
			MATCH (m)<-[d:DIRECTED]-(director:Person)
			WITH m, ratings, g, actors, collect(director.name) as directors
			RETURN DISTINCT m.title as title, m.poster_image as poster, m.tagline as tagline, m.released as released, g.name as genre, actors, directors, ratings ORDER BY title DESC`
		);
		const movies = result.records.map((record) => ({
			title: record.get('title'),
			poster: record.get('poster'),
			tagline: record.get('tagline'),
			released: record.get('released'),
			genre: record.get('genre'),
			actors: record.get('actors'),
			director: record.get('directors'),
			rating: record.get('ratings'),
		}));
		return movies;
	} catch (err) {
		throw new Error(err);
	}
};

exports.getMoviesSearch = async (title, genre, actor, sort) => {
	try {
		const result = await session.run(
			`MATCH (m:Movie)<-[r:RATED]-(u:User)
		    WHERE m.title =~ '(?i).*${title}.*'
		    WITH m, avg(r.rating) as ratings
		    MATCH (m)-[t:TYPE]->(g:Genre)
			WHERE g.name =~ '(?i).*${genre}.*'
		    WITH m, ratings, g
		    MATCH (m)<-[a:ACTED_IN]-(p:Person)
			WHERE p.name =~ '(?i).*${actor}.*'
		    WITH m, ratings, g, collect(p.name) as actors
		    MATCH (m)<-[d:DIRECTED]-(director:Person)
		    WITH m, ratings, g, actors, collect(director.name) as directors
		    RETURN DISTINCT m.title as title, m.poster_image as poster, m.tagline as tagline, m.released as released, g.name as genre, actors, directors, ratings ORDER BY ${
				sort == '' ? 'ratings' : sort
			}`
		);
		const movies = result.records.map((record) => ({
			title: record.get('title'),
			poster: record.get('poster'),
			tagline: record.get('tagline'),
			released: record.get('released'),
			genre: record.get('genre'),
			actors: record.get('actors'),
			director: record.get('directors'),
			rating: record.get('ratings'),
		}));
		return movies;
	} catch (err) {
		throw new Error(err);
	}
};
