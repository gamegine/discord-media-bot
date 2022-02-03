const Discord = require("discord.js")
const config = require("./config.json")

const client = new Discord.Client()

client.login(config.DISCORD_TOKEN)
