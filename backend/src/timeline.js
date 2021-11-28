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

const createNewTimeline = (id, guild_id, premium_version) =>{ //Receives axios post request from index.js, connects to db and creates new timeline
	if (isAlphanumerical(id) && isAlphanumerical(guild_id) && isAlphanumerical(premium_version)) {
		//Inputs id, guild_id, premium version state into a query to insert to the timeline table
		var promise1 = new Promise(function(resolve, reject) {
			pool.query(` 
				INSERT INTO timeline(id,guild_id,premium_version) VALUES('${id}','${guild_id}', ${premium_version});`
			, (error) => {
					if (error) {
						reject(error);
					} else {
						resolve('Added timeline');
					}
				});
		});
	}
}

const createNewTimelineAssignmentObject = (timeline_id, discord_id, start_date, end_date, assignment_title, assignment_description, status) =>{ //Receives axios post request from index.js, connects to db and creates new timeline_assignment_object
	if (isAlphanumerical(timeline_id) && isAlphanumerical(discord_id) && isAlphanumerical(assignment_title) && isAlphanumerical(assignment_description)) {
		var promise1 = new Promise(function(resolve, reject) {
			pool.query(` 
				INSERT INTO timeline_assignment_objects(timeline_id, discord_id, start_date, end_date, assignment_title, assignment_description, status) VALUES('${timeline_id}','${discord_id}', '${start_date}', '${end_date}', '${assignment_title}', '${assignment_description}', '${status}');`
			, (error) => {
					if (error) {
						reject(error);
					} else {
						resolve('Added timeline assignment object');
					}
				});
		});
	}
}

const createNewTimelinePermission = (discord_id, timeline_id, owner, editor, worker) =>{ //Receives axios post request from index.js, connects to db and creates new timeline_permission
	if (isAlphanumerical(discord_id) && isAlphanumerical(timeline_id)) {
		var promise1 = new Promise(function(resolve, reject) {
			pool.query(` 
			INSERT INTO timeline_permission(discord_id,timeline_id,owner,editor,worker) VALUES('${discord_id}','${timeline_id}',${owner},${editor},${worker});`
			, (error) => {
					if (error) {
						reject(error);
					} else {
						resolve('Added timeline permission');
					}
				});
		});
	}
}

// DELETES

const deleteTimeline = (timeline_id) =>{  //Receives axios post request from index.js, connects to db and deletes timeline from timeline, timeline_assignment_object, and timeline_permission
	if (isAlphanumerical(timeline_id)) {
		var promise1 = new Promise(function(resolve, reject) {
			pool.query(` 
			DELETE FROM timeline_assignment_objects WHERE timeline_id = '${timeline_id}';`
			, (error) => {
					if (error) {
						reject(error);
					} else {
						console.log(`Deleted timeline '${timeline_id}' from timeline_assignment_objects`);
						pool.query(` 
						DELETE FROM timeline_permission WHERE timeline_id = '${timeline_id}';`
						, (error) => {
							if (error) {
								reject(error);
							} else {
								console.log(`Deleted timeline '${timeline_id}' from timeline_permission`);
								pool.query(` 
								DELETE FROM timeline WHERE id = '${timeline_id}';`
								, (error) => {
									if (error) {
										reject(error);
									} else {
										resolve(`Deleted timeline '${timeline_id}' from timeline`);
									}
								});
							}
						});
					}
				});
		});
	}
}

const deleteTimelineAssignmentObject = (timeline_id, discord_id, start_date, end_date, assignment_title, assignment_description, status) =>{ //Receives axios post request from index.js, connects to db and deletes timeline assignment object
	if (isAlphanumerical(timeline_id) && isAlphanumerical(discord_id) && isAlphanumerical(assignment_title) && isAlphanumerical(assignment_description)) {
		var promise1 = new Promise(function(resolve, reject) {
			pool.query(` 
			DELETE FROM timeline_assignment_objects WHERE timeline_id = '${timeline_id}' AND discord_id = '${discord_id}' AND start_date = '${start_date}' 
			AND end_date = '${end_date}' AND assignment_title = '${assignment_title}' AND assignment_description = '${assignment_description}' AND status = '${status}';`
			, (error) => {
					if (error) {
						reject(error);
					} else {
						resolve(`Deleted timeline '${timeline_id}' from timeline_assignment_objects`);
					}
				});
		});
	}
}

const deleteTimelinePermission = (timeline_id,discord_id) =>{ // Receives axios post request from index.js, connects to db and deletes timeline_permission
	if (isAlphanumerical(timeline_id) && isAlphanumerical(discord_id)) {
		var promise1 = new Promise(function(resolve, reject) {
			pool.query(` 
			DELETE FROM timeline_permission WHERE timeline_id = '${timeline_id}' AND discord_id = '${discord_id}';`
			, (error) => {
					if (error) {
						reject(error);
					} else {
						resolve(`Deleted timeline '${timeline_id}' with discord_id '${discord_id}' from timeline_permission`);
					}
				});
		});
	}
}

// EXPORTS
export default {
	getTimelineViaGuildId,
	getTimelineAssignmentObjectsViaTimelineIdAndDiscordId,
	getTimelineAssignmentObjectsViaWebsiteKey,
	createNewTimeline,
	createNewTimelineAssignmentObject,
	createNewTimelinePermission,
	deleteTimeline,
	deleteTimelineAssignmentObject,
	deleteTimelinePermission
}
