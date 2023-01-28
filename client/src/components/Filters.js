import { useState } from 'react';

const Filters = () => {
	const [select, setSelect] = useState('Sort By');
	return (
		<div className='flex justify-center items-center gap-2 px-4 py-8 my-8 bg-neutral-100 rounded-lg shadow-filters'>
			<div>
				<h3 className='text-xl font-semibold text-neutral-400'>Actor</h3>
				<input
					className='shadow-input h-10 rounded p-2 outline-none'
					type='text'
					placeholder=''
				/>
			</div>
			<div>
				<h3 className='text-xl font-semibold text-neutral-400'>Title</h3>
				<input
					className='shadow-input h-10 rounded p-2 outline-none'
					type='text'
					placeholder=''
				/>
			</div>
			<div>
				<h3 className='text-xl font-semibold text-neutral-400'>Genre</h3>
				<input
					className='shadow-input h-10 rounded p-2 outline-none'
					type='text'
					placeholder=''
				/>
			</div>
			<select
				className='h-10 p-2 mt-7 rounded shadow-input bg-white text-neutral-500'
				placeholder='Sort By'>
				<option>All</option>
				<option>Date (Asc)</option>
				<option>Date (Dsc)</option>
			</select>
		</div>
	);
};

export default Filters;
