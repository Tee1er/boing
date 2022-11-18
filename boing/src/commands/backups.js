const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");


let execute = async function (interaction) {
    const { data, loadSessionData, saveSessionData } = require("../globals");

    loadSessionData();

    if (data.SESSION_DATA.backups === undefined) {
        data.SESSION_DATA.backups = [];
    }

    saveSessionData();

    let embed = new EmbedBuilder().setColor("#E67B29").setTitle("Auto-backups").setFooter({ text: "Boing - github.com/Tee1er/boing" });

    backups = data.SESSION_DATA.backups.reverse()

    for (let i = 0; i < backups.length; i++) {
        element = backups[i];
        embed.addFields({
            name: `[${backups.length - i}] ${element.map} - Wave ${element.wave}`,
            value: `${new Date(element.time).getHours().toString().padStart(2, "0")}:${new Date(element.time).getMinutes().toString().padStart(2, "0")}, ${new Date(element.time).toDateString()}`,
        });
    }

    interaction.reply({ embeds: [embed], ephemeral: true });
};

module.exports = {
    execute,
    info: new SlashCommandBuilder()
        .setName("backups")
        .setDescription("Lists all available backups.")
};