const { SlashCommandBuilder } = require("@discordjs/builders");
const jwt = require("jsonwebtoken");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("login")
    .setDescription("Generates a magic link for login"),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const user = await axios.get(
      `http://backend:3001/accounts?discord_id=${interaction.member.user.id}`
    );

    if (user) {
      const date = new Date();
      date.setHours(date.getHours() + 1);
      const token = jwt.sign(
        { uid: interaction.member.user.id, expiration: date },
        process.env.JWT_SECRET
      );
      await interaction.editReply({
        content: `Link = http://frontend:3000/login?token=${token}`,
        ephemeral: true,
      });
    } else {
      await interaction.editReply({ content: "Failed to find user account" });
    }
  },
};
