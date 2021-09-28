const fs = require("fs");
const axios = require("axios");
const http = require("http"); // or 'https' for https:// URLs
const colors = require("ansi-colors"); // Added some colors.

const SERVER_PATH = "../../server/";
const serverinfo_path = SERVER_PATH + "serverinfo.json";
const server_jar_path = SERVER_PATH + "server.jar";

let get_server = async function (release_url) {
    const release_metadata = await axios
        .get(release_url, { responseType: "json" })
        .then(res => res.data)
        .catch(err => console.error(err));

    const server_info = JSON.parse(fs.existsSync(serverinfo_path) ? fs.readFileSync(serverinfo_path) : "{}");

    if (!fs.existsSync(server_jar_path) || fs.readFileSync(server_jar_path) == "" || server_info.release_id != release_metadata.id) {
        console.log(colors.yellow(`Mindustry server not found or different from latest release. Fetching latest release from ${release_url}...`));

        // console.log(release_metadata);
        const server_release = release_metadata["assets"].find(elem => elem["name"].toLowerCase().includes("server"));

        await axios.get(server_release["browser_download_url"], { responseType: "arraybuffer" }).then(result => {
            let data = Buffer.from(result.data);
            fs.writeFileSync(server_jar_path, data, { encoding: null });
        });

        // Write server download metadata for future runs
        fs.writeFileSync(serverinfo_path, JSON.stringify({ release_id: release_metadata["id"] }));

        console.log(colors.green(`\nSuccessfully downloaded latest release of Mindustry server (${server_release.name}).`));
    }
};

module.exports = { get_server };
