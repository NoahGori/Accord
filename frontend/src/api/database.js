const Pool = require('pg').Pool

const pool = new Pool({
	user: process.env.REACT_APP_dbuser,
	host: process.env.REACT_APP_dbhost,
	database: process.env.REACT_APP_dbname,
	password: process.env.REACT_APP_dbpassword,
	port: process.env.REACT_APP_dbport
});

module.exports = { pool }
