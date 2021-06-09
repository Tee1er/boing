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
        svc.on("install", () => {
            console.log(colors.green("Service installed successfully."))
            svc.start();
            return true;
        })

        svc.on("alreadyinstalled", async () => {
            console.log(colors.red("Service already installed. Uninstalling existing service ..."));
            let uninstalled = await this.uninstall(svc);
            console.log(uninstalled);
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
            svc.uninstall();
        })
    }

}

win.install();

    module.exports = {
        win
    }