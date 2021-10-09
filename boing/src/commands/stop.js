const mserver = require("../mserver.js");

let execute = function() {
    return mserver.write_recv("stop").then(result => {
        return `Game stopped. \`\`\`js\n${result} \`\`\` `
    })
}

module.exports = {
    execute,
    info: {
        name: "stop",
        descrip: "Stops hosting the map.",
        longDescrip: "Stops the map the server is currently hosting. Does *not* stop Boing altogether."
    }
}