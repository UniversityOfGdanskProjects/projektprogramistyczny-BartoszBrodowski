const queryArray = [
	'MATCH (n:Person) SET n.name = "John Doe"',
	'MATCH (n:Movie) SET n.title = "The Matrix"',
	'MATCH (n:Company) SET n.name = "OpenAI"',
];

session
	.writeTransaction((context) => {
		const promises = queryArray.map((query) => context.run(query));
		return Promise.all(promises);
	})
	.then(() => {
		console.log('Queries executed successfully');
		session.close();
		driver.close();
	})
	.catch((error) => {
		console.error(error);
		session.close();
		driver.close();
	});
