let { clearInterval, setInterval } = require("timers");
let fs = require("fs");
const { DATA_DIR, SERVER_CONFIG_DIR } = require("./globals");
const { resolve } = require("path");

let timer;
let current;
const BACKUPPATH = resolve(SERVER_CONFIG_DIR, "./saves/boing-backups/");

function startBackups(server) {
    console.log("Player joined, starting backups.");
    // If backups folder does not exist, create it.
    if (!fs.existsSync(BACKUPPATH)) {
        fs.mkdirSync(BACKUPPATH, { recursive: true });
    }
    // Get last saved backup and convert it to a number.
    current = getCurrent();
    if (current > 12) {
        for (let i = current - 12; i >= 0; i--) {
            const path = BACKUPPATH + `/${i}.msav`;
            if (fs.existsSync(path)) {
                fs.rmSync(path);
            }
        }
    }
    timer = setInterval(() => {
        // fs.rmSync(`../server/config/saves/boing-backups/backup.msav`);
        console.log("Taking backup.");
        server.write("save boing-backups/" + (current + 1));
        current++;
        if (current > 12) {
            fs.rmSync(BACKUPPATH + `/${current - 12}.msav`); //delete old backups
        }
    }, 300000); // 5 minutes
}

function getCurrent() {
    let backups = fs.readdirSync(BACKUPPATH);
    let backupNums = backups.map(backup => Number(backup.split(".")[0])); //.sort((a, b) => a - b);
    //IK you could compress this into a single  line, but it's more readable this way
    //Removes duplicate numbers (fixes strange #-msav-backup.msav bug) and sorts them in ascending order
    let set = new Set(backupNums);
    backupNums = Array.from(set);
    backupNums.sort((a, b) => a - b);

    current = backupNums.length > 0 ? backupNums[backupNums.length - 1] : 0;
    return current;
}

function stopBackups() {
    clearInterval(timer);
    // fs.rmSync(`../server/config/saves/boing-backups/backup.msav`);
}

module.exports = {
    startBackups,
    stopBackups,
    getCurrent,
};
