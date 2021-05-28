const mserver = require("../mserver.js");
const fs = require("fs");
const crypto = require("crypto");
const axios = require("axios");
const path = require("path");

let execute = async function(ARGUMENTS, message) {
    //
    let attachment = message.attachments.array()[0];
    let fileName = "I-" + crypto.randomBytes(4).toString("hex");
    let file = await axios.get(attachment.url, {responseType: "arraybuffer"}).then(result => {
        let data = Buffer.from(result.data);
        //open & write to file
        let filePath = path.resolve(`../../server/config/saves/${fileName}.msav`)
        fs.writeFileSync(filePath, data, {encoding: null});
    })
    let result = await mserver.write(`load ${fileName}`)

    if (result.includes("Save loaded")) {
        return `Loaded save. \`\`\`js\n${result} \`\`\` `
    }
    else {
        return `An error occured & the save was likely not successfully loaded. \`\`\`js\n${result} \`\`\``
    }
}       

module.exports = {
    execute,
    info: {
        name: "import",
        descrip: "Imports a map.",
        longDescrip: "Imports a user-provided map. Attach the file to the message & comment `b import` to use."
    }
}