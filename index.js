// imports
const fs = require("fs")
const Discord = require("discord.js")

// load config.json if exists
// eslint-disable-next-line import/no-unresolved
const config = fs.existsSync("./config.json") ? require("./config.json") : {}
// load discord token from config or env
const token = config.DISCORD_TOKEN || process.env.DISCORD_TOKEN

// create new discord client with token
const client = new Discord.Client()

// intercept discord events

// on error display formated error
// eslint-disable-next-line no-console
client.on("error", (err) => console.error(`Error: ${err.message}`))

// log when discord client is ready
// eslint-disable-next-line no-console
client.on("ready", () => console.log(`Logged in as ${client.user.tag}!`))

// for each message process
client.on("message", (msg) => {
	// ignore messages from bots
	if (msg.author.bot) return
	// get text from message
	const text = msg.content.toLowerCase()
	// eslint-disable-next-line no-console
	console.log(text)
})

// start discord client by login with token
client.login(token)
