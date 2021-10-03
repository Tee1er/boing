const stream = require("stream");
const child_process = require("child_process");
const bot = require("./bot.js");
const EventEmitter = require("events");
const { SERVER_JAR, SERVER_DIR } = require('./globals');

//Use "mserver" to avoid confusion with Discord servers.

let mserver = child_process.spawn(
    `cd ${SERVER_DIR} && java -jar ${SERVER_JAR}`, [], {
        shell: true,
    },
);

// child_process.exec("cd ../boing/src"); // Go back to normal working directory so relative paths don't get messed up
process.stdin.pipe(mserver.stdin); // Fixed this, you have to pipe fro the nodejs process to the child
mserver.stdout.pipe(process.stdout);

let write = function(text) {
    mserver.stdin.write(`${text} \n`);
    return new Promise((resolve) => {
        mserver.stdout.on("data", (data) => {
            resolve(data.toString().trim());
        });
    });
};

// let chat = function (user, message) {
//     let username = `${user.username}#${user.discriminator}`; //Account for multiple users w/ the same username. Unlikely, but just in case.
//     write(`say [${username}] ${message}`);
// };

let gameEvents = new EventEmitter();
mserver.stdout.on("data", (data) => {
    let message = data.toString();
    if (message.includes("Game over!") && !message.includes("0 players")) {
        gameEvents.emit("gameOver", message);
    } else if (message.includes("has connected")) {
        gameEvents.emit("playerConnected", message);
    } else if (message.includes("has disconnected")) {
        gameEvents.emit("playerDisconnected", message);
    }
    if (message.includes("Stopped server.")) {
        gameEvents.emit("stopped", message);
    }
});

module.exports = {
    server: mserver,
    write,
    events: gameEvents,
};