const mserver = require("../mserver.js");

let execute = function() {
    mserver.write("pause on");
    console.log("PAUSE")
}

module.exports = {
    execute,
    info: {
        name: "host",
        descrip: "Hosts a new map. Randomly selected if map name not given. See `b maps` for a list."
    }
}