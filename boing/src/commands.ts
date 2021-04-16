// TODO: Commands refactor

import fs = require("fs");
import Discord = require('discord.js');
import servermgr = require("./server-mgr");
const client = new Discord.Client();
import path = require("path");
import axios = require("axios");
import chalk = require("chalk");

let commands : {};

function AddCommand(name: string, command: () => void): void {
}