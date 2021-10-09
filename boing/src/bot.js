// Make sure to set the variables inside config.json
const fs = require("fs");
const Discord = require("discord.js");
const path = require("path");
const mserver = require("./mserver");
const backups = require("./backups");
const { data, SRC_DIR, loadSettings, loadSessionData, COMMANDS_DIR } = require('./globals');
const { resolve } = require("path");

loadSettings(); // Needs to be loaded here because this is run as a separate process
loadSessionData();

const client = new Discord.Client();
var command_instances = {};

client.once("ready", () => {
    console.log("Connected to Discord. ");
    client.user.setActivity(`${data.SETTINGS.prefix} help`, {
        type: "LISTENING",
    });
});

// On discord message callback
client.on("message", (message) => {
    // Cancel command if the message was not sent with the prefix, or was sent by a bot.
    if (!message.content.startsWith(data.SETTINGS.prefix) || message.author.bot)
        return;

    // Cancel command if the message was sent in a blacklisted channel.
    if (data.SETTINGS.channelBlacklist.includes(message.channel.name))
        return;


    const ARGUMENTS = message.content.trim().split(" ").slice(1);

    if (!command_instances[ARGUMENTS[0]]) {
        command_instances[ARGUMENTS[0]] = require(`${COMMANDS_DIR}/${ARGUMENTS[0]}`);
    }
    let c = command_instances[ARGUMENTS[0]];

    let isAdmin = message.member.roles.cache.find(
        (x) => data.SETTINGS.adminRole === x.name && data.SETTINGS.adminRole !== "",
    )

    let allowed = (c.info.adminOnly === true && isAdmin) || (c.info.adminOnly === false) || (c.info.adminOnly === undefined)

    if (allowed) {
        let cmd_execution = c.execute(ARGUMENTS, message);
        if (cmd_execution) {
            cmd_execution.then((result) => {
                // Allows for passing of either an array of arguments, or simply a regular string.
                if (result) {
                    if (Array.isArray(result)) {
                        message.channel.send(...result);
                    } else {
                        message.channel.send(result);
                    }
                }
            }).catch(err => message.channel.send(err));
        } else {
            message.channel.send(`An unknown error occurred with the command \`${ARGUMENTS[0]}\`.`);
        }
    } else {
        message.channel.send("You must be an administrator to use that command.");
    }
});

function sendNotification(message) {
    const channel = client.channels.cache.find(
        (channel) => channel.name == data.SETTINGS.notificationChannel,
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
        // backups.stopBackups();
    }
});

mserver.events.on("stopped", (result) => {
    numPlayers = 0;
    // backups.stopBackups();
});

client.login(data.SETTINGS.token); // add token here