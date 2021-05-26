const mserver = require("../mserver.js");
const MessageEmbed = require('discord.js').MessageEmbed;
const fs = require("fs");

let execute = function() {
    //Get paths to all .js files in dir. 'commands'
    const CMDPATHS = fs.readdirSync("commands")
        .filter(element => {
            return element.endsWith(".js")
        })
    
    let commandsInfo = CMDPATHS.map(
        element => {
            return require(`./${element}`).info
        }
    )

    let helpEmbed = new MessageEmbed()
        .setColor("#E67B29")
        .setTitle("Help")
        .setFooter("Boing - github.com/Tee1er/boing");
        
    for (element of commandsInfo) {
        helpEmbed.addFields({name: element.name, value: element.descrip, inline: true});
    }

    return Promise.resolve(helpEmbed);
            
}

module.exports = {
    execute,
    info: {
        name: "help",
        descrip: "Provides help information. More detailed information can be found at the GitHub page for Boing.",
    }
}