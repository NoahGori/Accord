const { Pool, Client } = require('pg');
const { Sequelize } = require('sequelize');

const client = new Client({
    user: "accord",
    password: "ewUn^sSVEurf",
    host: "76.226.74.200",
    port: 5432/
})

const sequelize = new Sequelize('postgres://accord:ewUn^sSVEurf@76.226.74.200:5432/accorddb');

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

async function main(){
    connect();
}


main()