const axios = require ('axios');
const backendURL='http://localhost:3001'

//gets
const getTimelineAssignmentObjectsViaWebsiteKeyAsync = (website_key) => {
    return axios
        .get(`${backendURL}/timeline?website_key=${website_key}`)
        .then(response => {
            return response.data
        })
        .catch(error =>{
            return ""
        })
}

const getAllTimelineObjectsWithTimelineId = (timeline_id) => {
    return axios
        .get(`${backendURL}/timeline?timeline_id=${timeline_id}&ALL_OBJECTS=true`)
        .then(response => {
            return response.data
        })
}

const getTimelineWithGuildId = (guild_id) => {
    return axios
        .get(`${backendURL}/timeline?timeline_id=${timeline_id}&ALL_OBJECTS=true`)
        .then(response => {
            return response.data
        })
}


//post

const createNewTimeline = (id, guild_id, premium_version) =>{
    console.log("found");
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
//delete

const deleteTimeline = (id) => {
    axios.post(`${backendURL}/timeline`, {   
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

const deleteTimelinePermission = (discord_id, ) => {
    axios.post(`${backendURL}/timeline?`, {   
      DELETE: true,    
      discord_id: discord_id,
    });
}
//getAllTimelineObjectsWithTimelineId(1);


//Exports for unittest.test.js
exports.getTimelineAssignmentObjectsViaWebsiteKeyAsync = getTimelineAssignmentObjectsViaWebsiteKeyAsync;
exports.getAllTimelineObjectsWithTimelineId = getAllTimelineObjectsWithTimelineId;
exports.createNewTimeline=createNewTimeline;
exports.createNewTimelineAssignmentObject=createNewTimelineAssignmentObject;
exports.createNewTimelinePermission=createNewTimelinePermission;
exports.deleteTimeline=deleteTimeline;
exports.deleteTimelineAssignmentObject=deleteTimelineAssignmentObject;
exports.deleteTimelinePermission=deleteTimelinePermission;

