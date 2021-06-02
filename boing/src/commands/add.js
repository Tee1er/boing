const mserver = require("../mserver.js");
const crypto = require("crypto");
const { writeFileSync, existsSync } = require("fs");
const { resolve } = require("path");
const { get } = require("axios");

let execute = async function(arguments, message) {
    if (!arguments[1]) {
        return "An error occured. A map name must be provided."
    } 
    let attachment = message.attachments.array()[0];
    let fileName = arguments[1];
    let filePath = resolve(`../../server/config/saves/boing-library/${fileName}.msav`);
    let file = await get(attachment.url, {responseType: "arraybuffer"}).then(result => {
        let data = Buffer.from(result.data);
        //open & write to file
        writeFileSync(filePath, data, {encoding: null});
    });
    return `Added file to the Map Library with the name \`${fileName}\`.`;
}

module.exports = {
    execute,
    info: {
        name: "add",
        descrip: "Adds a map to the Map Library.",
        longDescrip: "Adds a map to the Map Library. MSAV format & name for map required. Overrides existing maps with the same name."
    }
}