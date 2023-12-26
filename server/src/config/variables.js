const dotenv = require('dotenv');
dotenv.config();

const URL = process.env.DB_URI;
const USER = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { URL, USER, PASSWORD, JWT_SECRET };
