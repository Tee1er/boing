const fs = require('fs');
const axios = require('axios');
const { data, SERVER_JAR, saveSessionData, SERVER_DIR } = require('./globals');

let get_server = async function() {
    if (!fs.existsSync(SERVER_DIR)) fs.mkdirSync(SERVER_DIR, { recursive: true });

    const release_metadata = await axios.get(data.SETTINGS.serverResource, { responseType: "json" })
        .then(res => res.data)
        .catch(err => console.error(err));

    if ((!fs.existsSync(SERVER_JAR)) || fs.readFileSync(SERVER_JAR) == "" || data.SESSION_DATA.server_release_id != release_metadata.id) {
        console.log(`Mindustry server not found or different from latest release. Fetching latest release from ${data.SETTINGS.serverResource}...`);

        // console.log(release_metadata);
        const server_release = release_metadata["assets"].find(elem => elem["name"].toLowerCase().includes("server"));

        await axios.get(server_release["browser_download_url"], { responseType: "arraybuffer" })
            .then(result => {
                let data = Buffer.from(result.data);
                fs.writeFileSync(SERVER_JAR, data, { encoding: null });
            });

        // Write server download metadata for future runs
        data.SESSION_DATA["server_release_id"] = release_metadata["id"];
        saveSessionData();
        console.log(`\nSuccessfully downloaded latest release of Mindustry server (${server_release.name}).`);
    }
};

module.exports = { get_server };