import pool from './database.js';
import { isAlphanumerical } from 'is-alphanumerical';
import { query } from 'express';


// GETTERS
const getTimelineViaGuildId = (guild_id) => { //Returns timeline info when get request with guild_id is sent to server
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

const getTimelineAssignmentObjectsViaTimelineIdAndDiscordId = (timeline_id, discord_id) => {//Returns timeline assignment objects when get request with timeline_id and discord_id is sent to server
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

const getTimelineAssignmentObjectsViaWebsiteKey = (website_key) => {// Returns timeline assignment objects when get requests with guild_id and website_key is sent to the server
	return new Promise(function(resolve, reject) {
		var tempDID;
		if (isAlphanumerical(website_key)) {
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
						//Requests an Inner join of timeline_permission and timeline_assignment_objectts when discord_id and timeline_id are equal
						pool.query(` 
						SELECT DISTINCT timeline_assignment_objects.timeline_id, timeline_assignment_objects.discord_id,timeline_assignment_objects.start_date,timeline_assignment_objects.end_date,
						timeline_assignment_objects.assignment_title,timeline_assignment_objects.assignment_description,timeline_assignment_objects.status,
						timeline_permission.owner,timeline_permission.editor,timeline_permission.worker
						FROM timeline_assignment_objects
						INNER JOIN timeline_permission 
						ON timeline_permission.discord_id=timeline_assignment_objects.discord_id AND timeline_permission.timeline_id=timeline_assignment_objects.timeline_id
						WHERE timeline_assignment_objects.discord_id='${tempDID}';
						`,
							(error, results2) => {
								if (error) {
									reject(error);
								} else {
									var queryLength = results2.rows.length;
									var timelineIdArr = [];
									for(var i = 0; i < queryLength; i++){ //Adds all timeline_id's where this discord user is an owner/editor into an array
										if((results2.rows[i].owner == true || results2.rows[i].editor == true) && timelineIdArr.indexOf(results2.rows[i].timeline_id) === -1){
											timelineIdArr.push(results2.rows[i].timeline_id);
										}
									}
									if(timelineIdArr.length >= 1){ //Iterates through timelineIdArr and resolves an array of all timeline_assignment_objects where discord_id is involved and has permission to view
										var resultsArr = []
										for(var i = 0; i < timelineIdArr.length; i++){
											pool.query(` 
											SELECT DISTINCT timeline_assignment_objects.timeline_id, timeline_assignment_objects.discord_id,timeline_assignment_objects.start_date,timeline_assignment_objects.end_date,
											timeline_assignment_objects.assignment_title,timeline_assignment_objects.assignment_description,timeline_assignment_objects.status,
											timeline_permission.owner,timeline_permission.editor,timeline_permission.worker
											FROM timeline_assignment_objects
											INNER JOIN timeline_permission 
											ON timeline_permission.discord_id=timeline_assignment_objects.discord_id AND timeline_permission.timeline_id=timeline_assignment_objects.timeline_id
											WHERE timeline_assignment_objects.timeline_id='${timelineIdArr[i]}';
											`, (error, results3) => {
													if (error) {
														reject(error);
													} else {
														resultsArr.push(results3.rows)
														if(resultsArr.length >= timelineIdArr.length){
															resolve(resultsArr)
														}
													}
												});
										}
									}
									else{
										resolve(results2.rows);
									}
								}
							});
					}
				});

			
		
		} else {
			reject(`website_key is not alphanumerical:\n\r${website_key}`);
		}
	});
}

// SETTERS



// EXPORTS
export default {
	getTimelineViaGuildId,
	getTimelineAssignmentObjectsViaTimelineIdAndDiscordId,
	getTimelineAssignmentObjectsViaWebsiteKey
}
