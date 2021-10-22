require('dotenv').config();

const { Pool, Client } = require('pg');
const { Sequelize } = require('sequelize');

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

const sequelize = new Sequelize(process.env.DB_URL);

//const sequelize = new Sequelize();

async function connect() {
    try {
        //await sequelize.authenticate();
        await client.connect();
        console.log('Connection has been established successfully.');
        q = await client.query("select * from accounts;");
        console.log(q.rows);

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


async function main(){
    await connect();
    await client.end();
    process.exit;
}


main()