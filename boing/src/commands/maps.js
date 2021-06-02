const mserver = require("../mserver.js");
const { MessageEmbed } = require("discord.js")

let execute = function() {

    let mapEmbed = new MessageEmbed()
        .setColor("#E67B29")
        .setTitle("Default Maps")
        .setFooter("Boing - github.com/Tee1er/boing")
        .setDescription("Default maps included with the server. Host using `<prefix> host`. For user-imported maps, try `<prefix> library`")
        .addFields(
            {name: "Ancient_Caldera", value: "256x256", inline: true},
            {name: "Archipelago", value: "500x500", inline:true},
            {name: "Debris_Field", value: "400x400", inline:true},
            {name: "Fork", value: "250x300", inline:true},
            {name: "Fortress", value: "256x256", inline:true},
            {name: "Glacier", value: "150x256", inline:true},
            {name: "Islands", value:"256x256", inline:true},
            {name: "Labyrinth", value: "200x200", inline:true},
            {name: "Maze", value: "256x256", inline:true},
            {name: "Molten_Lake", value: "400x400", inline:true},
            {name: "Mud_Flats", value: "400x400", inline:true},
            {name: "Shattered", value: "350x350", inline:true},
            {name: "Tendrils", value: "300x300", inline:true},
            {name: "Triad", value: "200x200", inline:true},
            {name: "Veins", value: "350x200", inline:true},
            {name: "Wasteland", value: "300x300", inline:true}
        );

    return Promise.resolve(mapEmbed);

}

module.exports = {
    execute,
    info: {
        name: "maps",
        descrip: "Lists available (default) maps.",
        longDescrip: "Lists available maps. Includes only built-in ones. Map names are case-sensitive."
    }
}