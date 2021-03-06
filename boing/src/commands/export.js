const mserver = require("../mserver.js");
const crypto = require("crypto");
const { server } = require("../mserver.js");
const { MessageAttachment } = require("discord.js");
const { resolve } = require("path");
const { rm } = require("fs/promises");
const { DATA_DIR, SERVER_CONFIG_DIR } = require("../globals.js");

let execute = async function(ARGUMENTS, message) {
    let fileName = `E-${crypto.randomBytes(4).toString("hex")}`;
    let result = await mserver.write_recv(`save ${fileName}`);
    if (!result.includes("Saved to")) {
        return "An error occured. The save could not be exported.";
    } else if (result.includes("Not hosting")) {
        return "Error, The server is not hosting a map.";
    }
    let attachment;
    let filePath = resolve(`${SERVER_CONFIG_DIR}/saves/${fileName}.msav`);
    if (ARGUMENTS[1]) {
        attachment = new MessageAttachment(filePath, ARGUMENTS[1] + ".msav");
    } else {
        attachment = new MessageAttachment(filePath, fileName + ".msav");
    }
    rm(filePath);

    return ["Here's your save file:", attachment];
};

module.exports = {
    execute,
    info: {
        name: "export",
        descrip: "Exports the game.",
        longDescrip: "Saves the currently running game & posts it. A name can be specified; if not, Boing will automatically generate one. `export` automatically deletes the file after it has been exported."
    }
};