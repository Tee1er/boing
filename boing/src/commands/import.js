const mserver = require("../mserver.js");
const { writeFileSync, rmSync, fstat, mkdi, mkdirSync, existsSync } = require("fs");
const crypto = require("crypto");
const axios = require("axios");
const path = require("path");
const { SERVER_CONFIG_DIR } = require("../globals.js");

let execute = async function (ARGUMENTS, message) {
    let attachment = message.attachments.array()[0];
    let fileName = "I-" + crypto.randomBytes(4).toString("hex");
    let folderPath = path.resolve(`${SERVER_CONFIG_DIR}/saves/`);
    if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
    }
    let filePath = path.resolve(`${SERVER_CONFIG_DIR}/saves/${fileName}.msav`);
    let file = await axios.default.get(attachment.url, { responseType: "arraybuffer" }).then(result => {
        let data = Buffer.from(result.data);
        //open & write to file
        writeFileSync(filePath, data, { encoding: null });
    });
    let result = await mserver.write_recv(`load ${fileName}`);

    //Deletes imported file, now that the server has loaded it.
    rmSync(filePath);

    // SO: https://stackoverflow.com/questions/15905221/javascript-callback-function-throws-error-callback-is-not-a-function-in-firefo/15905411

    if (result.includes("Save loaded")) {
        return `Loaded save. \`${fileName} \` `;
    } else {
        return "An error occured & the save was likely not successfully loaded.";
    }
};

module.exports = {
    execute,
    info: {
        name: "import",
        descrip: "Imports a map.",
        longDescrip: "Imports a user-provided map. Attach the file to the message & comment `<prefix> import` to use. `import` deletes the file after it has been loaded. Big files may take a while to load.",
    },
    preExecuteMsg: "Importing map...",
};
