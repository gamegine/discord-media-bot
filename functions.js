/**
 * parse url from text
 * @param  {String} text
 * @return {Array} urls
 */
function getUrls(text) {
	const urlRegex = /(https?:\/\/[^\s]+)/g
	return text.match(urlRegex) || []
}

// export functions
module.exports = { getUrls }
