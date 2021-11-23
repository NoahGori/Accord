import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import './Timeline.css';
import Navbar from 'src/components/Navbar.js';
import LoadingPage from 'src/components/LoadingPage.js';
import { backendURL } from 'src/components/constants.js';

const Timeline = () => {
	const [isLoading, set_isLoading] = useState(true);
	const [page, set_page] = useState(false);

	// This gets our website key so we can log in securely
	const GetWebsiteKey = () => {
		return new URLSearchParams(useLocation().search).get('website_key');
	}
	const GetGuildID = () => {
		return new URLSearchParams(useLocation().search).get('guild_id');
	}

	const website_key = GetWebsiteKey();
	const guild_id = GetGuildID();

	useEffect(() => {
		if (isLoading) {
      console.log(`${backendURL}/timeline?website_key=${website_key}`)
			axios.get(`${backendURL}/timeline?website_key=${website_key}`)
				.then((result, error) => {
					if (error) {
						console.error(error);
					} else {
            console.log(result);
					}
				})
		}
	});

	if (isLoading) {
		return (
			<>
				{Navbar()}
				{LoadingPage()}
			</>
		);
	}

	return (
		<>
			{Navbar()}
			{page}
		</>
	);
}

export default Timeline;
