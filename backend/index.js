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

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

/*async function getCurrDate(){ //Gets current date to check if auth keys are at current date or past
    //SQL Timestamp Format: YYYY-MM-DD HH24:MI:SSXFF
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var todayFin = yyyy +"-" + mm + "-" + dd + "T" + time;
    
    return today;
}*/

async function checkValidDates(){ //Goes through all rows in github_info and checks to see if each PAT expir date has passed. Removes from table if date passed.
    q = await client.query("SELECT * FROM github_info");
    today = new Date();
    expiredUsers = [];
    for(var i = 0; i < q.rows.length; i++){
        //currDateValue = String(q.rows[i].pat_token_expiration_date);
        if(q.rows[i].pat_token_expiration_date < today){
            console.log("Expired PAT for user: " + q.rows[i].github_username + ", Expired on: " + String(q.rows[i].pat_token_expiration_date));
            expiredUsers.push(q.rows[i].github_username);
        }
    }
    for(var i = 0; i < expiredUsers.length; i++){
        try{
            q = await client.query(`DELETE FROM github_info WHERE github_username = '${expiredUsers[i]}'`);
        } catch(error){
            console.error('Could not deletee from table: ', error);
        }
    }
}


async function main(){
    await connect();
    //today = await getCurrDate();
    await checkValidDates();
    await client.end();
    process.exit;
}


main()