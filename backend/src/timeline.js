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
		if (isAlphanumerical(guild_id)) {
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

const getTimelinePermissionsViaTimelineIdAndDiscordId = (timeline_id, discord_id) => {
	return new Promise(function(resolve, reject) {
		if (isAlphanumerical(guild_id)) {
			poo.query(`
			SELECT *
			FROM timeline_permission
			WHERE timeline_id='${timeline_id}' AND discord_id='${discord_id}'`,
				(error, results) => {
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

// SETTERS




// EXPORTS
export default {
	getTimelineViaGuildId,
	getTimelineAssignmentObjectsViaTimelineIdAndDiscordId
}
