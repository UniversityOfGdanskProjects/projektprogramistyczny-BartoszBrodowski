const app = require('../server');

test('get the latest movie of an actor', async () => {
	const response = await request(app).get('/actors/latest/1');
	expect(response.statusCode).toBe(200);
});
