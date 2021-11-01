import pool from './database.js';
import { isAlphanumerical } from 'is-alphanumerical';

const getUserViaWebsiteKey = (website_key) => {
	return new Promise(function(resolve, reject) {
		if (isAlphanumerical(website_key)) {
			pool.query(`
			select *
			from accounts
			where website_key='${website_key}';
			`, (error, results) => {
				if (error) {
					reject(error);
				} else {
					resolve(results.rows);
				}
			});
		} else {
			reject(`website_key is not alphanumerical:\n\r${website_key}`);
		}
	});
}

const getUserViaDiscordId = (discord_id) => {
	return new Promise(function(resolve, reject) {
		if (isAlphanumerical(discord_id)) {
			pool.query(`
			select *
			from accounts
			where discord_id='${discord_id}';
			`, (error, results) => {
				if (error) {
					reject(error);
				} else {
					resolve(results.rows);
				}
			});
		} else {
			reject(`discord_id is not alphanumerical:\n\r${website_key}`);
		}
	});
}


const createNewAccount = (discord_id, github_username, discord_username, discord_email) =>{
	if (isAlphanumerical(discord_id) && isAlphanumerical(github_username) && isAlphanumerical(discord_username) && isAlphanumerical(discord_email)) {
		//Temporarily places discord id from next query here for later use
		pool.query(` 
		INSERT INTO github_info(github_username) VALUES('${github_username}');`);
		pool.query(` 
		INSERT INTO accounts(discord_id,github_username,discord_username,discord_email)
		VALUES('${discord_id}','${github_username}','${discord_username}','${discord_email}');`);
	
	} else {
		reject(`account inputs are not alphanumerical:\n\r${discord_id}, ${github_username}, ${discord_username}, ${discord_email}`);
	}
}

export default {
	getUserViaWebsiteKey,
	getUserViaDiscordId,
	createNewAccount
}
