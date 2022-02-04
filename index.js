const fs = require("fs")
const Discord = require("discord.js")

// load config.json if exists
// eslint-disable-next-line import/no-unresolved
const config = fs.existsSync("./config.json") ? require("./config.json") : {}
// load discord token from config or env
const token = config.DISCORD_TOKEN || process.env.DISCORD_TOKEN

const client = new Discord.Client()

client.login(token)
