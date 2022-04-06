const mserver = require("../mserver.js");
const { data, loadSessionData } = require("../globals");
const { MessageEmbed } = require("discord.js");

let execute = async function (ARGUMENTS, message) {
    let embed = new MessageEmbed().setColor("#E67B29").setTitle("Auto-backups").setFooter("Boing - github.com/Tee1er/boing");

    loadSessionData();

    for (let i = 0; i < data.SESSION_DATA.backups.length; i++) {
        element = data.SESSION_DATA.backups[i];
        embed.addFields({
            name: `[${i + 1}] ${element.map} - Wave${element.wave}`,
            value: `${new Date(element.time).getHours().toString().padStart(2, "0")}:${new Date(element.time).getMinutes().toString().padStart(2, "0")}, ${new Date(element.time).toDateString()}`,
        });
    }

    return Promise.resolve(embed)
};

module.exports = {
    execute,
    info: {
        name: "backups",
        descrip: "Returns information about the automatic backups taken by Boing. ",
        longDescrip: "Returns information about the automatic backups taken by Boing, including the wave, time, and map. " // TODO
    }
};