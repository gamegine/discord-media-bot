const fs = require("fs")

/**
 * parse url from text
 * @param  {String} text
 * @return {Array} urls
 */
function getUrls(text) {
	// if no arg return empty array
	if (!text) return []
	// regex to find urls
	const urlRegex = /(https?:\/\/[^\s]+)/g
	// get all urls from text
	return text.match(urlRegex) || []
}

/**
 * import '*.js' files from directory as array of modules
 * ex ./dir -> test.js => [{file:"test.js": module: require("./dir/test.js")}]
 * @param  {String} dir
 */
function moduleImportAll(dir) {
	// create an array to store all modules
	const modules = []
	// return if dir input is unvalid
	if (!fs.existsSync(dir) || !fs.lstatSync(dir).isDirectory()) return modules
	// get all files in dir
	const files = fs.readdirSync(dir)
	// loop through all files
	files.forEach((file) => {
		// if file is a js file
		if (file.endsWith(".js")) {
			// import the file as a module
			// eslint-disable-next-line import/no-dynamic-require, global-require
			const module = require(`${dir}/${file}`)
			// add the module to the array
			modules.push({ file, module })
		}
	})
	// return the array
	return modules
}

// export functions
module.exports = { getUrls, moduleImportAll }
