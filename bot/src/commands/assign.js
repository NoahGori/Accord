const { SlashCommandBuilder } = require("@discordjs/builders");
const { Octokit } = require("@octokit/rest");
const axios = require("axios");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("assign")
    .setDescription("Assigns a member of the guild to an issue")
    .addStringOption((option) =>
      option
        .setName("owner")
        .setDescription("The repo that contains the issue")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("repo")
        .setDescription("The repo that contains the issue")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("issue")
        .setDescription("The issue you want to assign a member to")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("assignee")
        .setDescription("The user you want to assign to the issue")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    //Get command options
    const owner = interaction.options.getString("owner");
    const issue = interaction.options.getString("issue");
    const ae = interaction.options.getUser("assignee");
    const repo = interaction.options.getString("repo");
    // Get the github username of the assignee from their discord id
    const response = await axios.get(
      `http://backend:3001/accounts?discord_id=${ae.id}`
    );
    const assignee = response.data[0].github_username;
    // Authenticate as user who issued command
    const user = await axios.get(
      `http://backend:3001/ghauth?discord_id=${interaction.member.user.id}`
    );
    const token = user.data[0].oauth_token;
    const octokit = new Octokit({
      auth: token,
    });
    // Assign the user to the issue
    const issueResponse = await octokit.issues.addAssignees({
      owner: owner,
      repo: repo,
      issue_number: issue,
      assignees: assignee,
    });

    await interaction.editReply({ content: "Created issue", ephemeral: true });
  },
};
