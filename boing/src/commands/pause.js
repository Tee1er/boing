const { SlashCommandBuilder } = require("discord.js")

let execute = function (interaction) {
    const mserver = require("../mserver.js");
    return mserver.write_recv("pause on").then(result => {
        interaction.reply("Game paused.");
    });
};

module.exports = {
    execute,
    info: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the game."),
};