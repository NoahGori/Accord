//This is purely just to test axios calls, should be working in this current state
import axios from 'axios';

const backendURL='http://localhost:3001'

const testPostAccountVia_discord_id = () => {
    console.log('casetest running');
  axios.post(`${backendURL}/accounts`, {
      discord_id: '20792254016376023225',
      github_username: 'johndoe5',
      discord_username: 'johndoe5#3215',
      discord_email: 'johndoe5@gmail.com'
  });
  
  console.log('casetest ran');
}

const testPostTimeline = () => {
  console.log('casetest running: timeline post');
  axios.post(`${backendURL}/timeline`, {
    id: '2',
    guild_id: '898251356920500264',
    premium_version: 'true'
});

console.log('casetest ran: timeline post');
}

const testPostTimelineObject = () => {
  console.log('casetest running: timeline post');
  axios.post(`${backendURL}/timeline`, {
    id: '3',
    guild_id: '898251356920500264',
    premium_version: 'true'
});

console.log('casetest ran: timeline post');
return true;
}

const testPostTimelineAssignmentObject = () => {
  console.log('casetest running: testPostTimelineAssignmentObject');
  axios.post(`${backendURL}/timeline`, {
    timeline_id: "3",
    discord_id: "207922540163760130",
    start_date: "2022-10-22 14:22:09",
    end_date: "2022-10-30 14:22:09",
    assignment_title: "Assignment3",
    assignment_description: "Assignment 3s description",
    status: "active",
});

console.log('casetest ran: testPostTimelineAssignmentObject');
}

const testPostTimelinePermission = () => {
  console.log('casetest running: testPostTimelinePermission');
  axios.post(`${backendURL}/timeline`, {
    discord_id: "207922540163760130",
    timeline_id: "3",
    owner: false,
    editor: false,
    worker: true
});
console.log('casetest ran: testPostTimelinePermission');
}

const testDeleteTimeline = () => {
  console.log('casetest running: testDeleteTimeline');
  axios.delete(`${backendURL}/timeline`, {
    data:{    //Needs to be set up like this for axios.delete or else it cannot be read
      timeline_id: "3"
    }
});
console.log('casetest ran: testDeleteTimeline');
}

const testDeleteTimelineAssignmentObjects = () => {
  console.log('casetest running: testDeleteTimelineAssignmentObjects');
  axios.delete(`${backendURL}/timeline`, {
    data:{    //Needs to be set up like this for axios.delete or else it cannot be read
      timeline_id: "3",
      discord_id: "207922540163760130",
      start_date: "2022-10-22 14:22:09",
      end_date: "2022-10-30 14:22:09",
      assignment_title: "Assignment3",
      assignment_description: "Assignment 3s description",
      status: "active",
    }
});
console.log('casetest ran: testDeleteTimelineAssignmentObjects');
}

const testDeleteTimelinePermission = () => {
  console.log('casetest running: testDeleteTimelinePermission');
  axios.delete(`${backendURL}/timeline`, {
    data:{    //Needs to be set up like this for axios.delete or else it cannot be read
      timeline_id: "3",
      discord_id: "207922540163760130"
    }
});
console.log('casetest ran: testDeleteTimelinePermission');
}

//testPostAccountVia_discord_id();
//testPostTimeline();

/*if(testPostTimelineObject() == true){     //Used to test timeline create
  testPostTimelineAssignmentObject();
  testPostTimelinePermission();
}*/

//testDeleteTimeline();                   //used to test timeline delete
//testDeleteTimelineAssignmentObjects();
//testDeleteTimelinePermission();



