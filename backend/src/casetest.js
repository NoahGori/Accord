import axios from 'axios';

const backendURL='http://localhost:3001'

const testGetAccountVia_discord_id = () => {
    console.log('casetest running');
  axios.post(`${backendURL}/accounts`, {
      discord_id: '2079225401637602323',
      github_username: 'johndoe3',
      discord_username: 'johndoe3#3213',
      discord_email: 'johndoe3@gmail.com'
  });
  
  console.log('casetest ran');
}

testGetAccountVia_discord_id();