const mserver = require("../mserver.js");

let execute = function(ARGUMENTS) {
    if (ARGUMENTS[1]) {
        return mserver.write_recv(`host ${ARGUMENTS[1]}`)
            .then(result => {
                if (result.includes("Loading map")) {
                    return `Hosting map. \`\`\`js\n${result} \`\`\` `;
                } else if (result.includes("Already hosting")) {
                    return `**An error occured.** The server may be already hosting a map. \`\`\`js\n${result} \`\`\` `;
                } else {
                    return `**An error occured.** Did you misspell the map name? \`\`\`js\n${result} \`\`\` `;
                }
            });
    } else {
        return mserver.write_recv("host")
            .then(result => {
                if (result.includes("Randomized next map")) {
                    return `Hosting random map. \`\`\`js\n${result} \`\`\` `;
                } else {
                    return `An error occured. \`\`\`js\n${result} \`\`\` `;
                }
            });
    }


};

module.exports = {
    execute,
    info: {
        name: "host",
        descrip: "Hosts a new map. Randomly selected if map name not given. See `b maps` for a list.",
        longDescrip: `Hosts a map. The map is randomly selected if a map is not given as an argument. See \`<prefix> maps\` for a list. 
            Note that if the server is already hosting a map, it will return an error.  Stop the server with \`<prefix> stop\` *first* before using \`host\`.`,

    }
};