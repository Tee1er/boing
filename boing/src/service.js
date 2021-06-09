const winService = require("node-windows").Service;
const colors = require("ansi-colors");

let os;

if (process.platform == "win32") {
    os == "win"
}

let win = {
    install: async function() {
        let svc = new winService({
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
    },
    uninstall: function(svc) {
        return new Promise((resolve) => {
            svc.on("uninstall", () => {
                resolve(true);
            })
            svc.on("alreadyuninstalled", () => {
                resolve(true);
            })
            svc.uninstall();
        })
    }

}

    module.exports = {
        win
    }