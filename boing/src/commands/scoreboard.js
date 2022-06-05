/*High scores*/

const mserver = require("../mserver.js")
const { data, loadSessionData } = require("../globals")
const { MessageEmbed } = require("discord.js");

let execute = async function (ARGUMENTS, message) {
    loadSessionData();
    let embed = new MessageEmbed()
        .setColor("#E67B29")
        .setTitle("High scores")
        .setFooter("Boing - github.com/Tee1er/boing")
    for (element in data.SESSION_DATA.highScores) {
        let map = data.SESSION_DATA.highScores[element];
        let formattedDateStr = `${new Date(map.date).getHours().toString().padStart(2, "0")}:${new Date(map.date).getMinutes().toString().padStart(2, "0")}, ${new Date(map.date).toDateString()}`
        embed.addFields({
            name: element,
            value: `**Wave ${map.wave}** on ` + formattedDateStr,
            inline: true
        })
    }

    return Promise.resolve(embed);
};

module.exports = {
    execute,
    info: {
        name: "scoreboard",
        descrip: "Displays high scores.",
        longDescrip: "Displays the high score for each map, with wave numbers and dates. " // TODO
    }
};