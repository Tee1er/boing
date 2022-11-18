const { REST, Routes } = require("discord.js");
const fs = require('node:fs');

const { loadSettings, data } = require('./globals.js');

module.exports = {
    registerCommands: function () {
        // Retrieve necessary credentials
        loadSettings();

        const token = data.SETTINGS.token;
        const clientId = data.SETTINGS.clientId;
        const guildId = data.SETTINGS.guildId;


        const commands = [];

        const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);

            commands.push(command.info.toJSON());
        }

        const rest = new REST({ version: '10' }).setToken(token);

        (async () => {
            try {
                console.log(`Deploying ${commands.length} commands to ${guildId}`);

                const data = await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands },
                )

                console.log('Successfully registered commands.');
            } catch (e) {
                console.error(e);
            }
        })();
    }
}

module.exports.registerCommands();