const { get } = require("axios");

let execute = async function() {
    let response = await get("https://api.ipify.org", {params: {format:"json"}});
    
    return `The server's IP is **${response.data.ip}**`;
};

module.exports = {
    execute,
    info: {
        name: "ip",
        descrip: "Provides the IP of the server.",
        longDescrip: "Provides the IP of the server. This does *not* guarantee proper functionality."
    }
};