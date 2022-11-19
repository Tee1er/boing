const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

let execute = async function (interaction) {
    const { data, loadSessionData } = require("../globals")

    loadSessionData();
    let embed = new EmbedBuilder()
        .setColor("#E67B29")
        .setTitle("High scores")
        .setFooter({ text: "Boing - github.com/Tee1er/boing" })
    for (element in data.SESSION_DATA.highScores) {
        let map = data.SESSION_DATA.highScores[element];
        let formattedDateStr = `${new Date(map.date).getHours().toString().padStart(2, "0")}:${new Date(map.date).getMinutes().toString().padStart(2, "0")}, ${new Date(map.date).toDateString()}`
        embed.addFields({
            name: element,
            value: `**Wave ${map.wave}** on ` + formattedDateStr,
            inline: true
        })
    }

    interaction.reply({ embeds: [embed] });
};

module.exports = {
    execute,
    info: new SlashCommandBuilder()
        .setName("scoreboard")
        .setDescription("Displays a list of high scores."),
};