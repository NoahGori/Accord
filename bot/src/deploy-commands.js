const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// This file is completely for developement purposes and is used to register commands with our server. This is because typically updates to a bot's commands propogate slowly across servers
const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.discordToken);

rest.put(Routes.applicationGuildCommands(process.env.discordClientId, process.env.discordGuildId), { body: commands })
	.then(() => console.log('Successfully registered application commands. '))
	.catch(console.error);