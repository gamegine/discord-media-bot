// todo: Unsupported tiktok shortlink URL (requires a fetch/redirect to find the real id)
const { createWriteStream } = require("fs")
const { pipeline } = require("stream/promises")

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
 * @param  {} url http file url
 * @param  {} path download file path
 */
const downloadFile = async (url, path) =>
	pipeline((await fetch(url)).body, createWriteStream(path))

/**
 * @param  {} tiktokId tiktok video id
 * @returns Promise of download video url
 */
function getVideoRAWUrl(tiktokId) {
	return new Promise((resolve) => {
		// fetch(`https://m.tiktok.com/api/item/detail/?itemId=${tiktokId}`)
		// 	.then((response) => {
		// 		// 	response.status_code,
		// 		// 	response.itemInfo.itemStruct.id,
		// 		// 	response.itemInfo.itemStruct.video.playAddr
		// const API_URL = `https://api19-core-useast5.us.tiktokv.com/aweme/v1/feed/?aweme_id=${idVideo}&version_code=262&app_name=musical_ly&channel=App&device_id=null&os_version=14.4.2&device_platform=iphone&device_type=iPhone9`
		const API_URL = `https://tiktokv.com/aweme/v1/feed/?aweme_id=${tiktokId}`
		fetch(API_URL, {
			method: "GET",
			headers: {
				"User-Agent":
					"TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				// console.log(res.aweme_list[0].video.play_addr.url_list[0])
				resolve(res.aweme_list[0].video.play_addr.url_list[0])
			})
	})
}

/**
 * @param  {} tiktokUrl tiktok url format https://www.tiktok.com/<user>/video/<id>
 * @returns downloaded file path
 */
function downloadTiktok(tiktokUrl) {
	// get id https://www.tiktok.com/<user>/video/<id>
	const id = tiktokUrl.split("/").pop().split("?").shift()
	// output directory from env or default to current directory
	const outputDir = process.env.DOWNLOAD_DIR || "."
	const output = `${outputDir}/tiktok-${id}.mp4`
	return new Promise((resolve) => {
		getVideoRAWUrl(id)
			.then((url) => downloadFile(url, output))
			.then(resolve(output))
	})
}

/**
 * process tiktok video download and return downloader files path in json {files}
 * @param {Array} urls
 * @returns {Array} downloaded files path in json {files}
 */
function onUrls(urls) {
	const tiktokUrls = filterTiktok(urls)
	if (tiktokUrls.length === 0) return Promise.resolve({})
	// download all tiktok videos
	const tasks = tiktokUrls.map(downloadTiktok)
	return Promise.all(tasks).then((files) => ({ files }))
}

// exports module functions
module.exports = { filterTiktok, onUrls, downloadTiktok, getVideoRAWUrl }
