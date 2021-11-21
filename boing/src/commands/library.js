const { MessageEmbed } = require("discord.js");
const { readdirSync, statSync } = require("fs");
const { SERVER_CONFIG_DIR } = require("../globals");

let execute = async function() {
    const paths = readdirSync(`${SERVER_CONFIG_DIR}/saves/boing-library`)
        .filter(element => {
            return element.endsWith(".msav");
        });
    
    let libraryEmbed = new MessageEmbed()
        .setColor("#E67B29")
        .setTitle("Map Library")
        .setFooter("Boing - github.com/Tee1er/boing");
    
    for (let path of paths) {
        let uploadTimestamp = new Date(statSync(`${SERVER_CONFIG_DIR}/saves/boing-library/${path}`).birthtime);

        let uploadDay = uploadTimestamp.getDate();
        let uploadMonth = uploadTimestamp.getMonth();
        let uploadYear = uploadTimestamp.getFullYear();
        
        libraryEmbed.addFields({name: path.replace(".msav", ""), value: `Uploaded ${uploadMonth}/${uploadDay}/${uploadYear}.`});
    }

    return libraryEmbed;
};

module.exports = {
    execute,
    info: {
        name: "library",
        descrip: "Lists all the maps in the Map Library.",
        longDescrip: "Lists maps in the Map Library, in alphabetical order. Play one of them with `<prefix> load`."
    } 
};