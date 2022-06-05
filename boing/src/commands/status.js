const mserver = require("../mserver.js");
const { loadSessionData, data } = require("../globals.js")

let execute = async function (ARGUMENTS, message) {
    let value = await mserver.write_poll(
        "status",
        line => line.includes("server closed") || line.includes("players connected.") || (line.includes(" / ") && line.includes("==")),
        line => line,
    );
    // Get server uptime information.
    loadSessionData();
    let msSinceFirstStart = Date.now() - data.SESSION_DATA.uptime.firstStarted;
    console.log(data.SESSION_DATA.uptime)
    let percentTimeRunning = (data.SESSION_DATA.uptime.msRunning / msSinceFirstStart) * 100;
    percentTimeRunning = percentTimeRunning.toFixed(2) + "%";
    return "```js\n" + value + "``` \n **Uptime:**\n" + `> ${percentTimeRunning}. \n> Total runtime: ${(new Date(data.SESSION_DATA.uptime.msRunning) / 3600000).toFixed(2)} hrs.`;
};

module.exports = {
    execute,
    info: {
        name: "status",
        descrip: "Returns status information about the Mindustry server",
        longDescrip: "Returns status information about the Mindustry server, including memory usage, map name, and number of players connected.", // TODO
    },
};
