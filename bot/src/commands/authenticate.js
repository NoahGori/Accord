const { SlashCommandBuilder } = require("@discordjs/builders");
const { createOAuthAppAuth } = require("@octokit/auth-oauth-app");
const axios = require("axios");
const { Octokit } = require("@octokit/rest");


const auth = createOAuthAppAuth({
    clientType: process.env.GHclientType,
    clientId: process.env.GHclientId,
    clientSecret: process.env.GhclientSecret,
  });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("auth")
    .setDescription("Sends private info for authentication!"),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const userAuthenticationFromDeviceFlow = await auth({
      //The current code does nothing with the oauth token but return it as a reply
      type: "oauth-user",
      async onVerification(verification) {
        await interaction.editReply({
          content: `Open ${verification.verification_uri}`,
          ephemeral: true,
        });
        await interaction.followUp({
          content: `Enter code: ${verification.user_code}`,
          ephemeral: true,
        });
      },
      scopes: ["repo"],
    });
    const octokit = new Octokit({
      auth: userAuthenticationFromDeviceFlow.token,
    });
    const user = await octokit.rest.users.getAuthenticated();
    await axios
      .post("http://backend:3001/accounts", {
        discord_id: interaction.member.user.id,
        github_username: user.data.login,
        discord_username: interaction.member.user.username,
        discord_email: "Test@gmail.com",
      }).catch((err) => {
        console.log(err);
      });
      console.log("Added account")
    await axios
      .post("http://backend:3001/ghauth", {
        github_username: user.data.login,
        oauth_token: userAuthenticationFromDeviceFlow.token,
      }).catch((err) => {
        console.log(err);
      });
      console.log("All saved")
    await interaction.followUp({
      content: "Success",
      ephemeral: true,
    });
    // ephemeral property is used to show messages only to the person who invoked the command
  },
};
