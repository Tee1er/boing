let { clearInterval, setInterval } = require("timers");
let fs = require("fs");

let timer;
let current;

function startBackups(server) {
    backups = fs.readdirSync(`../server/config/saves/boing-backups/`);
    backupNums = backups.map(backup => Number(backup.split(".")[0]).sort((a, b) => a - b));
    current = backupNums.length > 0 ? backupNums[backupNums.length - 1] : 0;
    if (current > 12) {
        for (let i = current - 12; i >= 0; i--) {
            fs.rmSync(`../server/config/saves/boing-backups/${i}.msav`);
        }
    }
    timer = setInterval(() => {
        // fs.rmSync(`../server/config/saves/boing-backups/backup.msav`);

        console.log("Taking backup.");
        server.write("save boing-backups/" + current);
        if (current > 12) {
            fs.rmSync(`../server/config/saves/boing-backups/${current - 12}.msav`); //delete old backups
        }
    }, 300000);
}
// function stopBackups() {
//     clearInterval(timer);
//     fs.rmSync(`../server/config/saves/boing-backups/backup.msav`);
// }

module.exports = {
    startBackups,
    // stopBackups
};
