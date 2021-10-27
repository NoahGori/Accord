import pg from 'pg';
import dotenv from 'dotenv';

const pool = new pg.Pool({
	user: dotenv.config().parsed.DB_USER,
	host: dotenv.config().parsed.DB_HOST,
	database: dotenv.config().parsed.DB_NAME,
	password: dotenv.config().parsed.DB_PASS,
	port: dotenv.config().parsed.DB_PORT
});

export default pool;
