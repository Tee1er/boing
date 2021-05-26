const mserver = require("../mserver.js");

let execute = function() {
    return mserver.write("pause off").then(result => {
        return `Game unpaused. \`\`\`js\n${result} \`\`\` `
    })
}

module.exports = {
    execute,
    info: {
        name: "unpause",
        descrip: "Unpauses the game.",
        longDescrip: "Unpauses the game. To pause it, use `b pause`."
    }
}