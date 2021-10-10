/* eslint-disable no-undef */
const service_win32 = process.platform === "win32";
const child_process = require("child_process");
const { mkdirSync } = require("fs");
const { data, loadSettings, loadSessionData, saveSettings, SRC_DIR, DATA_DIR, SERVER_DIR } = require("./globals.js");

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

// Service mode only on windows
if (service_win32) {
    const serviceUtil = require("./service.js");
}

console.log(colors.bold.yellow("-- Boing Mindustry-Discord Interface v2.1 --"));
console.log("Please see https://www.github.com/Tee1er/boing for more information.\n");

let setupOccurred = Object.keys(data.SETTINGS).length !== 0;

if (!setupOccurred) {
    setup();
} else {
    console.log(`Setup has already occured. Service Mode is ${colors.bold(data.SETTINGS.serviceMode ? colors.green("on.") : colors.red("off."))} \n`);
    setupOccurred = true;
}

if (!data.SETTINGS.serviceMode && setupOccurred) {
    deps_resolver.get_server().then(_ => {
        console.log(colors.bold("Starting Boing ... \n"));
        // FIXME: Make bot into a class to make boing one unified process
        let boing = child_process.spawn(`node ${SRC_DIR}/bot.js`, [], { shell: true, stdio: "inherit" });
    });
}

async function setup() {
    // Create data directory
    mkdirSync(DATA_DIR, { recursive: true });
    mkdirSync(SERVER_DIR, { recursive: true });

    //todo, replace w/ template string
    console.log(`${colors.bold.blue("Welcome to setup. ")} For setup instructions, please visit ${colors.blue("https://github.com/Tee1er/boing/blob/main/README.md")} \n`);
    const prompts = [{
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
        name: "chatChannel",
        message: "Enter the channel you would like the server's chat to be relayed through. Leave blank to disable Chat Relay. (This feature is not functional as of Boing v1.1)",
        initial: "",
    },
    {
        type: "toggle",
        name: "serviceMode",
        message: "Enable Service Mode?",
        initial: false,
    },
    {
        type: "input",
        name: "adminRole",
        message: "Name of a role to grant administrator permissions (leave blank for none)",
    },
    {
        type: "input",
        name: "notificationChannel",
        message: "Select a notifications channel. This is where Boing sends updates when a player joins, disconnects, etc. ",
    },
    {
        type: "list",
        name: "channelBlacklist",
        message: "Select channels to blacklist - leave blank if you have none.",
    },
    ];

    const response = await enquirer.prompt(prompts);
    console.log(
        colors.bold.green("\nSetup is now complete. ") +
            `In the future, if you do not have Service Mode enabled, the Boing launcher 
will instead start Boing instead of prompting you for setup. If you have Service Mode enabled, it will start
automatically the next time you restart your computer. \n`,
    );

    var user_settings = response;
    user_settings["serverResource"] = "https://api.github.com/repos/Anuken/Mindustry/releases/latest";
    // Used by the config command to only expose certain configuration values
    user_settings["exposedConfigs"] = ["name", "desc", "showConnectMessages", "enableVoteKick", "startCommands", "crashReport", "logging", "strict", "antiSpam", "interactRateWindow", "interactRateLimit", "interactRateKick", "messageRateLimit", "messageSpamKick", "allowCustomClients", "whitelist", "motd", "autosave", "autosaveAmount", "autosaveSpacing"];

    data.SETTINGS = user_settings;
    saveSettings();

    if (data.SETTINGS.serviceMode === true && service_win32) {
        console.log(colors.bold("Beginning the service installation process now. You may have to accept multiple prompts from your operating system in order to install correctly. \n"));
        await new Promise(resolve => setTimeout(resolve, 2500)); //Let the user have a couple seconds to read the message.
        serviceUtil.install();
    } else if (response.serviceMode !== true) {
        if (service_win32) serviceUtil.uninstall();
    }
}
