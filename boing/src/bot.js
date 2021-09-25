// Make sure to set the variables inside config.json
const fs = require("fs");
const Discord = require("discord.js");
const path = require("path");
const mserver = require("./mserver");
const backups = require("./backups");

const client = new Discord.Client();

// User config file
const userSettings = JSON.parse(
    fs.readFileSync(path.resolve("settings.json"), "utf8"),
);
console.log("Configuration file loaded.");

// Regexes for filtering server output, ignore
// const extractTimestamp = /[0-9\s\:\-]{19}/g;
// const extractChatMessage = /(?<=(\[[\d\s\:\-]{19}\])\s\[.\]\s.*:\s)(.*)/g;
// const extractSender = /(?<=\[[\d\s\:\-]{19}\]\s\[.\]\s)(.*)(?=:)/g;
// const checkPlayerMessage = /(?<=\[I\]\s)(.*)(?=:)/g;
// const checkIsDiscordMessage = /Server: \[[A-z a-z]*\]:/g

client.once("ready", () => {
    console.log("Connected to Discord. ");
    client.user.setActivity(`${userSettings.prefix} help`, {
        type: "LISTENING",
    });
});

const CMDPATHS = fs.readdirSync("commands").filter((element) => {
    return element.endsWith(".js");
});

let commandsInfo = CMDPATHS.map((element) => {
    return require(`./commands/${element}`).info;
});

// On discord message callback
client.on("message", (message) => {
    // Cancel command if the message was not sent with the prefix, or was sent by a bot.
    if (!message.content.startsWith(userSettings.prefix) || message.author.bot)
        return;

    // Cancel command if the message was sent in a blacklisted channel.
    if (userSettings.channelBlacklist.includes(message.channel.name)) {
        return;
    }

    const ARGUMENTS = message.content.trim().split(" ").slice(1);

    //Display more detailed help information IF the last argument is "help" & if the cmd requested is not the 'help' command.
    if (ARGUMENTS[ARGUMENTS.length - 1] == "help" && ARGUMENTS[0] !== "help") {
        let command = commandsInfo.find((element) => {
            if (element.name == ARGUMENTS[0].toLowerCase()) return true;
        });

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
    } else if (
        commandsInfo.find((command) => {
            if (command.name == ARGUMENTS[0]) {
                return true;
            }
        })
    ) {
        require(`./commands/${ARGUMENTS[0]}`)
            .execute(ARGUMENTS, message)
            .then((result) => {
                // Allows for passing of either an array of arguments, or simply a regular string.
                if (Array.isArray(result)) {
                    message.channel.send(...result);
                } else {
                    message.channel.send(result);
                }
            });
    }
});

function sendNotification(message) {
    const channel = client.channels.cache.find(
        (channel) => channel.name == userSettings.notificationChannel,
    );
    if (!channel) {
        return;
    }
    channel.send(message);
}

let numPlayers = 0;

mserver.events.on("gameOver", (result) => {
    sendNotification(`Game over. \`\`\`js\n${result}\`\`\` `);
});
mserver.events.on("playerConnected", (result) => {
    sendNotification(`Player connected. \`\`\`js\n${result}\`\`\` `);
    numPlayers++;
    backups.startBackups(mserver);
});
mserver.events.on("playerDisconnected", (result) => {
    sendNotification(`Player disconnected. \`\`\`js\n${result}\`\`\` `);
    numPlayers--;
    if (numPlayers == 0) {
        // could've used a ternary, but this is more readable
        backups.stopBackups();
    }
});

mserver.events.on("stopped", (result) => {
    numPlayers = 0;
    backups.stopBackups();
});

client.login(userSettings.token); // add token here

module.exports = {
    commandsInfo: commandsInfo,
    userSettings,
};