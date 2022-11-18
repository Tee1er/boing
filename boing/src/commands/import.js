const { SlashCommandBuilder } = require("discord.js");
const { resourceLimits } = require("worker_threads");

let execute = async function (interaction) {
    const mserver = require("../mserver.js");
    const { writeFileSync, rmSync, mkdirSync, existsSync } = require("fs");
    const crypto = require("crypto");
    const axios = require("axios");
    const path = require("path");
    const { SERVER_CONFIG_DIR } = require("../globals.js");

    await interaction.deferReply();


    let attachment = interaction.options.getAttachment("file");
    let fileName = "I-" + crypto.randomBytes(4).toString("hex");
    let folderPath = path.resolve(`${SERVER_CONFIG_DIR}/saves/`);
    if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
    }
    let filePath = path.resolve(`${SERVER_CONFIG_DIR}/saves/${fileName}.msav`);
    let file = await axios.default.get(attachment.url, { responseType: "arraybuffer" }).then(result => {
        let data = Buffer.from(result.data);
        //open & write to file
        writeFileSync(filePath, data, { encoding: null });
    });
    let result = await mserver.write_recv(`load ${fileName}`);

    //Deletes imported file, now that the server has loaded it.
    rmSync(filePath);

    // SO: https://stackoverflow.com/questions/15905221/javascript-callback-function-throws-error-callback-is-not-a-function-in-firefo/15905411

    if (result.includes("Save loaded")) {
        await interaction.editReply(`Loaded save.`);
        return;
    } else if (result.includes("Already hosting")) {
        await interaction.editReply("Could not import; the server is already hosting a map. Use `/stop` to stop hosting.");
    } else {
        await interaction.editReply("An error occurred & the save was likely not successfully loaded.");
        return;
    }
};

module.exports = {
    execute,
    info: new SlashCommandBuilder()
        .setName("import")
        .setDescription("Imports & hosts a save from a file in '.msav' format.")
        .addAttachmentOption(option =>
            option.setName("file")
                .setDescription("The file to import.")
                .setRequired(true),
        ),

};