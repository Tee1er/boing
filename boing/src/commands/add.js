const mserver = require("../mserver.js");
const crypto = require("crypto");
const { writeFileSync} = require("fs");
const { resolve } = require("path");
const { get } = require("axios").default;
const { SERVER_CONFIG_DIR } = require("../globals.js");

let execute = async function(ARGUMENTS, message) {
    if (!ARGUMENTS[1]) {
        return "An error occured. A map name must be provided.";
    } 
    let attachment = message.attachments.array()[0];
    let fileName = ARGUMENTS[1];
    let filePath = resolve(`${SERVER_CONFIG_DIR}/saves/boing-library/${fileName}.msav`);
    let file = await get(attachment.url, {responseType: "arraybuffer"}).then(result => {
        // eslint-disable-next-line no-undef
        let data = Buffer.from(result.data);
        //open & write to file
        writeFileSync(filePath, data, {encoding: null});
    });
    
    return `Added file to the Map Library with the name \`${fileName}\`.`;
};

module.exports = {
    execute,
    info: {
        name: "add",
        descrip: "Adds a map to the Map Library.",
        longDescrip: "Adds a map to the Map Library. MSAV format & name for map required. Overrides existing maps with the same name."
    }
};