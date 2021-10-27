const { SlashCommandBuilder } = require('@discordjs/builders');
const { createOAuthAppAuth } = require("@octokit/auth-oauth-app");

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
		const userAuthenticationFromDeviceFlow = await auth({ //The current code does nothing with the oauth token but return it as a reply
            async onVerification(verification) {
              await interaction.editReply({content: `Open ${verification.verification_uri}`, ephemeral: true});
              await interaction.followUp({content: `Enter code: ${verification.user_code}`, ephemeral: true});
            },
        });
        await interaction.followUp({content: `Token is: ${userAuthenticationFromDeviceFlow.token}`, ephemeral: true}); // ephemeral property is used to show messages only to the person who invoked the command
	},
};
