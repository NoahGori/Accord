import pg from 'pg';
import dotenv from 'dotenv';

const pool = new pg.Pool({
	user: dotenv.config().parsed.dbuser,
	host: dotenv.config().parsed.dbhost,
	database: dotenv.config().parsed.dbname,
	password: dotenv.config().parsed.dbpassword,
	port: dotenv.config().parsed.dbport
});

export default pool;
