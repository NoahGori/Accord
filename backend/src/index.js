import express from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT != undefined ? process.env.PORT : 3001;

import accounts from './accounts.js';
import timeline from './timeline.js';

app.use(express.json())
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


// GET accounts
app.get('/accounts', (req, res) => {
	if (req.query.website_key != undefined) {
		accounts.getUserViaWebsiteKey(req.query.website_key)
			.then(response => {
				res.status(200).send(response);
			})
			.catch(error => {
				res.status(500).send(error);
			});
	}
	else if(req.query.discord_id != undefined){
		accounts.getUserViaDiscordId(req.query.discord_id)
			.then(response => {
				res.status(200).send(response);
			})
			.catch(error => {
				res.status(500).send(error);
			});
	}
});

// POST accounts

app.post('/accounts',(req,res) =>{ // receives axios post requests to input account data into the db
	if(req.body.discord_id != undefined &&
		req.body.github_username != undefined &&
		req.body.discord_username != undefined &&
		req.body.discord_email != undefined){
			accounts.createNewAccount(req.body.discord_id, req.body.github_username, req.body.discord_username, req.body.discord_email);
		}
});



// GET timeline
app.get('/timeline', (req, res) => {
	if (req.query.website_key != undefined){
		timeline.getTimelineAssignmentObjectsViaWebsiteKey(req.query.website_key)
			.then(response => {
				res.status(200).send(response);
			})
			.catch(error => {
				res.status(500).send(error);
			});
	} else if (
		req.query.discord_id != undefined && 
		req.query.timeline_id != undefined && 
		req.query.timeline_assignment_objects != undefined) {
		timeline.getTimelineAssignmentObjectsViaTimelineIdAndDiscordId(req.query.timeline_id, req.query.discord_id)
			.then(response => {
				res.status(200).send(response);
			})
			.catch(error => {
				res.status(500).send(error);
			});
	}
	else if(req.query.guild_id != undefined) {
		timeline.getTimelineViaGuildId(req.query.guild_id)
			.then(response => {
				res.status(200).send(response);
			})
			.catch(error => {
				res.status(500).send(error);
			});
	}
});



// Listen
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
