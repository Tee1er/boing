// let nw = require("node-windows");
const { resolve } = require("path");
const colors = require("ansi-colors");
let Service = require("node-windows").Service;

console.log(colors.bold.yellow("-- Boing Mindustry-Discord Interface v2.0 --"));
console.log("Please see github.com/Tee1er/boing for more information if you get stuck during setup.");

let serviceMode, prefix, token;

// (async () => {
//     const response = await prompts({
//         type: "confirm",
//         name: "serviceMode",
//         message: "Turn on Service Mode: (yes/no)",
//         // validate: value => value == "yes" || value == "no" ? "Please enter either 'yes' or 'no'." : true
//     })
// })

var svc = new Service({
    name: "Boing MDI",
    description: "A Discord interface for the Mindustry server. Please see github.com/Tee1er/boing for more information.",
    script: "bot.js"
})

svc.on("install", function(){svc.start();})

svc.install();

svc.on("alreadyinstalled", () => {

})



