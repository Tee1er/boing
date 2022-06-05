/*High scores*/

const mserver = require("../mserver.js")
const { data, saveSessionData, loadSessionData } = require("../globals")

let execute = async function (ARGUMENTS, message) {

};

module.exports = {
    execute,
    info: {
        name: "scoreboard",
        descrip: "Displays high scores.",
        longDescrip: "Displays the high scores for each map, with wave numbers and dates. " // TODO
    }
};