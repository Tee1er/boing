const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

let execute = async function (interaction) {
	const { regexes, data } = require("../globals.js");
	const VALID_CONFIGS = data.SETTINGS.exposedConfigs;

	const mserver = require("../mserver.js");

	await interaction.deferReply();

	let raw_config = await mserver.write_poll(
		"config",
		function (line) {
			return line.includes("| | Enable debug logging");
		},
		function (line, line_idx) {
			if (line_idx != 0) return line.match(regexes.message);
		}
	);

	let parsed_config = raw_config
		.split("|\n") // Split at double newlines
		.map(
			(c) =>
				c
					.replace(/\|\s*/g, "") // Remove bars
					.split("\n") // Split to pairs
					.filter((l) => l != "") // Remove empty third
		)
		.filter((pair) =>
			VALID_CONFIGS.includes(
				// Only show allowed values
				pair[0].split(":")[0] // Find the key of the pair's value
			)
		);

	let embed = new EmbedBuilder()
		.setColor("#E67B29")
		.setTitle("Configuration values")
		.setFooter({ text: "Boing - github.com/Tee1er/boing" });

	for (let chunk of parsed_config) {
		embed.addFields({
			name: chunk[0],
			value: chunk[1],
			inline: true,
		});
	}

	interaction.editReply({ embeds: [embed], ephemeral: true });
};

module.exports = {
	execute,
	info: new SlashCommandBuilder()
		.setName("list-config")
		.setDescription(
			"List all configuration options for the server and their values."
		),
	adminOnly: true,
};
