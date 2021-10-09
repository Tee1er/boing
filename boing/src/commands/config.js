const { regexes } = require("../globals.js");
const mserver = require("../mserver.js");

const VALID_CONFIGS = [
    "name",
    "desc",
    "port",
    "autoUpdate",
    "showConnectMessages",
    "enableVoteKick",
    "startCommands",
    "crashReport",
    "logging",
    "strict",
    "antiSpam",
    "interactRateWindow",
    "interactRateLimit",
    "interactRateKick",
    "messageRateLimit",
    "messageSpamKick",
    "socketInput",
    "socketInputPort",
    "socketInputAddress",
    "allowCustomClients",
    "whitelist",
    "motd",
    "autosave",
    "autosaveAmount",
    "autosaveSpacing",
    "debug"
]

let execute = async function(ARGUMENTS) {
    const cfg_opt = ARGUMENTS.length >= 1 ? ARGUMENTS[1] : null;
    const cfg_val = ARGUMENTS.length >= 2 ? ARGUMENTS[2] : null;

    if (cfg_opt) {
        if (!VALID_CONFIGS.includes(cfg_opt))
            return Promise.reject(`Option ${cfg_opt} not found. Use the config command with no arguments to display all configuration options.`);

        if (cfg_val) {
            return mserver.write_recv(`config ${cfg_opt} ${cfg_val}`).then(res => `Server option ${res.match(regexes.message)}`);
        } else {
            let value = await mserver.write_recv(`config ${cfg_opt}`);
            value = value.match(regexes.message);
            return Promise.resolve(`Server option ${value}`);
        }
    } else {
        return await mserver.write_poll(
            "config",
            function(line) { return line.includes("| | Enable debug logging") },
            function(line) {
                return line.match(regexes.message);
            }
        );
    }
};

module.exports = {
    execute,
    info: {
        name: "config",
        descrip: "Modify the server's configuration",
        longDescrip: "Modify the server's internal configuration. Running with no arguments lists all server configuration options. Running with one argument displays the value of the configuration option specified by the argument. Running with two arguments sets the configuration value *argument one* to *argument two*",
        adminOnly: true,
    },
};