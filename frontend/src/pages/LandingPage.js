import {
  Container
} from 'react-bootstrap';

import './LandingPage.css';
import Navbar from 'src/components/Navbar.js';
import 'src/components/constants.css';


const LandingPage = () => {
  return (
    <div>
      {Navbar()}
      <div id='LandingPage' className='d-flex align-items-center'>
        <Container className='d-flex justify-content-center align-items-center'>
          <p className='OffBlackText'>
            This is the frontend portion to the <a href="https://github.com/dogunbound/Accord">Accord</a> discord project. 

            We are in the pre-alpha stage with nothing really working yet. Please come back another time!
          </p>
        </Container>
      </div>
    </div>
  );
}

export default LandingPage;
