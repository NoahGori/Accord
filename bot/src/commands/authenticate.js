const { SlashCommandBuilder } = require('@discordjs/builders');
const { createOAuthAppAuth } = require("@octokit/auth-oauth-app");
const dotenv = require('dotenv').config();
const auth = createOAuthAppAuth({
    clientType: process.env.GHclientType,
    clientId: process.env.GHclientId,
    clientSecret: process.env.GhclientSecret,
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('auth')
		.setDescription('Sends private info for authentication!'),
	async execute(interaction) {
        await interaction.deferReply({ephemeral: true});
		const userAuthenticationFromDeviceFlow = await auth({
            async onVerification(verification) {
              // verification example
              // {
              //   device_code: "3584d83530557fdd1f46af8289938c8ef79f9dc5",
              //   user_code: "WDJB-MJHT",
              //   verification_uri: "https://github.com/login/device",
              //   expires_in: 900,
              //   interval: 5,
              // };
              await interaction.editReply({content: `Open ${verification.verification_uri}`, ephemeral: true});
              await interaction.followUp({content: `Enter code: ${verification.user_code}`, ephemeral: true});
            },
        });
        await interaction.followUp({content: `Token is: ${userAuthenticationFromDeviceFlow.token}`, ephemeral: true});
	},
};
