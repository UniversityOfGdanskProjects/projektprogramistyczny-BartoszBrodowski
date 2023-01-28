import axios from 'axios';

const myAxios = axios.create({
	baseURL: 'http://localhost:8000',
	headers: {
		'Content-Type': 'application/json',
	},
});
export default myAxios;
