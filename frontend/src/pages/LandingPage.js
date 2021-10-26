import React, {useState, useEffect} from 'react';
import axios from 'axios';

import './LandingPage.css';
import Navbar from 'src/components/Navbar.js';


const LandingPage = () => {
  return (
    <div>
			{Navbar()}
			<div id='LandingPage'>
			</div>
    </div>
  );
}

export default LandingPage;
