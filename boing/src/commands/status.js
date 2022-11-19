const { SlashCommandBuilder } = require("discord.js");

let execute = async function (interaction) {
    const mserver = require("../mserver.js");
    const { loadSessionData, data } = require("../globals.js")

    let value = await mserver.write_poll(
        "status",
        line => line.includes("server closed") || line.includes("players connected.") || (line.includes(" / ") && line.includes("==")),
        line => line,
    );
    // Get server uptime information.
    loadSessionData();
    let msSinceFirstStart = Date.now() - data.SESSION_DATA.uptime.firstStarted;
    let percentTimeRunning = (data.SESSION_DATA.uptime.msRunning / msSinceFirstStart) * 100;
    percentTimeRunning = percentTimeRunning.toFixed(2) + "%";
    interaction.reply("```js\n" + value + "``` \n **Uptime:**\n" + `> ${percentTimeRunning}. \n> Total runtime: ${(new Date(data.SESSION_DATA.uptime.msRunning) / 3600000).toFixed(2)} hrs.`);
};

module.exports = {
    execute,
    info: new SlashCommandBuilder()
        .setName("status")
        .setDescription("Displays server status info."),
};