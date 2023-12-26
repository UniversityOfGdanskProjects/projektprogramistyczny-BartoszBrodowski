const neo4j = require('neo4j-driver');
const { URL, USER, PASSWORD } = require('./variables');

const driver = neo4j.driver(URL, neo4j.auth.basic(USER, PASSWORD));
const session = driver.session();

module.exports = session;
