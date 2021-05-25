const stream = require("stream");
const child_process = require("child_process");

//Use "mserver" to avoid confusion with Discord servers.
let mserver = child_process.spawn("run.bat", [], {
    shell: true
})

process.stdin.pipe(mserver.stdin);
mserver.stdout.pipe(process.stdout);

let write = function(text) {
    mserver.stdin.write(`${text} \n`)
    return new Promise(resolve => {
        mserver.stdout.on("data", data => {
            resolve(data.toString().trim());
        })
    })
}

module.exports = {
    server: mserver,
    write,

}