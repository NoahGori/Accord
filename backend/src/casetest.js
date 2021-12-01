//This is purely just to test axios calls, should be working in this current state
import axios from 'axios';
import { response } from 'express';

const backendURL='http://localhost:3001'

const createNewTimeline = (id, guild_id, premium_version) =>{
  axios.post(`${backendURL}/timeline`, {
      id: id,
      guild_id: guild_id,
      premium_version: premium_version
  });
}

const createNewTimelineAssignmentObject = (timeline_id, discord_id, start_date, end_date, assignment_title, assignment_description, status) =>{
  axios.post(`${backendURL}/timeline`, {
      timeline_id: timeline_id,
      discord_id: discord_id,
      start_date: start_date,
      end_date: end_date,
      assignment_title: assignment_title,
      assignment_description: assignment_description,
      status: status,

  });
}

const createNewTimelinePermission = (discord_id, timeline_id, owner, editor, worker) =>{
  axios.post(`${backendURL}/timeline`, {
      discord_id: discord_id,
      timeline_id: timeline_id,
      owner: owner,
      editor: editor,
      worker: worker
  });
}

const deleteTimeline = (id) => {
  axios.post(`${backendURL}/timeline`, {    //Needs to be set up like this for axios.delete or else it cannot be read
    DELETE: true,    
    timeline_id: id
  });
}
const deleteTimelineAssignmentObject = (timeline_id, discord_id, start_date, end_date, assignment_title, assignment_description, status) => {
  axios.post(`${backendURL}/timeline`, {   
    DELETE: true,    
    timeline_id: timeline_id,
    discord_id: discord_id,
    start_date: start_date,
    end_date: end_date,
    assignment_title: assignment_title,
    assignment_description: assignment_description,
    status: status,
  });
}

const deleteTimelinePermission = (discord_id, timeline_id, owner, editor, worker) => {
  axios.post(`${backendURL}/timeline?`, {   
    DELETE: true,    
    discord_id: discord_id,
    timeline_id: timeline_id,
    owner: owner,
    editor: editor,
    worker: worker
  });
}


const getAllTimelineObjectsWithTimelineId = (timeline_id) => {
  return axios
      .get(`${backendURL}/timeline?timeline_id=${timeline_id}&ALL_OBJECTS=true`)
      .then(response => {
          console.log(response.data);
          return response.data
      })
}

const getTimelineAssignmentObjectsViaWebsiteKeyAsync = (website_key) => {
  return axios
      .get(`${backendURL}/timeline?website_key=${website_key}`)
      .then(response => {
        console.log(response.data);
          return response.data
      })
}



//testPostAccountVia_discord_id();
//createNewTimeline();
var id = 6;
var discord_id = "207922540163760335";
var guild_id = "898251356920500264";
var start_date = "2022-10-22 14:22:09";
var end_date = "2022-10-23 14:22:09";
var assignment_title = "Assignment1";
var assignment_description = "Assignment 1s description";
var status = "active";

//createNewTimeline(id,guild_id,true);
//createNewTimelineAssignmentObject(id,discord_id,start_date,end_date,assignment_title,assignment_description,status);
//createNewTimelinePermission(discord_id, id, true, false, false);

//getTimelineAssignmentObjectsViaWebsiteKeyAsync(3);

deleteTimeline(id);
//deleteTimelineAssignmentObject(id,discord_id,start_date,end_date,assignment_title,assignment_description,status);
//deleteTimelinePermission(discord_id, id);


/*testGetTimelineAssignmentObjectsViaWebsiteKey(3)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => console.error(error));*/