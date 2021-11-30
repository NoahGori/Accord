const { SlashCommandBuilder } = require("@discordjs/builders");
const { Octokit } = require("@octokit/rest");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("issue")
    .setDescription("Creates an issue")
    .addStringOption((option) =>
      option
        .setName("owner")
        .setDescription(
          "The owner of the repo to which you want to create an issue"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("repo")
        .setDescription("The repo to which you want to create an issue")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("The title of the issue you want to create")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply({ ephermal: true });
    const owner = interaction.options.getString("owner");
    const repo = interaction.options.getString("repo");
    const title = interaction.options.getString("title");

    const response = await axios.get("/ghauth", {
      params: {
        discord_id: interaction.member.user.id,
      },
    });
    const octokit = new Octokit({
      auth: response.body.token,
    });

    const issue = await octokit.issues.create({
      owner: owner,
      repo: repo,
      title: title,
    });
    await interaction.editReply({ content: "Created issue", ephemeral: true });
  },
};
