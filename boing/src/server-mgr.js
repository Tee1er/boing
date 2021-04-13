const spawn = require("child_process").spawn;
const stream = require("stream");
const fs = require("fs");
const bot = require("./bot");
const util = require("util");
// for generating file names
const crypto = require("crypto");
const Discord = require("discord.js");
const path = require("path");

let server;

startServer = function(path) {
    console.log("Starting ...");
    console.log(path);
    server = spawn("java", ["-jar", `"${path}"`], {
        shell: true,
    });
    server.stdout.pipe(process.stdout);
    process.stdin.pipe(server.stdin);
    server.stdin.write("host \n"); 
}

// Register callback function for server stdout data reception
setOutputCallback = function(fn) {
    server.stdout.on("data", (dat) => { fn(dat); console.log(dat.toString()); });
}

getSoonestOutput = function() {
    return new Promise (resolve => {
        server.stdout.on("data", (data) => {
            resolve(data.toString());
        })
    })
}

pauseServer = function() {
    return new Promise(resolve => {
        if (server.stdin.write("pause on\n")) {
                resolve(getSoonestOutput());
        }
    }); 
}

unpauseServer = function() {
    return new Promise(resolve => {
        if (server.stdin.write("pause off\n")) {
            resolve(getSoonestOutput());
        }
    })
}

hostServer = function(map) {
    return new Promise(resolve => {
        if (server.stdin.write(`host ${map.content.replace("boing ", "")}\n`)) {
            resolve(getSoonestOutput());
        }
    })
}

stopServer = function() {
    return new Promise(resolve => {
        if (server.stdin.write("stop\n")) {
            resolve(getSoonestOutput());
        }
    })
}

exportGame = function() {
    return new Promise(resolve => {
        let fileName = crypto.randomBytes(8).toString("hex");
        if (server.stdin.write(`save ${fileName}\n`)) {
            getSoonestOutput().then(out => {
                if (out.indexOf("Saved to") !== -1) {
                    resolve(path.resolve(`config/saves/${fileName}.msav`));
                }
            }) 
        }
    })
}

// Write to the server's STDIN
stdinWrite = function(str) {
    server.stdin.write(str);
}

module.exports = { 
    startServer,
    pauseServer,
    unpauseServer,
    hostServer,
    stopServer,
    exportGame,
    stdinWrite,
    setOutputCallback
}; 
