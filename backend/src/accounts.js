import pool from "./database.js";

const getUserViaWebsiteKey = (website_key) => {
  //Returns user info when get request with website key is sent to server
  return new Promise(function (resolve, reject) {
    pool.query(
      `
    SELECT *
    FROM accounts
    WHERE website_key=$1;`,
      [website_key],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      }
    );
  });
};

const getUserViaDiscordId = (discord_id) => {
  //Returns user info when get request with discord id input is sent to server
  return new Promise(function (resolve, reject) {
    pool.query(
      `
      SELECT *
      FROM accounts
      WHERE discord_id=$1;`,
      [discord_id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      }
    );
  });
};

const createNewAccount = (
  discord_id,
  github_username,
  discord_username,
  discord_email
) => {
  //Receives axios post request from index.js, connects to db and creates new useer
  //Initially inputs github_username to have accounts input remain valid
  var promise1 = new Promise(function (resolve, reject) {
    pool.query(
      ` 
      INSERT INTO github_info(github_username) 
      VALUES($1);`,
      [github_username],
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve("Added github username");
        }
      }
    );
  });

  //Then inputs the account values into db
  return promise1.then(() => {
    pool.query(
      ` 
      INSERT INTO accounts(discord_id, github_username, discord_username, discord_email)
      VALUES($1, $2, $3, $4);`,
      [discord_id, github_username, discord_username, discord_email],
      (error) => {
        if (error) {
          console.log(error);
        }
      }
    );
  });
};

const getAuthViaDiscordId = (discord_id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      `
			select oauth_token
			from github_ouath_token
			where github_username=(
				select github_username
				from accounts
				where discord_id=$1
        );`,
      [discord_id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      }
    );
  });
};

const createGithubAuth = (github_username, oauth_token) => {
  console.log("Attempting to add to database");
  var promise1 = new Promise(function (resolve, reject) {
    pool.query(
      `INSERT INTO github_ouath_token(github_username, oauth_token)
			  VALUES($1, $2);`,
      [github_username, oauth_token],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Added auth token");
        }
      }
    );
  });
};

export default {
  getUserViaWebsiteKey,
  getUserViaDiscordId,
  createNewAccount,
  getAuthViaDiscordId,
  createGithubAuth,
};
