const { SlashCommandBuilder } = require('@discordjs/builders'); // Helper library for building specifc commands
const { Octokit } = require('@octokit/rest');
const octokit = new Octokit();
// relevant documentation to reference if you need to do something that isn't covered in this file
// Octokit Github Documentation = https://octokit.github.io/rest.js/v18
// Discord.js Documentation = https://discord.js.org/#/docs/main/stable/general/welcome
module.exports = {
	data: new SlashCommandBuilder()
		.setName('repos') // Sets the name of the command and what its invoked by IE. /repos
		.setDescription('Replies with users repo info!') // Sets the description of the command displayed when typing the command
		.addStringOption((option) =>
			option
				.setName('username')
				.setDescription('The input to echo back')
				.setRequired(true)
		),
	async execute(interaction) {
		const gitUser = interaction.options.getString('username');
		// This is where you put the body of code that defines the actions of the command
		const repos = await octokit.rest.repos.listForUser({ // Octokit is used to communicate with the Github API
			username: gitUser,
		});
		let reply = '';
		repos.data.forEach(element => reply += element.name + '\n'); // In this case a reply is built using info contained within the repos variable
		await interaction.reply({content: reply, ephemeral: true }); // interaction.reply() is used to send a reply message to the user that invoked the command
	},
};
