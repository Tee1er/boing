const { regexes, data } = require("../globals.js");
const mserver = require("../mserver.js");
const Discord = require("discord.js");

const VALID_CONFIGS = data.SETTINGS.exposedConfigs;

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
        let raw_config = await mserver.write_poll(
            "config",
            function(line) { return line.includes("| | Enable debug logging") },
            function(line, line_idx) {
                if (line_idx != 0)
                    return line.match(regexes.message);
            }
        );

        let parsed_config = raw_config
            .split("|\n")                           // Split at double newlines
            .map(c => c.replace(/\|\s*/g, "")       // Remove bars
                .split("\n")                        // Split to pairs
                .filter(l => l != "")               // Remove empty third
            ).filter(
                pair => VALID_CONFIGS.includes(     // Only show allowed values
                    pair[0].split(":")[0]           // Find the key of the pair's value
                )
            );

        let embed = new Discord.MessageEmbed()
            .setColor("#E67B29")
            .setTitle("Configuration values")
            .setFooter("Boing - github.com/Tee1er/boing");

        for (let chunk of parsed_config) {
            embed.addFields({
                name: chunk[0],
                value: chunk[1],
                inline: true
            });
        }
        
        return embed;
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