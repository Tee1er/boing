const fs = require("fs");
const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const path = require("path");
const mserver = require("./mserver");
const backups = require("./backups");
const { data, loadSettings, loadSessionData, COMMANDS_DIR, SERVER_CONFIG_DIR } = require("./globals");

loadSettings(); // Needs to be loaded here because this is run as a separate process
loadSessionData();

const client = new Discord.Client();
const rest = new REST({ version: "9" }).setToken(data.SETTINGS.token);


try {
    client.login(data.SETTINGS.token);
} catch (e) {
    console.log(colors.bold.red("Could not connect to Discord. Please check your token again."));
}


// Command storage
var command_instances = {};

client.once("ready", () => {
    console.log("Connected to Discord. ");
    client.user.setActivity(`${data.SETTINGS.prefix} help`, {
        type: "LISTENING",
    });
});

/** Create map library folder if not exist */
if (!fs.existsSync(path.join(`${SERVER_CONFIG_DIR}/saves/boing-library`))) {
    fs.mkdirSync(path.resolve(`${SERVER_CONFIG_DIR}/saves/boing-library`));
}

// On discord message callback
client.on("message", message => {
    // Cancel command if the message was not sent with the prefix, or was sent by a bot.
    if (!message.content.startsWith(data.SETTINGS.prefix) || message.author.bot) return;

    // Cancel command if the message was sent in a blacklisted channel.
    if (data.SETTINGS.channelBlacklist.includes(message.channel.name)) return;

    const ARGUMENTS = message.content.trim().split(" ").slice(1);

    // Memoized loading of command
    if (fs.existsSync(`${COMMANDS_DIR}/${ARGUMENTS[0]}.js`)) {
        if (!command_instances[ARGUMENTS[0]]) {
            command_instances[ARGUMENTS[0]] = require(`${COMMANDS_DIR}/${ARGUMENTS[0]}`);
        }
        var c = command_instances[ARGUMENTS[0]];
    } else return; // If the command doesn't exist

    let isAdmin = message.member.roles.cache.find(x => data.SETTINGS.adminRole === x.name && data.SETTINGS.adminRole !== "");

    let allowed = (c.info.adminOnly === true && isAdmin) || c.info.adminOnly === false || c.info.adminOnly === undefined;

    if (allowed) {
    	if (c.preExecuteMsg) {
    		message.channel.send(c.preExecuteMsg)
    	}
        let cmd_execution = c.info.disabled ? false : c.execute(ARGUMENTS, message);
        if (cmd_execution) {
            cmd_execution
                .then(result => {
                    // Allows for passing of either an array of arguments, or simply a regular string.
                    if (result) {
                        if (Array.isArray(result)) {
                            message.channel.send(...result);
                        } else {
                            message.channel.send(result);
                        }
                    }
                })
                .catch(err => {
                    message.channel.send(`Boing error: js\`\`\`${err}\n\`\`\``);
                });
        } else {
            message.channel.send(`An unknown error occurred with the command \`${ARGUMENTS[0]}\`.`);
        }
    } else {
        message.channel.send("You must be an administrator to use that command.");
    }
});

function sendNotification(message) {
    const channel = client.channels.cache.find(channel => channel.name == data.SETTINGS.notificationChannel);
    if (!channel) {
        return;
    }
    channel.send(message);
}

let numPlayers = 0;
mserver.events.on("gameOver", result => {
    sendNotification(`Game over. \`\`\`js\n${result}\`\`\` `);
});
mserver.events.on("playerConnected", result => {
    sendNotification(`Player connected. \`\`\`js\n${result}\`\`\` `);
    numPlayers++;
    updateStatus();
    if (numPlayers == 1) {
        backups.startBackups(mserver);
    }
});
mserver.events.on("playerDisconnected", result => {
    sendNotification(`Player disconnected. \`\`\`js\n${result}\`\`\` `);
    numPlayers--;
    updateStatus();
    if (numPlayers == 0) {
        backups.stopBackups();
    }
});

mserver.events.on("loaded", result => {
    sendNotification(`Server loaded. \`\`\`js\n${result}\`\`\``)
})

// Set # of players to 0 if game is stopped

mserver.events.on("gameStarted", result => {
    numPlayers = 0;
    updateStatus();
})

function updateStatus() {
    console.log("Player update");
    if (numPlayers >= 0) {
        client.user.setActivity(`a Mindustry game with ${numPlayers} players.`, { type: "WATCHING" });
    } else {
        client.user.setActivity(`${data.SETTINGS.prefix} help`, {
            type: "LISTENING",
        });
    }
}

mserver.events.on("stopped", result => {
    numPlayers = 0;
    backups.stopBackups();
});

module.exports = {
    botClient: client,
    restAPI: rest,
};
