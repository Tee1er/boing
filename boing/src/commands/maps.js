const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

let execute = function (interaction) {

    let embed = new EmbedBuilder()
        .setColor("#E67B29")
        .setTitle("Default Maps")
        .setFooter({ text: "Boing - github.com/Tee1er/boing" })
        .setDescription("Default maps included with the server. Host using `/host`")
        .addFields(
            { name: "Ancient_Caldera", value: "256x256", inline: true },
            { name: "Archipelago", value: "500x500", inline: true },
            { name: "Debris_Field", value: "400x400", inline: true },
            { name: "Domain", value: "494x494", inline: true },
            { name: "Fork", value: "250x300", inline: true },
            { name: "Fortress", value: "256x256", inline: true },
            { name: "Glacier", value: "150x256", inline: true },
            { name: "Islands", value: "256x256", inline: true },
            { name: "Labyrinth", value: "200x200", inline: true },
            { name: "Maze", value: "256x256", inline: true },
            { name: "Molten_Lake", value: "400x400", inline: true },
            { name: "Mud_Flats", value: "400x400", inline: true },
            { name: "Passage", value: "500x120", inline: true },
            { name: "Shattered", value: "350x350", inline: true },
            { name: "Tendrils", value: "300x300", inline: true },
            { name: "Triad", value: "200x200", inline: true },
            { name: "Veins", value: "350x200", inline: true },
            { name: "Wasteland", value: "300x300", inline: true }
        );

    interaction.reply({ embeds: [embed], ephemeral: true });

};

module.exports = {
    execute,
    info: new SlashCommandBuilder()
        .setName("maps")
        .setDescription("Displays a list of default maps."),
};