const fs = require('fs');
const { resolve, relative } = require('path');

const BASE_DIR = "../../";
const SRC_DIR = resolve(BASE_DIR, "boing/src/");
const BOING_DIR = resolve(BASE_DIR, "boing/");
const DATA_DIR = "../../data/";

const SETTINGS_FILE = resolve(DATA_DIR, "settings.json");
const DATA_FILE = resolve(DATA_DIR, "data.json");
const SERVER_DIR = resolve(DATA_DIR, "server/");
const SERVER_CONFIG_DIR = resolve(SERVER_DIR, "config/");
const SERVER_JAR = resolve(SERVER_DIR, "server.jar");

function loadSettings() {
    if (fs.existsSync(SETTINGS_FILE)) {
        module.exports.data.SETTINGS = JSON.parse(fs.readFileSync(SETTINGS_FILE));
    }
    console.log(`Loaded settings.`);
}

function saveSettings() { fs.writeFileSync(SETTINGS_FILE, JSON.stringify(module.exports.data.SETTINGS, null, 4)); }

function loadSessionData() {
    if (fs.existsSync(DATA_FILE))
        module.exports.data.SESSION_DATA = JSON.parse(fs.readFileSync(DATA_FILE));
    console.log("Loaded data.");
}

function saveSessionData() { fs.writeFileSync(DATA_FILE, JSON.stringify(module.exports.data.SESSION_DATA, null, 4)); }

// Save settings when boing shuts down
// process.on("beforeExit", () => {
//     saveSessionData();
//     saveSettings();
// });

module.exports = {
    // Variables

    data: {
        SETTINGS: {},
        SESSION_DATA: {},
    },

    // Save manipulation
    loadSessionData,
    loadSettings,
    saveSessionData,
    saveSettings,

    // Constants
    BASE_DIR,
    SRC_DIR,
    DATA_DIR,
    BOING_DIR,
    SETTINGS_FILE,
    DATA_FILE,
    SERVER_DIR,
    SERVER_CONFIG_DIR,
    SERVER_JAR,
};