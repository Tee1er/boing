// Make sure to set the variables inside config.json
const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client();

// User config file
const userSettings = JSON.parse(
    fs.readFileSync('config.json', 'utf8')
    );
    

client.once("Ready", () => {
    console.log("Ready! ");
})

client.on("message", message => {
    if (!message.content.startsWith(userSettings.optional.prefix) || message.author.bot) return;

    const arguments = message.content
        .trim()
        .split(" ");
    const cmdPrefix = arguments.shift().toLowerCase();

    // Didn't want to make cmd handler
    if (cmdPrefix === userSettings.optional.prefix) {
        try {
            commands[arguments[0]](message);
        }
        catch {
            message.channel.send("❌ **Oops, but that command doesn't exist!**")
        }
    }
})

client.login("ODI5NzgxMzU0NzUzMDMyMjIy.YG9IGw.w7xgrFd3MGTNgXtKwL-F9oVOon8")

//namespacing

let commands = {
    "help" : function(message) {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor("#E67B29")
            .setTitle("Help - Boing")
            .setDescription("Boing has the following commands, listed below.")
            .addFields(
                { name: "`pause`", value: "Pause the game.", inline: true},
                { name: "`host`", value: "Host the game. A random map is chosen if not specified.", inline:true},
                { name: "`export`", value: "Exports the map as an .msav file with your name of choice.", inline: true},
                { name: "`players`", value: "Lists players currently in-game.", inline: true},
                { name: "`maps`", value: "Lists maps available.", inline: true},
                { name: "`status`", value: "Shows status info.", inline: true},
                { name : "`stop`", value: "Stops the server. Please use caution w/ this command.", inline: true}
                { name : "`help`", value: "This.", inline: true}
            )
            .setFooter('Boing boing boing boing boing ...');
        message.channel.send(helpEmbed);
    }
}