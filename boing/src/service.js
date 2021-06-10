
const colors = require("ansi-colors");
const Service = require("node-windows").Service; //destructing operator doesn't work fsr?

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