import express from 'express';
const app = express();
const port = process.env.REACT_APP_backendPort | 3001;

import accounts from './accounts.js';
import timeline from './timeline.js';

app.use(express.json())
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
});



// GET timeline
app.get('/timeline', (req, res) => {
	if (req.query.guild_id != undefined) {
		timeline.getTimelineViaGuildId(req.query.guild_id)
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
});



// Listen
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
