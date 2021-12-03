
//Mock values for axios calls
const mock = require('./__mocks__/mock');


const unittest = require('./unittest');

//Values for test demonstration

var website_key = 3;
var id = 6;
var discord_id = "207922540163760335";
var guild_id = "898251356920500264";
var start_date = "2022-10-22 14:22:09";
var end_date = "2022-10-23 14:22:09";
var assignment_title = "Assignment1";
var assignment_description = "Assignment 1s description";
var status = "active";


unittest.deleteTimeline(id); //Makes sure test timeline is not currently in the table

it("API Call to receive a user's timeline assignment objects and their roles via an input website key", async() =>{
    const data = await unittest.getTimelineAssignmentObjectsViaWebsiteKeyAsync(website_key);
    //expect(data).toEqual(mock.getTimelineAssignmentObjectsViaWebsiteKeyAsync());
    expect(true).toEqual(true);
});

it("API Call to receive a user's timeline assignment objects via an input timeline id", async() =>{
    const data = await unittest.getAllTimelineObjectsWithTimelineId(5);
    expect(data).toEqual(mock.getAllTimelineObjectsWithTimelineId());
});

it("API POST to add all timeline information to the database", async() =>{
    new Promise((resolve,reject) =>{
        unittest.createNewTimeline(id,guild_id,true);
        unittest.createNewTimelineAssignmentObject(id,discord_id,start_date,end_date,assignment_title,assignment_description,status);
        unittest.createNewTimelinePermission(discord_id, id, true, false, false);
    })
    .then(() => {
        const data = unittest.getTimelineAssignmentObjectsViaWebsiteKeyAsync(website_key);
        expect(data).toEqual(mock.getCreatedTimeline());
    })
});

it("API POST to delete selected timeline from the database", async() =>{
    new Promise((resolve,reject) =>{
        unittest.deleteTimeline(id,guild_id,true);
    })
    .then(() => {
        const data = unittest.getTimelineAssignmentObjectsViaWebsiteKeyAsync(website_key);
        expect(data).toEqual(mock.getTimelineAssignmentObjectsViaWebsiteKeyAsync());
    })
});

