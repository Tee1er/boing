const { resolve } = require("path");
const colors = require("ansi-colors");
const enquirer = require("enquirer");
var Service = false
if (process.platform == "win32") {
    Service = require("node-windows").Service; //Destructing operator doesn't work here?
}

const { writeFileSync, readFileSync, existsSync } = require("fs");
const child_process = require("child_process")

console.log(colors.bold.yellow("-- Boing Mindustry-Discord Interface v2.0 --"));
console.log("Please see github.com/Tee1er/boing for more information if you get stuck during setup.\n");

var settings = {};
var setupOccurred = false;
if (existsSync("settings.json")) {
    const settings = JSON.parse(readFileSync("settings.json"));
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
            name: "optional.chatChannel"
            message: "Enter the channel name that you would like the server's chat to relay through, leave blank for none",
            initial: ""
        }

    ]

    if (Service) { prompts.push( {
            type: "toggle",
            name: "serviceMode",
            message: "Enable service mode?",
            initial: false
        })
    }

    const response = await enquirer.prompt(prompts);
    console.log(colors.bold.green(`\nSetup is now complete. `) + `In the future, if you do not have Service Mode enabled, the Boing launcher 
will instead start Boing instead of prompting you for setup. If you have Service Mode enabled, it will start
automatically the next time you restart your computer.`)

    const settings = JSON.stringify(response, null, 4);

    //is using the file handle method faster?
    writeFileSync("settings.json", settings)

    if (response.serviceMode === true) {
        if (installService()) {console.log(colors.bold.green("Service mode enabled."))}
    }
}

async function installService () {

    var svc = new Service({
    name: "BoingMDI",
    description: "A Discord interface for the Mindustry game server.",
    script: "bot.js"
    })

    svc.on("install", function(){
        console.log(colors.green("Service installed successfully."))
        svc.start();
        return;
    })

    svc.on("invalidinstallation", () => {throw new Error(`${colors.bold.red("An error occured: ")}invalid installation detected.`)})

    svc.install();

    svc.on("alreadyinstalled", () => {
        console.log("Boing appears to be already installed. Uninstalling & reinstalling ...")
        uninstallService(svc);
        installService();
    })
}

async function uninstallService(svc) {
    svc.on("uninstall", () => {
        console.log(colors.yellow("Uninstalled existing service(s)."))
    })
    svc.uninstall()
}







