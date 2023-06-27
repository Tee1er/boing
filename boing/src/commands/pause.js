const { SlashCommandBuilder } = require("discord.js");

let execute = async function (interaction) {
	await interaction.deferReply();
	const mserver = require("../mserver.js");
	return mserver.write_recv("pause on").then((result) => {
		interaction.editReply("Game paused.");
	});
};

module.exports = {
	execute,
	info: new SlashCommandBuilder()
		.setName("pause")
		.setDescription("Pauses the game."),
};
