import express from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT != undefined ? process.env.PORT : 3001;

import accounts from './accounts.js';
import timeline from './timeline.js';

app.use(express.json())
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
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
    req.query.timeline_id != undefined) {
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

//POST and DELETE timeline. Workaround

app.post('/timeline',(req,res) =>{
  if (req.body.DELETE === undefined) {
    if(req.body.id != undefined &&
      req.body.guild_id != undefined &&
      req.body.premium_version != undefined){
      timeline.createNewTimeline(req.body.id,req.body.guild_id,req.body.premium_version)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      });


    } else if (req.body.timeline_id != undefined &&
      req.body.discord_id != undefined &&
      req.body.start_date != undefined &&
      req.body.end_date != undefined &&
      req.body.assignment_title != undefined &&
      req.body.assignment_description != undefined &&
      req.body.status != undefined){
      timeline.createNewTimelineAssignmentObject(req.body.timeline_id,req.body.discord_id,req.body.start_date,req.body.end_date,req.body.assignment_title,req.body.assignment_description,req.body.status)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      });

    } else if (req.body.discord_id != undefined &&
      req.body.timeline_id != undefined &&
      req.body.owner != undefined &&
      req.body.editor != undefined &&
      req.body.worker != undefined){
      timeline.createNewTimelinePermission(req.body.discord_id,req.body.timeline_id,req.body.owner,req.body.editor,req.body.worker)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      });
    }
  } else {
    if (req.body.timeline_id != undefined &&
      req.body.discord_id != undefined &&
      req.body.start_date != undefined &&
      req.body.end_date != undefined &&
      req.body.assignment_title != undefined &&
      req.body.assignment_description != undefined &&
      req.body.status != undefined) {
      timeline.deleteTimelineAssignmentObject(req.body.timeline_id,req.body.discord_id,req.body.start_date,req.body.end_date,req.body.assignment_title,req.body.assignment_description,req.body.status)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      });
    } else if (req.body.timeline_id != undefined &&
      req.body.discord_id != undefined) {
      timeline.deleteTimelinePermission(req.body.timeline_id, req.body.discord_id)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      });
    } else if (req.body.timeline_id != undefined) {
      timeline.deleteTimeline(req.body.timeline_id)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      });
    }
  }
});

//PUT timeline

app.put('/timeline',(req,res) => {
  if (req.body.timeline_id != undefined &&
    req.body.discord_id != undefined &&
    req.body.old_start_date != undefined &&
    req.body.old_end_date != undefined &&
    req.body.old_assignment_title != undefined &&
    req.body.old_assignment_description != undefined &&
    req.body.old_status != undefined &&
    req.body.new_start_date != undefined &&
    req.body.new_end_date != undefined &&
    req.body.new_assignment_title != undefined &&
    req.body.new_assignment_description != undefined &&
    req.body.new_status != undefined) {
    timeline.updateTimelineAssignmentObject(req.body.timeline_id,
      req.body.discord_id,
      req.body.old_start_date,
      req.body.old_end_date,
      req.body.old_assignment_title,
      req.body.old_assignment_description,
      req.body.old_status,
      req.body.new_start_date,
      req.body.new_end_date,
      req.body.new_assignment_title,
      req.body.new_assignment_description,
      req.body.new_status)
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
