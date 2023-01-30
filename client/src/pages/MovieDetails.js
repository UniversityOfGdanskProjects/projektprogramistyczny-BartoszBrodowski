import React from 'react';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import myAxios from '../utils/axiosInstance';

const MovieDetails = () => {
	// const { id } = useParams();
	// const movie = useSelector((state) => state.movies.movies).filter((movie) => movie.id === id);
	const movie = {
		plot: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanitys survival.',
		director: 'Christopher Nolan',
		rating: 8.6,
		genre: ['Adventure', 'Drama', 'Sci-Fi'],
		runtime: '169 min',
		title: 'Interstellar',
		poster: 'https://static.polityka.pl/_resource/res/path/82/1a/821a5dcf-27a5-4a9e-b8f0-0188485d0980_f1400x900',
		released: '07 Nov 2014',
		posterArray: [
			'https://occ-0-590-2568.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABa656OP3IITCTbB8ERrjyDi56Sd98fAIpXvWg8p2kIIu9Jy64ic2tgkcZLCaL1U4Xkt0If1QB3ShPM8aPW3XRVvELhwLjOBIs7wL.jpg?r=a79',
			'https://fsgk.pl/wordpress/wp-content/uploads/2018/09/xinters-fsgk-800x445.jpg.pagespeed.ic.YLQYK82Zm-.jpg',
			'https://2.bp.blogspot.com/-sAQzPkwLxAs/VF1LSsNaE7I/AAAAAAAAEcI/BiFx8pSHYQw/s1600/interstellar-04.jpg',
		],
	};
	const handleRatingClick = (rating) => {
		console.log(rating);
		// myAxios.post(
		// 	`https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=${process.env.API_KEY}`
		// );
	};
	return (
		<div
			style={{
				backgroundImage: `url(${movie.posterArray[0]})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			className='mt-12 p-4 text-white flex w-full h-[500px]'>
			<img src={movie.poster} alt='Movie poster' />
			<div className='flex items-center justify-center'>
				<div className='w-full mt-12 p-4 text-white opacity-100'>
					<h1 className='text-4xl font-bold'>
						{movie.title}
						<span className='text-gray-400'> ({movie.released.substring(7)})</span>
					</h1>
					<div className='flex gap-8 text-lg'>
						<span>{movie.released}</span>
						<div>
							<ul className='flex gap-4'>
								{movie.genre.map((genre, index) => {
									return <li key={index}>{genre}</li>;
								})}
							</ul>
						</div>
						<span>
							{Math.floor(+movie.runtime.substring(0, 3) / 60)}h{' '}
							{+movie.runtime.substring(0, 3) % 60}min
						</span>
					</div>
					<div className='flex flex-col gap-8'>
						<div className='flex items-center text-lg mt-8 gap-2'>
							Rating: <span className='text-2xl font-bold'>{movie.rating}</span>
						</div>
						<div className='flex flex-col'>
							<span className='font-bold text-xl'>Description:</span>
							<span>{movie.plot}</span>
						</div>
						<div className='flex flex-col '>
							<span className='font-bold text-xl'>Director:</span>
							<span>{movie.director}</span>
						</div>
						<div className='flex flex-col'>
							<span className='font-bold text-xl'>Rate this movie: </span>
							<ul className='flex mt-2'>
								{[...Array(5)].map((star, i) => {
									const ratingValue = i + 1;
									return (
										<li
											key={i}
											className='hover:scale-[120%] hover:cursor-pointer'
											onClick={() => handleRatingClick(ratingValue)}>
											<AiFillStar className='text-2xl text-yellow-400' />
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* <Carousel
				width={'100%'}
				centerMode={true}
				verticalSwipe={'natural'}
				swipeable={true}
				showArrows={true}>
				{dummyMovie.posterArray.map((poster) => {
					return (
						<div>
							<img className='w-full h-[400px]' src={poster} alt='poster' />
						</div>
					);
				})}
			</Carousel> */}
		</div>
	);
};

export default MovieDetails;
