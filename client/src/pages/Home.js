import React from 'react';
import Filters from '../components/Filters';
import MoviesList from '../features/movies/MoviesList';

const Home = () => {
	return (
		<div className='flex flex-col font-open_sans w-[70%] mx-auto mt-4'>
			<Filters />
			<MoviesList />
		</div>
	);
};

export default Home;
