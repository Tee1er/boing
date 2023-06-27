const { SlashCommandBuilder } = require("discord.js");

let execute = async function (interaction) {
	const mserver = require("../mserver.js");
	await interaction.deferReply();
	if (interaction.options.getString("name")) {
		return mserver
			.write_recv(
				`host ${interaction.options.getString(
					"name"
				)} ${interaction.options.getString("gamemode")}`
			)
			.then((result) => {
				if (result.includes("Loading map")) {
					interaction.editReply(
						`Hosting map ${interaction.options.getString(
							"name"
						)} in mode \`${interaction.options.getString(
							"gamemode"
						)}\`. \`\`\`js\n${result} \`\`\` `
					);
				} else if (result.includes("Already hosting")) {
					interaction.editReply(
						`**An error occurred.** The server may be already hosting a map. \`\`\`js\n${result} \`\`\` `
					);
				} else {
					interaction.editReply(
						"**An error occurred.** Did you misspell the map name?"
					);
				}
			});
	} else {
		return mserver.write_recv("host").then((result) => {
			if (result.includes("Randomized next map")) {
				interaction.editReply(
					`Hosting random map. \`\`\`js\n${result} \`\`\` `
				);
			} else {
				interaction.editReply(
					`An error occurred. \`\`\`js\n${result} \`\`\` `
				);
			}
		});
	}
};

module.exports = {
	execute,
	info: new SlashCommandBuilder()
		.setName("host")
		.setDescription("Hosts a map.")
		.addStringOption((option) =>
			option
				.setName("name")
				.setDescription(
					"[optional] The name of the map to host. If left blank, the server will pick a random default map."
				)
		)
		.addStringOption((option) =>
			option
				.setName("gamemode")
				.setDescription(
					"[optional] The gamemode to host. If left blank, the server will default to survival."
				)
				.addChoices(
					{ name: "Survival", value: "survival" },
					{ name: "PvP", value: "pvp" },
					{ name: "Attack", value: "attack" },
					{ name: "Sandbox", value: "sandbox" }
				)
		),
};
