const { SlashCommandBuilder } = require("discord.js")

let execute = function (interaction) {
    const mserver = require("../mserver.js");
    return mserver.write_recv("stop").then(result => {
        interaction.reply("Game stopped.");
    });
};

module.exports = {
    execute,
    info: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stops hosting."),
};