const mserver = require("../mserver.js");

let execute = function() {
    return mserver.write("pause on").then(result => {
        return `Game paused. \`\`\`js\n${result} \`\`\` `
    })
}

module.exports = {
    execute,
    info: {
        name: "pause",
        descrip: "Pauses the game.",
        longDescrip: "Pauses the game. To unpause it, use `<prefix> unpause`."
    }
}