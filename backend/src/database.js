import pg from 'pg';
const host = process.env.NODE_ENV == "test" ? process.env.DB_HOST : localhost
const pool = new pg.Pool({
	user: process.env.DB_USER,
	host: host,
	database: process.env.DB_NAME,
	password: process.env.DB_PASS,
	port: process.env.DB_PORT
});

export default pool;
