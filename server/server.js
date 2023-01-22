const neo4j = require('neo4j-driver');
const uri = 'neo4j+s://de0998e0.databases.neo4j.io';
require('dotenv').config();

(async () => {
	const neo4j = require('neo4j-driver');
	const uri = 'neo4j+s://5275b02e.databases.neo4j.io';
	const user = process.env.DB_USERNAME;
	const password = process.env.DB_PASSWORD;
	const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
	try {
	} catch (error) {
		console.error(`Something went wrong: ${error}`);
	} finally {
		await driver.close();
	}
})();
