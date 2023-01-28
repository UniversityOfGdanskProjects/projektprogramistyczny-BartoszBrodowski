import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import myAxios from '../../utils/axiosInstance';
const reduxLogger = require('redux-logger');

const logger = reduxLogger.createLogger();

const initialState = {
	movies: [],
	status: 'idle',
	error: null,
};

export const fetchMovies = createAsyncThunk('fetchMovies', async () => {
	try {
		const movies = await myAxios.get('/movies/fetch');
		return movies;
	} catch (err) {
		console.log(err);
	}
});

const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		getMovies(state, action) {
			state.movies = action.payload;
		},
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovies.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchMovies.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.movies = state.movies.concat(action.payload.data);
			})
			.addCase(fetchMovies.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { getMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
