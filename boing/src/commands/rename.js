const { renameSync } = require("fs");
const { SERVER_CONFIG_DIR } = require("../globals");

let execute = function (ARGUMENTS) {
    let oldFileName = ARGUMENTS[1];
    let newFileName = ARGUMENTS[2];

    if (oldFileName === newFileName || newFileName === undefined) {
        return Promise.resolve("An error occured. Map could not be renamed.");
    }

    let oldFilePath = `${SERVER_CONFIG_DIR}/saves/boing-library/${oldFileName}.msav`;
    let newFilePath = `${SERVER_CONFIG_DIR}/saves/boing-library/${newFileName}.msav`;
    renameSync(oldFilePath, newFilePath);
    
    return Promise.resolve(
        `Renamed map from \`${oldFileName}\` to \`${newFileName}\`.`,
    );
};

module.exports = {
    execute,
    info: {
        name: "rename",
        descrip: "Renames Map Library maps.",
        longDescrip:
            "Renames Map Library maps. Accepts two arguments, after each other; the old path, then the new path. Case-sensitive.",
    },
};
