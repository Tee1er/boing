// TODO: Commands refactor

const fs = require("fs");
const Discord = require('discord.js');
const servermgr = require("./server-mgr");
const client = new Discord.Client();
const path = require("path");
const axios = require("axios");
const chalk = require("chalk");

let commands : {};

function AddCommand(name: string, command: () => void) {

}