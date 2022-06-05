const { data, loadSettings, loadSessionData, COMMANDS_DIR, saveSessionData } = require("./globals");

function checkScore(gameOverText) {
    const wave = gameOverText.match(/wave (\d+)/)[1];
    const map = gameOverText.match(/map (.+)./)[1];

    loadSessionData()

    let score = {
        wave: wave,
        date: new Date(),
    }

    if (!data.SESSION_DATA.highScores) {
        data.SESSION_DATA.highScores = {};
    }
    if (!data.SESSION_DATA.highScores[map] || wave >= data.SESSION_DATA.highScores[map].wave) {
        data.SESSION_DATA.highScores[map] = score
    }

    saveSessionData()
}

module.exports = {
    checkScore,
}