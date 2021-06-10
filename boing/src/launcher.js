const { resolve } = require("path");
const colors = require("ansi-colors");
const enquirer = require("enquirer");
const serviceUtil = require("./service.js");

const { writeFileSync, readFileSync, existsSync } = require("fs");
const child_process = require("child_process")

console.log(colors.bold.yellow("-- Boing Mindustry-Discord Interface v2.0 --"));
console.log("Please see github.com/Tee1er/boing for more information if you get stuck during setup.\n");

var settings = {};
var setupOccurred = false;
if (existsSync("settings.json")) {
    settings = JSON.parse(readFileSync("settings.json"));
    setupOccurred = Object.keys(settings).length !== 0;
} 
if (!setupOccurred) {
    setup();
} else { 
    //Can someone clean up this terrible ternary operator thingy and make it easier to read? TODO
    console.log(`Setup has already occured. Service Mode is ${colors.bold(settings.serviceMode ? colors.green("on.") : colors.red("off."))} \n`);
} 

if (!settings.serviceMode && setupOccurred) {
    console.log(colors.bold("Attempting to start Boing ... \n"))
    let boing = child_process.spawn("node bot.js", [], {shell: true});
    boing.stdout.pipe(process.stdout);
}

async function setup() {
    //todo, replace w/ template string
    console.log(`${colors.bold.blue("Welcome to setup. ")} For setup instructions, please visit ${colors.blue("https://github.com/Tee1er/boing/blob/main/README.md")} \n`);
    const prompts = [
        {
            type: "input",
            name: "token",
            message: "Please enter your bot's token."
        },
        {
            type: "input",
            name: "prefix",
            message: "Please enter a prefix. (default is 'b')",
            initial: "b"
        },
        {
            type: "input",
            name: "chatChannel",
            message: "Enter the channel you would like the server's chat to be relayed through. Leave blank to disable Chat Relay.",
            initial: ""
        },
        {
            type: "toggle",
            name: "serviceMode",
            message: "Enable Service Mode?",
            initial: false
        }

    ]

    const response = await enquirer.prompt(prompts);
    console.log(colors.bold.green(`\nSetup is now complete. `) + `In the future, if you do not have Service Mode enabled, the Boing launcher 
will instead start Boing instead of prompting you for setup. If you have Service Mode enabled, it will start
automatically the next time you restart your computer. \n`)

    const settings = JSON.stringify(response, null, 4);

    //is using the file handle method faster?
    writeFileSync("settings.json", settings)

    if (response.serviceMode === true) {
        console.log(colors.bold("Beginning the service installation process now. You may have to accept multiple prompts from your operating system in order to install correctly. \n"))
        await new Promise(resolve => setTimeout(resolve, 2500)); //Let the user have a couple seconds to read the message.
        serviceUtil.install();
    } else if (response.serviceMode !== true) {
        serviceUtil.uninstall();
    }
}







