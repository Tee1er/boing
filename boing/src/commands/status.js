const mserver = require("../mserver.js");

let execute = async function (ARGUMENTS, message) {
    let value = await mserver.write_poll(
        "status",
        line => line.includes("server closed") || line.includes("0 players connected.") || (line.includes(" / ") && line.includes("==")),
        line => line,
    );
    return "```js\n" + value + "```";
};

module.exports = {
    execute,
    info: {
        name: "status",
        descrip: "Returns status information about the Mindustry server",
        longDescrip: "Returns status information about the Mindustry server, including memory usage, map name, and number of players connected.", // TODO
    },
};
