let Service;
const colors = require("ansi-colors");

if (process.platform == "win32") {
    Service = require("node-windows").Service; //destructing operator doesn't work fsr?
} else if (process.platform == "darwin") {// macOS, I think?
    Service = require("node-mac").Service;
} else if (process.platform == "linux") {
    Service = require("node-linux").Service;
} else {
    throw new Error("Your operating system may not be compatible with Boing. Aborting ...")
}

let install = async function() {
    let svc = new Service({
        name: "BoingMDI",
        description: "A Discord interface for the Mindustry game server.",
        script: "bot.js"
    })

    svc.on("install", async () => {
        console.log(colors.green("Now installing service ..."))
        svc.start();
        console.log(colors.bold.green("Service installed!"))
        return true;
    })

    svc.on("alreadyinstalled", async () => {
        console.log("Service already installed. Uninstalling existing service ...");
        let uninstalled = await this.uninstall(svc);
        console.log(uninstalled ? "Service uninstalled." : colors.bold.red("An error occured. The service was not uninstalled."))
        this.install();
    })

    svc.install();
}
let uninstall =  async function(svc) {
        this.svc.on("uninstall", () => {
            return true;;
        })
        this.svc.on("alreadyuninstalled", () => {
            return true;
        })
        svc.uninstall();
}


    module.exports = {
        install,
        uninstall
    }