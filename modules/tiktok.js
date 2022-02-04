/**
 * filter urls coressponding to tiktok video
 * @param {Array} urls
 * @returns {Array} tiktok video urls
 */
function filterTiktok(urls) {
	if (!urls) return []
	return urls.filter(
		(url) =>
			url.match(/^https?:\/\/www\.tiktok\.com\/@[^/]+\/video\/[^/]+$/) ||
			url.match(/^https?:\/\/vm\.tiktok\.com\/.+$/)
	)
}

/**
 * process tiktok video download and return downloader files path in json {files}
 * @param {Array} urls
 * @returns {Array} downloader files path in json {files}
 */
function onUrls(urls) {
	const tiktokUrls = filterTiktok(urls)
	return Promise.resolve({})
}

// exports module functions
module.exports = { filterTiktok, onUrls }
