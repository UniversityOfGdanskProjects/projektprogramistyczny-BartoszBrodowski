import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className='flex text-white justify-between font-semibold bg-primary_dark_blue p-4 items-center bg-primary_dark_blue'>
			<div className='text-2xl w-[30%]'>
				<Link to='/'>The Movie DB</Link>
			</div>
			<ul className='flex justify-between w-full'>
				<li>
					<Link to='/actors'>Actors</Link>
				</li>
				<li>
					<Link to='/movies'>Movies</Link>
				</li>
				<li>
					<Link to='/directors'>Directors</Link>
				</li>
			</ul>
			<div className='w-[30%] text-right'></div>
		</nav>
	);
};

export default Navbar;
