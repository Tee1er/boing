const mserver = require("../mserver.js");

let execute = async function () {
    await mserver.write(`stop`);
    let result = await mserver.write(`load boing-backups/latest`);
    if (result.includes("Save loaded")) {
        return `Loaded backup. \`\`\`js\n${result} \`\`\` `;
    } else {
        return `An error occured and the save was likely not successfuly loaded. \`\`\`js\n${result} \`\`\``;
    }
};

module.exports = {
    execute,
    info: {
        name: "rollback",
        descrip: "Loads the most recent backup.",
        longDescrip:
            "Loads the most recent backup. Backups are taken automatically by Boing every 5 minutes and deleted with each new game.",
    },
};
