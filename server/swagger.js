const swaggerAutogen = require('swagger-autogen')();

const doc = {
	info: {
		title: 'Movie DB API',
		description: 'Description',
	},
	host: 'localhost:8000',
	schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
	require('./server.js');
});
