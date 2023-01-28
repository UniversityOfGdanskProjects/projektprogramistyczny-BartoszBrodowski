import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
	const navigate = useNavigate();
	const trimmedPlot =
		movie.plot.length > 60 ? movie.plot.substring(0, 50).trim() + '...' : movie.plot;

	const handleMovieClick = () => {
		navigate(`/movies/${movie.id}`);
	};
	return (
		<div className='rounded shadow-movie_card bg-white h-full rounded hover:cursor-pointer hover:scale-110 duration-300 hover:z-10'>
			<img className='w-full h-40 rounded' src={movie.poster} alt='Movie poster' on />
			<div className='flex flex-col gap-4 p-2'>
				<h1 className='font-bold text-2xl'>{movie.title}</h1>
				<p className='text-gray-500'>{movie.released}</p>
				<p>{trimmedPlot}</p>
				<div
					className={`text-xl font-semibold rounded-md ${
						movie.rating <= 5
							? 'text-yellow-500'
							: movie.rating <= 7
							? 'text-yellow-500'
							: 'text-green-500'
					}`}>
					{movie.rating}
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
