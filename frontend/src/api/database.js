const { Client } = require('pg')

const client = new Client({
	user: process.env.REACT_APP_dbuser,
	host: process.env.REACT_APP_dbhost,
	database: process.env.REACT_APP_dbname,
	password: process.env.REACT_APP_dbpassword,
	port: process.env.REACT_APP_dbport
});

module.exports = { client }
