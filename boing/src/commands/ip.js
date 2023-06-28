const { get } = require("axios").default;
const { SlashCommandBuilder } = require("@discordjs/builders");

let execute = async function (interaction) {
	let response = await get("https://api.ipify.org", {
		params: { format: "json" },
	});

	interaction.reply({
		content: `The server's IP is **${response.data.ip}**`,
		ephemeral: true,
	});
};

module.exports = {
	execute,
	info: new SlashCommandBuilder()
		.setName("ip")
		.setDescription("Get the server's IP address."),
};
