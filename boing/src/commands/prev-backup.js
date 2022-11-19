const { SlashCommandBuilder } = require("discord.js");

let execute = async function (interaction) {
    const mserver = require("../mserver.js");
    const { resolve } = require("path");
    const { SERVER_CONFIG_DIR } = require("../globals");
    let fs = require("fs");
    let { getCurrent } = require("../backups.js");

    await interaction.deferReply();

    await mserver.write_recv("stop");

    /**COPY AND PASTED FROM BACKUPS.JS. NOT A GOOD SOLUTION BUT IT SHOULD WORK */
    const BACKUPPATH = resolve(SERVER_CONFIG_DIR, "./saves/boing-backups/");
    // If backups folder does not exist, create it.
    if (!fs.existsSync(BACKUPPATH)) {
        fs.mkdirSync(BACKUPPATH, { recursive: true });
    }

    current = getCurrent();

    let result;
    if (!interaction.options.getInteger("backup-number")) {
        result = await mserver.write_recv("load boing-backups/" + current);
    } else {
        result = await mserver.write_recv("load boing-backups/" + (current - interaction.options.getInteger("backup-number") + 1));
    }
    if (result.includes("Save loaded")) {
        await interaction.editReply("Loaded backup successfully.");
        return;
    } else {
        await interaction.editReply(`An error occured and the save was likely not successfuly loaded. \`\`\`js\n${result} \`\`\``);
        return;
    }
};

module.exports = {
    execute,
    info: new SlashCommandBuilder()
        .setName("prev-backup")
        .setDescription("[BETA] Loads a previous backup.")
        .addIntegerOption(option =>
            option.setName("backup-number")
                .setDescription("[optional] Number of the backup to load. (ex: 2 would load the 2nd latest) Defaults to most recent.")
        ),
};