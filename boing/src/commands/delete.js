const mserver = require("../mserver.js");
const { rmSync } = require("fs");
const { resolve } = require("path");

let execute = function (ARGUMENTS) {
    let fileName = ARGUMENTS[1];
    let filePath = resolve(`../../server/config/saves/boing-library/${fileName}.msav`)
    rmSync(filePath);
    return Promise.resolve(`Deleted file \`${fileName}\` from the Map Library.`)
}

module.exports = {
    execute,
    info: {
        name: "delete",
        descrip: "Deletes content from the Map Library.",
        longDescrip: "Deletes content from the Map Library. Case-sensitive. Be careful with this command!"
    }
}