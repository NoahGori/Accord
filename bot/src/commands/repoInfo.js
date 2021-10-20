const { SlashCommandBuilder } = require('@discordjs/builders');
const { Octokit } = require('@octokit/rest');
const octokit = new Octokit();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('repos')
		.setDescription('Replies with users repo info!'),
	async execute(interaction) {
		const repos = await octokit.rest.repos.listForUser({
			username: "NoahGori",
		});
		let reply = '';
		repos.data.forEach(element => reply += element.name + '\n');
		await interaction.reply(reply);
	},
};
