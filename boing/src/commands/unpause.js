const { SlashCommandBuilder } = require("discord.js");

let execute = async function (interaction) {
	await interaction.deferReply();
	const mserver = require("../mserver.js");
	return mserver.write_recv("pause off").then((result) => {
		interaction.editReply("Game paused.");
	});
};

module.exports = {
	execute,
	info: new SlashCommandBuilder()
		.setName("unpause")
		.setDescription("Unpauses the game."),
};
