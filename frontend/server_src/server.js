import express from 'express';
const app = express();
const port = process.env.REACT_APP_backendPort | 3001;

import accounts from './accounts.js';

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
			})
	}
});



// Listen
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
