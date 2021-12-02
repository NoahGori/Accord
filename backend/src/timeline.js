import pool from './database.js';
import { query } from 'express';


// GETTERS
const getTimelineViaGuildId = (guild_id) => { //Returns timeline info when get request with guild_id is sent to server
  return new Promise(function(resolve, reject) {
    pool.query(`
      SELECT *
      FROM timeline
      WHERE guild_id=$1;`, 
      [guild_id], 
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      });
  });
}

const getTimelineAssignmentObjectsViaTimelineIdAndDiscordId = (timeline_id, discord_id) => {//Returns timeline assignment objects when get request with timeline_id and discord_id is sent to server
  return new Promise(function(resolve, reject) {
    pool.query(`
      SELECT *
      FROM timeline_assignment_objects
      WHERE timeline_id=$1 and discord_id=$2;
      `,
      [timeline_id, discord_id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      });

  });
}

const getTimelineAssignmentObjectsViaWebsiteKey = (website_key) => {// Returns timeline assignment objects when get requests with guild_id and website_key is sent to the server
  return new Promise(function(resolve, reject) {
    var tempDID;
    //Temporarily places discord id from next query here for later use
    pool.query(` 
      SELECT *
      FROM (
        SELECT *
        FROM timeline_assignment_objects
        WHERE timeline_id IN (
          SELECT timeline_id
          FROM timeline_permission
          WHERE discord_id IN (
            SELECT discord_id
            FROM accounts
            WHERE website_key = $1
          )
        )
      )a
      INNER JOIN (
        SELECT *
        FROM timeline_permission
        WHERE discord_id IN (
          SELECT discord_id
          FROM accounts
          WHERE website_key = $1
        )
      )b
      ON a.timeline_id = b.timeline_id;
      `,
      [website_key],
      (error, results) => {
        if (error) {
          reject(error);
        } else { 
          resolve(results.rows);
        }
      });
  });
}

const getAllTimelineObjectsWithTimelineId = (timeline_id) => {
  return new Promise(function(resolve, reject) {
    //Temporarily places discord id from next query here for later use
    pool.query(` 
      SELECT *
      FROM timeline_assignment_objects
      WHERE timeline_id = $1;
      `,
      [timeline_id],
      (error, results) => {
        if (error) {
          reject(error);
        } else { 
          resolve(results.rows);
        }
      });
  });
}

const getTimelinePermissionsWithDiscordId = (discord_id) => {
  return new Promise(function(resolve, reject) {
    pool.query(`
      SELECT *
      FROM timeline_permission
      WHERE discord_id = $1;`,
      [discord_id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      });
  });
}

// INSERTS

const createNewTimeline = (id, guild_id, premium_version) =>{ //Receives axios post request from index.js, connects to db and creates new timeline
  //Inputs id, guild_id, premium version state into a query to insert to the timeline table
  return new Promise(function(resolve, reject) {
    pool.query(` 
        INSERT INTO timeline(id,guild_id,premium_version) 
        VALUES($1,$2,$3);`, 
      [id, guild_id, premium_version],
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve('Added timeline');
        }
      });
  });
}

const createNewTimelineAssignmentObject = (timeline_id, discord_id, start_date, end_date, assignment_title, assignment_description, status) =>{ //Receives axios post request from index.js, connects to db and creates new timeline_assignment_object
  return new Promise(function(resolve, reject) {
    pool.query(` 
        INSERT INTO timeline_assignment_objects (timeline_id,
          discord_id,
          start_date,
          end_date,
          assignment_title,
          assignment_description,
          status) 
        VALUES ($1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7);`, 
      [timeline_id, discord_id, start_date, end_date, assignment_title, assignment_description, status],
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve('Added timeline assignment object');
        }
      });
  });
}

const createNewTimelinePermission = (discord_id, timeline_id, owner, editor, worker) =>{ //Receives axios post request from index.js, connects to db and creates new timeline_permission
  return new Promise(function(resolve, reject) {
    pool.query(` 
        INSERT INTO timeline_permission(discord_id,timeline_id,owner,editor,worker) 
          VALUES($1,$2,$3,$4,$5);`, 
      [discord_id, timeline_id, owner, editor, worker],
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve('Added timeline permission');
        }
      });
  });
}

