// Make sure to set the variables inside config.json
const fs = require("fs");
const Discord = require('discord.js');
// const servermgr = require("./server-mgr");
const client = new Discord.Client();
const path = require("path");

// User config file
const userSettings = JSON.parse(
    fs.readFileSync(path.resolve('settings.json'), 'utf8')
);

// Regexes for filtering server output, ignore
const extractTimestamp = /[0-9\s\:\-]{19}/g;
const extractChatMessage = /(?<=(\[[\d\s\:\-]{19}\])\s\[.\]\s.*:\s)(.*)/g;
const extractSender = /(?<=\[[\d\s\:\-]{19}\]\s\[.\]\s)(.*)(?=:)/g;
const checkPlayerMessage = /(?<=\[I\]\s)(.*)(?=:)/g;
const checkIsDiscordMessage = /Server: \[[A-z a-z]*\]:/g

client.once("ready", () => {
    console.log("Connected to Discord ... Ready! ");
})

const CMDPATHS = fs.readdirSync("commands")
    .filter(element => {
        return element.endsWith(".js")
    })

let commandsInfo = CMDPATHS.map(
    element => {
        return require(`./commands/${element}`).info
    }
)

let chatRelay = userSetting.optional.chatChannel != "";

// On discord message callback
client.on("message", message => {
    // Relay message to the server chat if its in the "chat" channel (set by config)
    if (chatRelay && message.channel.name == client.channels.cache.find(ch => ch.name === userSettings.optional.chatChannel).name && message.author.id != client.user.id) {
        sendChatMessage(`[${message.author.username}]: ${message.content}`);
    }

    // Cancel command if the message was not sent with the prefix, or was sent by a bot.
    if (!message.content.startsWith(userSettings.prefix) || message.author.bot) return;

    const ARGUMENTS = message.content
        .trim()
        .split(" ")
        .slice(1);

    //Display more detailed help information IF the last argument is "help" & if the cmd requested is not the 'help' command.
    if (ARGUMENTS[ARGUMENTS.length - 1] == "help" && ARGUMENTS[0] !== "help") {
        let command = commandsInfo.find(element => {
            if (element.name == ARGUMENTS[0].toLowerCase()) return true;
        })

        let helpEmbed = new Discord.MessageEmbed()
            .setColor("#E67B29")
            .setTitle(`Help - "${command.name}"`)
            .setFooter("Boing - github.com/Tee1er/boing");

        if ("longDescrip" in command) {
            helpEmbed.setDescription(command.longDescrip);
        } else {
            helpEmbed.setDescription(command.descrip);
        }

        message.channel.send(helpEmbed);

    } else if (commandsInfo.find(command => { if (command.name == ARGUMENTS[0]) { return true; } })) {
        require(`./commands/${ARGUMENTS[0]}`).execute(ARGUMENTS, message).then(result => {
            // Allows for passing of either an array of arguments, or simply a regular string.
            if (Array.isArray(result)) {
                message.channel.send(...result)
            } else {
                message.channel.send(result);
            }
        });
    }

})

module.exports = {
    commandsInfo: commandsInfo
}

client.login(userSettings.token) // add token here
