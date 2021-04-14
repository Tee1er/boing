// Make sure to set the variables inside config.json
const fs = require("fs");
const Discord = require('discord.js');
const servermgr = require("./server-mgr");
const client = new Discord.Client();
const path = require("path");

// User config file
const userSettings = JSON.parse(
    fs.readFileSync(path.resolve('settings.json'), 'utf8')
);

console.log(userSettings);

// Regexes for filtering server output
const extractTimestamp = /[0-9\s\:\-]{19}/g;
const extractChatMessage = /(?<=(\[[\d\s\:\-]{19}\])\s\[.\]\s.*:\s)(.*)/g; 
const extractSender = /(?<=\[[\d\s\:\-]{19}\]\s\[.\]\s)(.*)(?=:)/g;
const checkPlayerMessage = /(?<=\[I\]\s)(.*)(?=:)/g;
const checkIsDiscordMessage = /Server: \[[A-z a-z]*\]:/g
let chatRelay = true;
    
client.once("ready", () => {
    console.log("Ready! ");
    if (typeof userSettings.optional.chatChannel != undefined) {
        servermgr.setOutputCallback(handleStdout);
    }
})

// On discord message callback
client.on("message", message => {
    // Relay message to the server chat if its in the "chat" channel (set by config)
    if (chatRelay && message.channel.name == client.channels.cache.find(ch => ch.name === userSettings.optional.chatChannel).name && message.author.id != client.user.id) {
        sendChatMessage(`[${message.author.username}]: ${message.content}`);
    }
    
    // Cancel command if the message was not sent with the prefix, or was sent by a bot
    if (!message.content.startsWith(userSettings.required.prefix) || message.author.bot) return;

    let arguments = message.content
        .trim()
        .split(" ");
    const cmdPrefix = arguments.shift().toLowerCase();

    // Didn't want to make cmd handler
    if (cmdPrefix === userSettings.required.prefix) {
        try {
            commands[arguments[0]](message, arguments);
        }
        catch (error) {
            message.channel.send(`❌ ***Oops*, either that command doesn't exist or an error occured.  ${error}**`)
        }
    }
})

// Server output callback
function handleStdout(dat) {
    var message = dat.toString();
    // Handle player message
    if (chatRelay && message.match(checkPlayerMessage) != null) {
        var sender = message.match(extractSender)[0];
        var content = message.match(extractChatMessage)[0];
        if (!message.match(checkIsDiscordMessage)) {
            sendMessage(userSettings.optional.chatChannel, `**[${sender}]:** ${content}`);
        }
    }
}

client.login(userSettings.required.token) // add token here

//namespacing

servermgr.startServer(userSettings.required.serverPath)
console.log("Started.");

let commands = {
    "help" : function(message) {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor("#E67B29")
            .setTitle("Help - Boing")
            .setDescription("Boing has the following commands, listed below.")
            .addFields(
                { name: "*`pause / unpause`*", value: "Pause & unpause the game.", inline: true},
                { name: "*`host`*", value: "Host the game. A random map is chosen if not specified.", inline:true},
                { name: "*`export`*", value: "Exports the map as an .msav file w/ your name of choice.", inline: true},
                { name: "`import`", value: "Imports a map from a .msav file.", inline: true},
                { name: "*`maps`*", value: "Lists maps available.", inline: true},
                { name : "*`stop`*", value: "Stops the server. Please use caution w/ this command.", inline: true},
                { name : "*`help`*", value: "This embed!", inline: true},
            )
            .setFooter('Boing boing boing boing boing ...');
        message.channel.send(helpEmbed);
    },
    "pause" : function(message) {
        servermgr.pauseServer().then( (out) => {
            if (out.indexOf("Game paused.") !== -1 ) {
                message.channel.send(`Game paused.\`\`\`js\n${out}\`\`\``)
            } else {
                message.channel.send("Error. Contact Tyler for help, or reevaluate your life choices.")
            }
        });
    },
    "unpause" : function(message) {
        servermgr.unpauseServer().then( (out) => {
            if (out.indexOf("Game unpaused.") !== -1) {
                message.channel.send(`Game unpaused.\`\`\`js\n${out}\`\`\``)
            } else {
                message.channel.send("Error. Well, slice me bapples - Contact Tyler for help.")
            }
        });
    },
    "host" : function (message) {
        servermgr.hostServer(message).then( (out) => {
            if (out.indexOf("Loading map...") !== -1) {
                message.channel.send(`Hosting map. \`\`\`js\n${out}\`\`\``)
            } else {
                message.channel.send(`Error. You might want to send 'stop' first. \`\`\`js\n${out}\`\`\``)
            }
        })
    },
    "stop" : function (message) {
        servermgr.stopServer().then( (out) => {
            if (out.indexOf("Stopped server.") !== -1 ) {
                message.channel.send(`Stopped hosting.\`\`\`js\n${out}\`\`\``)
            } else {
                message.channel.send("Error.")
            }
        });
    },
    "maps" : function (message) {
        let mapsEmbed = new Discord.MessageEmbed()
            .setColor("#E67B29")
            .setTitle("Maps - Boing")
            .setDescription("These are the default maps in-game. If you're looking to import a custom map in .msav format, you might want to check out `import`.")
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
            )
        message.channel.send(mapsEmbed);
    },
    "export" : function(message) {
            servermgr.exportGame().then(res => {
                let attachment;
                if (arguments[1][1]) {
                    attachment = new Discord.MessageAttachment(res, `${arguments[1][1]}.msav`);
                } else {
                    attachment = new Discord.MessageAttachment(res);
                }
                message.channel.send("Here's your save file: ", attachment);
            })

    }
}

// Send discord message
function sendMessage(channelname, msg) {
    const channel = client.channels.cache.find(ch => ch.name == channelname);
    channel.send(msg);
}

// Send mindustry server chat message
function sendChatMessage(strmsg) {
    servermgr.stdinWrite("say " + strmsg + "\n");
    console.log(strmsg);
}

module.exports = {
    userSettings,
    commands
}