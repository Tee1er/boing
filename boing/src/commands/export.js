const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");


let execute = async function (interaction) {
    const mserver = require("../mserver.js");
    const crypto = require("crypto");
    const { resolve } = require("path");
    const { rm } = require("fs/promises");
    const { SERVER_CONFIG_DIR } = require("../globals.js");
    await interaction.deferReply();

    let fileName = `E-${crypto.randomBytes(4).toString("hex")}`;
    let result = await mserver.write_recv(`save ${fileName}`);
    if (result.includes("Not hosting")) {
        await interaction.editReply("Could not export; the server is not hosting a map.");
        return;
    }
    let attachment;
    let filePath = resolve(`${SERVER_CONFIG_DIR}/saves/${fileName}.msav`);
    if (interaction.options.getString("name")) {
        attachment = new AttachmentBuilder(filePath, { name: interaction.options.getString("name") + ".msav" });
    } else {
        attachment = new AttachmentBuilder(filePath, { name: fileName + ".msav" });
    }
    rm(filePath);

    interaction.editReply({ content: "Exported map.", files: [attachment] });
};

module.exports = {
    execute,
    info: new SlashCommandBuilder()
        .setName("export")
        .setDescription("Exports the current map to a file in '.msav' format.")
        .addStringOption(option =>
            option.setName("name")
                .setDescription("[optional] The name of the exported map.")
        ),

};