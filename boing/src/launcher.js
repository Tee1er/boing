/* eslint-disable no-undef */
const child_process = require("child_process");
const { mkdirSync } = require("fs");
const { data, loadSettings, loadSessionData, saveSettings, SRC_DIR, DATA_DIR, SERVER_DIR, saveSessionData } = require("./globals.js");
const readline = require("readline");

let setupOccurred = Object.keys(data.SETTINGS).length !== 0;

// if (!setupOccurred) {
//     console.log("Installing dependencies.");

//     child_process.execSync("cd .. && npm install");

//     console.log("Dependencies downloaded. Continuing with setup.");
// }

// Load config files
loadSettings();
loadSessionData();

// // First time auto install modules, very hacky
// if (!existsSync(resolve(BOING_DIR, "/node_modules"))) {
//     console.log("Installing npm dependencies");
//     child_process.execSync(`cd ${BOING_DIR} && npm install --no-bin-links`);
// }

// NPM modules (loaded after possible auto-install)
const colors = require("ansi-colors");
const enquirer = require("enquirer");
const deps_resolver = require("./get_deps");

console.log(colors.bold.yellow("-- Boing Mindustry-Discord Interface v2.4 --"));
console.log("https://www.github.com/Tee1er/boing \n");

(async function () {
    let setupOccurred = Object.keys(data.SETTINGS).length !== 0;
    if (!setupOccurred) {
        console.log("Starting setup.");
        await setup();
        setupOccurred = true;
        console.log(colors.green("Starting Boing for the first time, starting uptime tracking."))
        data.SESSION_DATA.uptime = {}
        data.SESSION_DATA.uptime.firstStarted = Date.now();
        data.SESSION_DATA.uptime.msRunning = 0;
        saveSessionData();
    }

    if (setupOccurred) {
        deps_resolver.get_server().then(_ => {
            console.log(colors.bold("Starting Boing ... \n"));
            // TODO: Make bot into a class to make boing one unified process
            let boing = child_process.spawn(`node ${SRC_DIR}/bot.js`, [], { shell: true, stdio: "inherit" });
        });
    }
})();

async function setup() {
    // Create data directory
    mkdirSync(DATA_DIR, { recursive: true });
    mkdirSync(SERVER_DIR, { recursive: true });

    //todo, replace w/ template string
    console.log(`${colors.bold.blue("Welcome to setup. ")} For setup instructions, please visit ${colors.blue("https://github.com/Tee1er/boing/blob/main/README.md")} \n`);
    let prompts = [
        {
            type: "input",
            name: "token",
            message: "Please enter your bot's token.",
        },
        {
            type: "input",
            name: "prefix",
            message: "Please enter a prefix. (default is 'b')",
            initial: "b",
        },
        {
            type: "input",
            name: "clientId",
            message: "Please enter your bot's client ID.",
        },
        {
            type: "input",
            name: "guildId",
            message: "Please enter your server's ID.",
        },
        {
            type: "input",
            name: "adminRole",
            message: "Name of a role to grant administrator permissions. Case-sensitive. (Leave blank for none.)",
        },
        {
            type: "input",
            name: "notificationChannel",
            message: "Select a notifications channel. This is where Boing sends updates when a player joins, disconnects, etc. ",
        },
        {
            type: "numeral",
            name: "backupFrequency",
            message: "How often should automatic backups be made? (in seconds, default is 5m)",
            initial: 300,
        }
    ];

    const response = await enquirer.prompt(prompts);
    console.log(
        colors.bold.green("\nSetup is now complete. ")
    );

    var user_settings = response;
    user_settings["serverResource"] = "https://api.github.com/repos/Anuken/Mindustry/releases/latest";
    // Used by the config command to only expose certain configuration values
    user_settings["exposedConfigs"] = [
        "name",
        "desc",
        "showConnectMessages",
        "enableVoteKick",
        "startCommands",
        "crashReport",
        "logging",
        "strict",
        "antiSpam",
        "interactRateWindow",
        "interactRateLimit",
        "interactRateKick",
        "messageRateLimit",
        "messageSpamKick",
        "allowCustomClients",
        "whitelist",
        "motd",
        "autosave",
        "autosaveAmount",
        "autosaveSpacing",
    ];

    data.SETTINGS = user_settings;
    saveSettings();

    // Register slash commands
    require("./register_commands.js").registerCommands();
}