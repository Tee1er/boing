const mserver = require("../mserver.js");
const { resolve } = require("path");
const { SERVER_CONFIG_DIR } = require("../globals");
let fs = require("fs");
let { getCurrent } = require("../backups.js");

let execute = async function (ARGUMENTS) {
    await mserver.write_recv("stop");

    /**COPY AND PASTED FROM BACKUPS.JS. NOT A GOOD SOLUTION BUT IT SHOULD WORK */
    const BACKUPPATH = resolve(SERVER_CONFIG_DIR, "./saves/boing-backups/");
    // If backups folder does not exist, create it.
    if (!fs.existsSync(BACKUPPATH)) {
        fs.mkdirSync(BACKUPPATH, { recursive: true });
    }

    current = getCurrent();

    let result;
    if (!ARGUMENTS[1]) {
        result = await mserver.write_recv("load boing-backups/" + current);
    } else {
        result = await mserver.write_recv("load boing-backups/" + (current - ARGUMENTS[1] + 1));
    }
    if (result.includes("Save loaded")) {
        return "Loaded backup successfully. ";
    } else {
        return `An error occured and the save was likely not successfuly loaded. \`\`\`js\n${result} \`\`\``;
    }
};

module.exports = {
    execute,
    info: {
        name: "rollback",
        descrip: "Loads the most recent backup.",
        longDescrip: "Loads the most recent backup. Backups are taken automatically by Boing every 5 minutes and deleted with each new game.",
    },
};
