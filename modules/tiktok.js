// todo: Unsupported tiktok shortlink URL (requires a fetch/redirect to find the real id)
const TikTokScraper = require("tiktok-scraper")
const got = require("got")
const fs = require("fs")

/**
 * filter urls coressponding to tiktok video
 * @param {Array} urls
 * @returns {Array} tiktok video urls
 */
function filterTiktok(urls) {
	if (!urls) return []
	return urls.filter(
		(url) => url.match(/^https?:\/\/www\.tiktok\.com\/@[^/]+\/video\/[^/]+$/) // ||
		// url.match(/^https?:\/\/vm\.tiktok\.com\/.+$/) // todo: Unsupported short url
	)
}

/**
 * get tiktok video meta
 * @param {String} urls
 * @returns {Array} PostCollector
 */
function getVideoMeta(url) {
	const headers = {
		"User-Agent": "BOB",
		Referer: "https://www.tiktok.com/",
		Cookie: "tt_webid_v2=BOB",
	}
	return TikTokScraper.getVideoMeta(url, headers).then(
		(data) => data.collector[0]
	)
}
/**
 * download tiktok video
 * @param {String} url
 * @returns {String} file path
 */
async function downloadTiktok(url) {
	const videoMeta = await getVideoMeta(url)
	// output directory from env or default to current directory
	const outputDir = process.env.DOWNLOAD_DIR || "."
	const output = `${outputDir}/tiktok-${videoMeta.videoId}.mp4`
	await new Promise((resolve, reject) => {
		got
			.stream(videoMeta.videoUrl, { headers: videoMeta.headers })
			.pipe(fs.createWriteStream(output))
			.on("finish", resolve)
			.on("error", reject)
	})
	return output
}

/**
 * process tiktok video download and return downloader files path in json {files}
 * @param {Array} urls
 * @returns {Array} downloader files path in json {files}
 */
function onUrls(urls) {
	const tiktokUrls = filterTiktok(urls)
	// download all tiktok videos
	const downloadstasks = tiktokUrls.map(downloadTiktok)
	return Promise.all(downloadstasks).then((files) => {
		// eslint-disable-next-line no-console
		console.log(`Downloaded ${tiktokUrls.length} tiktok videos`)
		// finaly return all downloaded files
		return { files }
	})
}

// exports module functions
module.exports = { filterTiktok, getVideoMeta, downloadTiktok, onUrls }
