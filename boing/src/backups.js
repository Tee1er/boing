let { clearInterval, setInterval } = require("timers");
let fs = require("fs");

let timer;

function startBackups(server) {
    timer = setInterval(() => {
        if (fs.existsSync(`../server/config/saves/boing-backups/latest.msav`)) {
            fs.rmSync(`../server/config/saves/boing-backups/latest.msav`);
        }
        console.log("Taking backup.");
        server.write("save boing-backups/latest");
    }, 300000);
}
function stopBackups() {
    clearInterval(timer);
    fs.rmSync(`../server/config/saves/boing-backups/latest.msav`);
}

module.exports = {
    startBackups,
    // stopBackups
};
