const fs = require('fs');
const axios = require('axios');
const http = require('http'); // or 'https' for https:// URLs
const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args));

const SERVER_PATH = "../../server/server.jar";

let get_server = async function(release_url) {
    if ((!fs.existsSync(SERVER_PATH)) || fs.readFileSync(SERVER_PATH) == "") {
        console.log(`Mindustry server not found. downloading from ${release_url}...`);

        const release_metadata = await axios.get(release_url, { responseType: "json" })
            .then(res => res.data)
            .catch(err => console.error(err));

        // console.log(release_metadata);
        const server_dl_link = release_metadata["assets"].find(elem => elem["name"].toLowerCase().includes("server"))["browser_download_url"];

        await axios.get(server_dl_link, { responseType: "arraybuffer" })
            .then(result => {
                let data = Buffer.from(result.data);
                fs.writeFileSync(SERVER_PATH, data, { encoding: null });
            });
        console.log(`\nSuccessfully downloaded latest release of Mindustry server (${release_metadata.name}).`);
    }
}

module.exports = { get_server };