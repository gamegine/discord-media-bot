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

// export functions
module.exports = { getUrls }
