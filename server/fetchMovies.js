const url = `https://api.themoviedb.org/3/movie/popular?api_key=0689392230f096b932bb1093687cce94&language=en-US&page=1`;
const axios = require('axios');

const fetchMovies = async () => {
	try {
		const response = await axios.get(url);
		const result = response.data.results;
		console.log(result[0]);
		return result;
	} catch (err) {
		console.log(err);
	}
};

fetchMovies();
