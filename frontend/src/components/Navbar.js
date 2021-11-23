import { 
	Navbar,
	Nav,
	Container,
} from 'react-bootstrap'

import DiscordLogo from 'src/assets/Discord-Logo-Color.svg';
import GithubLogo from 'src/assets/octocat.svg';
import './Navbar.css'
import 'src/components/constants.css'



const BootstrapNavbar = () => {
	return (
		<Navbar id='Navbar' collapseOnSelect expand='sm' bg='dark' variant='dark'>
			<Container>
				<Navbar.Brand href='/'>Accord</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='me-auto'>
					</Nav>
					<Nav>
						<Nav.Link href='https://github.com/dogunbound/Accord'>
							Github
							<img
								src={GithubLogo}
								alt='Github'
								width='40px'/>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default BootstrapNavbar;
