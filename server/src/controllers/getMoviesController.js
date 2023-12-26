const session = require('../config/connector');

exports.getMovies = () => {
	return new Promise((resolve, reject) => {
		session
			.run(
				`MATCH (m:Movie)<-[r:RATED]-(u:User)
			WITH m, collect(r.rating) as ratings
			MATCH (m)-[t:TYPE]->(g:Genre)
			WITH m, ratings, g
			MATCH (m)<-[a:ACTED_IN]-(p:Person)
			WITH m, ratings, g, collect(p.name) as actors
			MATCH (m)<-[d:DIRECTED]-(director:Person)
			WITH m, ratings, g, actors, collect(director.name) as directors
			RETURN DISTINCT m.title as title, m.poster_image as poster, m.tagline as tagline, m.released as released, g.name as genre, apoc.coll.sort(actors) as actors, apoc.coll.sort(directors) as directors, ratings, m.tmdbLink as tmdbLink ORDER BY title DESC`
			)
			.then((result) => {
				const movies = result.records.map((record) => ({
					title: record.get('title'),
					poster: record.get('poster'),
					tagline: record.get('tagline'),
					released: record.get('released'),
					genre: record.get('genre'),
					actors: record.get('actors'),
					director: record.get('directors'),
					rating: record.get('ratings'),
					tmdbLink: record.get('tmdbLink'),
				}));
				resolve(movies);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

exports.getMoviesSearch = async (title, genre, actor, sort) => {
	try {
		const result = await session.run(
			`MATCH (g:Genre)<-[t:TYPE]-(m:Movie)<-[r:RATED]-(u:User), 
			(m)<-[a:ACTED_IN]-(p:Person), 
			(m)<-[d:DIRECTED]-(director:Person)
		    WHERE (m.title =~ '(?i).*${title}.*')
			AND (g.name =~ '(?i).*${genre}.*') 
			AND (p.name =~ '(?i).*${actor}.*')
			WITH m, m.title as title, g.name as genre, avg(r.rating) as ratings, collect(DISTINCT p.name) as actors, m.poster_image as poster, m.tagline as tagline, m.released as released, collect(DISTINCT director.name) as directors
		    RETURN title, genre, ratings, apoc.coll.sort(actors) as actors, poster, tagline, released, apoc.coll.sort(directors) as directors, m.tmdbLink as tmdbLink ORDER BY ${
				sort == '' ? 'ratings' : sort.toLowerCase()
			} DESC`
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
			tmdbLink: record.get('tmdbLink'),
		}));
		return movies;
	} catch (err) {
		throw new Error(err);
	}
};

exports.filterByReleaseDate = async (start, end) => {
	try {
		const result = await session.run(
			`MATCH (m:Movie)<-[r:RATED]-(u:User)
			WHERE m.released >= $start AND m.released <= $end
			WITH m, collect(r.rating) as ratings
			MATCH (m)-[t:TYPE]->(g:Genre)
			WITH m, ratings, g
			MATCH (m)<-[a:ACTED_IN]-(p:Person)
			WITH m, ratings, g, collect(p.name) as actors
			MATCH (m)<-[d:DIRECTED]-(director:Person)
			WITH m, ratings, g, actors, collect(director.name) as directors
			RETURN DISTINCT m.title as title, m.poster_image as poster, m.tagline as tagline, m.released as released, g.name as genre, apoc.coll.sort(actors) as actors, apoc.coll.sort(directors) as directors, ratings, m.tmdbLink as tmdbLink ORDER BY title DESC`,
			{ start, end }
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
			tmdbLink: record.get('tmdbLink'),
		}));
		return movies;
	} catch (err) {
		throw new Error(err);
	}
};
