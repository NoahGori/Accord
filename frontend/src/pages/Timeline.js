import React, { useEffect, useState } from 'react';
import {
	Row,
	Col
} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import './Timeline.css';
import Navbar from 'src/components/Navbar.js';
import LoadingPage from 'src/components/LoadingPage.js';

const Timeline = () => {
	const [isLoading, set_isLoading] = useState(true);
	const [page, set_page] = useState(false);

	// This gets our website key so we can log in securely
	const GetWebsiteKey = () => {
		return new URLSearchParams(useLocation().search).get('website_key');
	}

	let website_key = GetWebsiteKey;


	useEffect(() => {
		if (isLoading) {
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
