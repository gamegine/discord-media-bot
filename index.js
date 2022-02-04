// imports
const fs = require("fs")
const Discord = require("discord.js")
const { getUrls, moduleImportAll } = require("./functions")
// import all modules and log imported modules
const modules = moduleImportAll(`${__dirname}/modules`)
// eslint-disable-next-line no-console
modules.forEach((module) => console.info(`imported module: ${module.file}`))

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
	// get urls from text
	const urls = getUrls(text)
	// if no urls found ignore message
	if (!urls.length) return
	// if no modules processinng ignore message
	if (!modules.length) return
	// init all modules onUrls function and add it to promise chain
	const promises = modules.map((module) => module.module.onUrls(urls))
	// run all onUrls promises
	Promise.all(promises)
		.then((results) => {
			// merge all results into one
			const json = results.reduce((acc, result) => ({ ...acc, ...result }))
			// reply to discord with json data
			msg
				.reply(json.urls, { files: json.files })
				.then(() => {})
				.catch((e) => console.error("error discord reply :", e))
		})
		.catch((e) => console.error("error modules onUrls : ", e))
})

// start discord client by login with token
client.login(token)
