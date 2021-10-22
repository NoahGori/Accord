const { Pool, Client } = require('pg');
const { Sequelize } = require('sequelize');

const client = new Client({
    user: "accord",
    password: "ewUn^sSVEurf",
    host: "76.226.74.200",
    port: 5432,
    database: "accorddb"
})

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