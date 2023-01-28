import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const store = configureStore({
	reducer: {
		movies: moviesReducer,
	},
	middleware: [logger, thunk],
});

export default store;
