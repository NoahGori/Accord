import axios from 'axios';

const backendURL='http://localhost:3001'

const testGetAccountVia_discord_id = () => {
    console.log('casetest running');
  axios.post(`${backendURL}/accounts`, {
      discord_id: '20792254016376023225',
      github_username: 'johndoe5',
      discord_username: 'johndoe5#3215',
      discord_email: 'johndoe5@gmail.com'
  });
  
  console.log('casetest ran');
}

testGetAccountVia_discord_id();