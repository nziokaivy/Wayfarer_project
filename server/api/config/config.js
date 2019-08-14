const dotenv = require('dotenv');

const env = process.env.NODE_ENV;
dotenv.config();
console.log(env);

const dev = {
	db: process.env.DATABASE_URL,
};
const test = {
	db: process.env.DATABASE_TEST_URL,
};
const config = {
	dev,
	test,
};
export default config[env];
