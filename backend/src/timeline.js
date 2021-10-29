import pool from './database.js';
import { isAlphanumerical } from 'is-alphanumerical';


// GETTERS
const getTimelineViaGuildId = (guild_id) => {
	return new Promise(function(resolve, reject) {
		if (isAlphanumerical(guild_id)) {
			pool.query(`
			SELECT *
			FROM timeline
			WHERE guild_id='${guild_id}';
			`, (error, results) => {
				if (error) {
					reject(error);
				} else {
					resolve(results.rows);
				}
			});
		} else {
			reject(`guild_id is not alphanumerical:\n\r${guild_id}`);
		}
	});
}

const getTimelineAssignmentObjectsViaTimelineIdAndDiscordId = (timeline_id, discord_id) => {
	return new Promise(function(resolve, reject) {
		if (isAlphanumerical(timeline_id) && isAlphanumerical(discord_id)) {
			pool.query(`
			SELECT *
			FROM timeline_assignment_objects
			WHERE timeline_id='${timeline_id}' and discord_id='${discord_id}';
			`, (error, results) => {
				if (error) {
					reject(error);
				} else {
					resolve(results.rows);
				}
			});
		} else {
			reject(`timeline_id or discord_id is not alphanumerical:\n\r${timeline_id}, ${discord_id}`);
		}
	});
}

const getTimelineAssignmentObjectsViaGuildIdAndWebsiteKey = (guild_id, website_key) => {
	return new Promise(function(resolve, reject) {
		var tempDID; 
		if (isAlphanumerical(guild_id) && isAlphanumerical(website_key)) {
			//Temporarily places discord id from next query here for later use
			pool.query(` 
			SELECT discord_id
			FROM accounts
			WHERE website_key = '${website_key}';
			`,
				(error, results) => {
					if (error) {
						reject(error);
					} else {
						tempDID = results.rows[0].discord_id;
					}
				});

			pool.query(` 
			SELECT *
			FROM timeline_permission
			WHERE discord_id = '${tempDID}';
			`,
				(error, results) => {
					if (error) {
						reject(error);
					} else {
						console.log(results.rows)
						resolve(results.rows);
					}
				});
		
		} else {
			reject(`timeline_id or discord_id is not alphanumerical:\n\r${timeline_id}, ${discord_id}`);
		}
	});
}

// SETTERS



// EXPORTS
export default {
	getTimelineViaGuildId,
	getTimelineAssignmentObjectsViaTimelineIdAndDiscordId,
	getTimelineAssignmentObjectsViaGuildIdAndWebsiteKey
}
