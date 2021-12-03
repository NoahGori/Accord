const { SlashCommandBuilder } = require("@discordjs/builders");
const { Octokit } = require("@octokit/rest");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fork")
    .setDescription("Creates a fork of the repo on your account")
    .addStringOption((option) =>
      option
        .setName("owner")
        .setDescription("The owner of the repo to fork")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("repo")
        .setDescription("The repo to which you want to create an fork")
        .setRequired(true)
    ),
  async execute(interaction) {
    const repo = interaction.options.getString("repo");
    const owner = interaction.options.getString("owner");
    await interaction.deferReply({ ephemeral: true });
    const user = await axios.get(
      `http://backend:3001/ghauth?discord_id=${interaction.member.user.id}`
    );
    const token = user.data[0].oauth_token;
    console.log(token);
    const octokit = new Octokit({
      auth: token,
    });
    const fork = await octokit.rest.repos.createFork({
      owner: owner,
      repo: repo,
    });
    await interaction.editReply({ content: "Created fork", ephemeral: true });
  },
};
