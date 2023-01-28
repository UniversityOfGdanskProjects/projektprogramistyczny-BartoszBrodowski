import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import { fetchMovies } from './moviesSlice';

const MoviesList = () => {
	const dispatch = useDispatch();
	const movies = useSelector((state) => state.movies.movies);
	useEffect(() => {
		if (movies.length === 0) {
			dispatch(fetchMovies());
		}
	}, []);
	return (
		<div>
			<ul className='grid grid-cols-4 gap-8 auto-rows-fr rounded'>
				{movies.map((movie, index) => (
					<li key={index}>
						<MovieCard movie={movie} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default MoviesList;
