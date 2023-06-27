const { SlashCommandBuilder } = require("discord.js");

let execute = async function (interaction) {
	const { regexes, data } = require("../globals.js");

	const mserver = require("../mserver.js");

	const VALID_CONFIGS = data.SETTINGS.exposedConfigs;

	const configOption = interaction.options.getString("option");
	const configValue = interaction.options.getString("value");

	if (configOption) {
		if (!VALID_CONFIGS.includes(configOption)) {
			interaction.reply(
				`Option ${configOption} not found or disabled. Use the 'list-config' command to see all available options`
			);
		}

		if (configValue) {
			await interaction.deferReply();
			result = await mserver
				.write_recv(`config ${configOption} ${configValue}`)
				.then((res) => `Server option ${res.match(regexes.message)}`);
			interaction.editReply(result);
		}
	}
};

module.exports = {
	execute,
	info: new SlashCommandBuilder()
		.setName("modify-config")
		.setDescription(
			"List all configuration options for the server and their values, or modify a specific option."
		)
		.addStringOption((option) =>
			option
				.setName("option")
				.setDescription("The option to modify.")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("value")
				.setDescription("The value to set the option to.")
				.setRequired(true)
		),
	adminOnly: true,
};
