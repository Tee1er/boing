const mserver = require("../mserver.js");

let execute = function() {
    return mserver.write_recv("pause off").then(result => {
        return "Game unpaused.";
    });
};

module.exports = {
    execute,
    info: {
        name: "unpause",
        descrip: "Unpauses the game.",
        longDescrip: "Unpauses the game. To pause it, use `<prefix> pause`."
    }
};