let { clearInterval, setInterval } = require("timers");
let fs = require("fs");
const mserver = require("./mserver");
const { DATA_DIR, SERVER_CONFIG_DIR, saveSessionData, data, loadSessionData } = require("./globals");
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
        // Update backup data (for <prefix> backups cmd)
        updateBackupData();
    }, 3000); // 5 minutes
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

async function updateBackupData() {
    // Get info about last backup
    let result = await mserver.write_poll(
        "status",
        line => line.includes("server closed") || line.includes("0 players connected.") || (line.includes(" / ") && line.includes("==")),
        line => line,
    )

    console.log(result.split("\n")[1])

    result = result.split("\n")[1]
        .split("map")[1]
        .split("/") // theoretically, only the map name & wave # should be left
        .map(str => str.trim()) // remove whitespace

    let backupInfo = {
        map: result[0],
        wave: Number(result[1].split(" ")[1]),
        time: new Date()
    }

    console.log(result);
    console.log(backupInfo);

    loadSessionData();

    console.log(data)
    console.log(data.SESSION_DATA)
    console.log(data.SESSION_DATA.backups)

    // if data.SESSION_DATA.backups is undefined, create it
    if (data.SESSION_DATA.backups === undefined) {
        data.SESSION_DATA.backups = [];
    }

    // Save backup info to `data.json`
    data.SESSION_DATA.backups.unshift(backupInfo); // add to beginning of array

    saveSessionData();

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
