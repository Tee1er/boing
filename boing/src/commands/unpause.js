const { SlashCommandBuilder } = require("discord.js")

let execute = function (interaction) {
    const mserver = require("../mserver.js");
    return mserver.write_recv("pause off").then(result => {
        interaction.reply("Game paused.");
    });
};

module.exports = {
    execute,
    info: new SlashCommandBuilder()
        .setName("unpause")
        .setDescription("Unpauses the game."),
};