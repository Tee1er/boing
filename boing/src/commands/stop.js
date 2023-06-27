const { SlashCommandBuilder } = require("discord.js");

let execute = async function (interaction) {
	await interaction.deferReply();
	const mserver = require("../mserver.js");
	return mserver.write_recv("stop").then((result) => {
		interaction.editReply("Game stopped.");
	});
};

module.exports = {
	execute,
	info: new SlashCommandBuilder()
		.setName("stop")
		.setDescription("Stops hosting."),
};
