import React from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
} from 'react-router-dom';

import LandingPage from 'src/pages/LandingPage.js';
import Timeline from 'src/pages/Timeline.js';
import ViewTimeline from 'src/pages/ViewTimeline.js';

function App() {
	return (
		<div id='App' style={{ background: '#f8f8ff', color: 'white'}}>
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
				integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
				crossOrigin="anonymous"
			/>
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={LandingPage} />
					<Route path='/Timeline' component={Timeline} />
          <Route path='/ViewTimeline' component={ViewTimeline} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
