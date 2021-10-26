import React, { useEffect, useState } from 'react';
import {
	Row,
	Col
} from 'react-bootstrap';

import './Timeline.css';
import Navbar from 'src/components/Navbar.js';



const Timeline = () => {

	const [isLoading, set_isLoading] = useState(true);

	if (isLoading) {
		return (
			<>
				{Navbar}
				<div style={{
					width: '100%',
					height: '100%',
					top: '0px',
					left: '0px'
				}}>
				</div>
			</>
		);
	}

	return (
		<>
		</>
	);
}

export default Timeline;
