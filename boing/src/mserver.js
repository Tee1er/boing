const readline = require("readline");
const child_process = require("child_process");
const bot = require("./bot.js");
const EventEmitter = require("events");
const { SERVER_JAR, SERVER_DIR, regexes } = require("./globals");
// const { appendFileSync, appendFile, existsSync, createWriteStream } = require("fs");

//Use "mserver" to avoid confusion with Discord servers.

let mserver = child_process.spawn(`cd ${SERVER_DIR} && java -jar ${SERVER_JAR}`, [], {
    shell: true,
});

// Make sure to kill on Ctrl-C
process.on("SIGINT", function() {
    console.log("Interrupt, killing server.");
    mserver.kill();
    process.exit();
});

var mserver_io = readline.createInterface({
    output: mserver.stdin,
    input: mserver.stdout,
});

// child_process.exec("cd ../boing/src"); // Go back to normal working directory so relative paths don't get messed up
process.stdin.pipe(mserver.stdin); // Fixed this, you have to pipe fro the nodejs process to the child
mserver.stdout.pipe(process.stdout);

/**
 * Sends a command to the server, accumulates, and transforms a response until it is 'accepted' by a delegate
 * @param {string} text Text to send to the server's standard input
 * @param {Function} poll_return Function that given the output buffer and number of lines received determines whether the function should yield
 * @param {Function} transform Function that transforms a line before appending it to the buffer
 *
 * @returns {Promise<string>} Output buffer accumulated from the server's output, return triggered by `poll_return`
 */
let write_poll = function(
    text,
    poll_return = function(line, lines, nlines) {
        return true;
    },
    transform = (line, line_idx) => line,
) {
    mserver.stdin.write(`${text} \n`);

    let buf = "";
    let nlines = 0;
    let listener_idx = mserver_io.listenerCount("line");

    return new Promise(resolve => {
        mserver_io.on("line", data => {
            let line = data.toString();
            let transformed_line = transform(cleanServerOutput(line), nlines);
            if (transformed_line) buf += transformed_line + "\n";

            if (line.trim() != "" && poll_return(buf, nlines)) {
                mserver_io.removeListener("line", mserver_io.listeners("line")[listener_idx]);
                resolve(buf);
            }

            nlines++;
        });
    });
};

let write_recv = function(text) {
    mserver.stdin.write(`${text} \n`);
    let listener_idx = mserver_io.listenerCount("line");

    return new Promise(resolve => {
        mserver_io.on("line", data => {
            resolve(cleanServerOutput(data.toString().trim()));
            mserver_io.removeListener("line", mserver_io.listeners("line")[listener_idx]);
        });
    });
};

let write = function(text) {
    mserver.stdin.write(`${text} \n`);
};

// let chat = function (user, message) {
//     let username = `${user.username}#${user.discriminator}`; //Account for multiple users w/ the same username. Unlikely, but just in case.
//     write(`say [${username}] ${message}`);
// };

let gameEvents = new EventEmitter();
mserver.stdout.on("data", line => {
    let message = cleanServerOutput(line.toString());

    if (message.includes("Game over!") && !message.includes("0 players")) {
        gameEvents.emit("gameOver", message);
    } else if (message.includes("has connected")) {
        gameEvents.emit("playerConnected", message);
    } else if (message.includes("has disconnected")) {
        gameEvents.emit("playerDisconnected", message);
    } else if (message.includes("Stopped server.")) {
        gameEvents.emit("stopped", message);
    }
});

/**
 * Removes control characters from server output
 * @param {string} output String to clean
 * @returns {string} Cleaned string
 */
function cleanServerOutput(output) {
    let cleaned = output.replace(/\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g, "");

    return cleaned;
}

module.exports = {
    server: mserver,
    write,
    write_recv,
    write_poll,
    cleanServerOutput,
    events: gameEvents,
};