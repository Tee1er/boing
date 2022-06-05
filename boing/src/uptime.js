let { setInterval } = require("timers");
const { saveSessionData, data, loadSessionData } = require("./globals");

function startUptimeTracking() {
    loadSessionData()
    setInterval(updateUptime, 60 * 10 * 1000); // 10m
}

function updateUptime() {
    data.SESSION_DATA.uptime.msRunning += 60 * 10 * 1000; // 10m
    saveSessionData()
}

module.exports = {
    startUptimeTracking,
}