// DELETES

const deleteTimeline = (timeline_id) =>{  //Receives axios post request from index.js, connects to db and deletes timeline from timeline, timeline_assignment_object, and timeline_permission
  return new Promise(function(resolve, reject) {
    pool.query(` 
        DELETE FROM timeline_assignment_objects 
        WHERE timeline_id = $1;`, 
      [timeline_id],
      (error) => {
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

const deleteTimelineAssignmentObject = (timeline_id, discord_id, start_date, end_date, assignment_title, assignment_description, status) =>{ //Receives axios post request from index.js, connects to db and deletes timeline assignment object
  return new Promise(function(resolve, reject) {
    pool.query(`
      DELETE FROM timeline_assignment_objects
      WHERE timeline_id=$1
      AND discord_id=$2
      AND start_date >= ($3::timestamp - INTERVAL '1' day) 
      AND start_date <= ($3::timestamp + INTERVAL '1' day)
      AND end_date >= ($4::timestamp - INTERVAL '1' day) 
      AND end_date <= ($4::timestamp + INTERVAL '1' day)
      AND assignment_title=$5
      AND assignment_description=$6
      AND status=$7;
    `,
      [timeline_id, discord_id, start_date, end_date, assignment_title, assignment_description, status],
      (error) => {
        if (error)
          reject(error);
        else
          resolve('Deleted timeline_assignment_objects');
      });
  });
}

const deleteTimelinePermission = (timeline_id,discord_id) =>{ // Receives axios post request from index.js, connects to db and deletes timeline_permission
  return new Promise(function(resolve, reject) {
    pool.query(` 
        DELETE FROM timeline_permission 
        WHERE timeline_id = $1 
        AND discord_id = $2;`, 
      [timeline_id, discord_id],
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(`Deleted timeline '${timeline_id}' with discord_id '${discord_id}' from timeline_permission`);
        }
      });
  });
}

// UPDATES
const updateTimelineAssignmentObject = (timeline_id, discord_id, old_start_date, old_end_date, old_assignment_title, old_assignment_description, old_status, new_start_date, new_end_date, new_assignment_title, new_assignment_description, new_status) => { // Takes an old and a new timeline object and updates the entire thing!!!
  return new Promise(function(resolve, reject) {
    pool.query(`
        UPDATE timeline_assignment_objects
        SET start_date=$8,
          end_date=$9,
          assignment_title=$10,
          assignment_description=$11,
          status=$12
        WHERE timeline_id=$1
        AND discord_id=$2
        AND start_date >= ($3::timestamp - interval '1' day) AND start_date <= ($3::timestamp + interval '1' day)
        AND end_date >= ($4::timestamp - interval '1' day) AND end_date <= ($4::timestamp + interval '1' day)
        AND assignment_title=$5
        AND assignment_description=$6
        AND status=$7;
      `, 
      [timeline_id,                     // 1
        discord_id,                     // 2
        old_start_date,                 // 3
        old_end_date,                   // 4
        old_assignment_title,           // 5
        old_assignment_description,     // 6
        old_status,                     // 7
        new_start_date,                 // 8
        new_end_date,                   // 9
        new_assignment_title,           // 10
        new_assignment_description,     // 11
        new_status],                    // 12
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(`updated`);
        }
      });
  });
}

// EXPORTS
export default {
  getTimelineViaGuildId,
  getTimelineAssignmentObjectsViaTimelineIdAndDiscordId,
  getTimelineAssignmentObjectsViaWebsiteKey,
  getTimelinePermissionsWithDiscordId,
  getAllTimelineObjectsWithTimelineId,
  createNewTimeline,
  createNewTimelineAssignmentObject,
  createNewTimelinePermission,
  deleteTimeline,
  deleteTimelineAssignmentObject,
  deleteTimelinePermission,
  updateTimelineAssignmentObject,
}
