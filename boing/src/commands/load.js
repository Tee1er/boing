const mserver = require("../mserver.js");

let execute = async function(ARGUMENTS) {
    let result = await mserver.write_recv(`load boing-library/${ARGUMENTS[1]}`);
    if (result.includes("Save loaded")) {
        return "Loaded save from the Map Library.";
    } else {
        // eslint-disable-next-line max-len
        return `An error occured and the save was likely not successfuly loaded. Is the map you're trying to load in the Map Library? \`\`\`js\n${result} \`\`\``;
    }
};

module.exports = {
    execute,
    info: {
        name: "load",
        descrip: "Loads a game from the Map Library. This is *not* the same as `import`.",
        longDescrip: "Loads a game from the Map Library."
    },
    preExecuteMsg: "Loading save..."
};