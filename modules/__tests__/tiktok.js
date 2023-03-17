/* eslint-disable no-unused-vars */
// todo: Unsupported tiktok shortlink URL (requires a fetch/redirect to find the real id)
const fs = require("fs")
// eslint-disable-next-line import/no-extraneous-dependencies
global.fetch = require("node-fetch")
const { filterTiktok, downloadTiktok } = require("../tiktok")

// skip time consuming test case for CI
const testIfIntegration = process.env.IntegrationTests ? test : test.skip

const url = "https://www.tiktok.com/@im_nukezztoo/video/7056230663942360366"
// const shorturl = "https://vm.tiktok.com/ZMLNapU6C/" // todo: Unsupported tiktok shortlink

describe("module tiktok", () => {
	describe("filterTiktok", () => {
		test("no tiktok url", () => {
			expect(filterTiktok(["http://test.com", "http://hi.com"])).toEqual([])
		})
		test("no tiktok", () => {
			expect(filterTiktok(["http://test.com", "http://hi.com"])).toEqual([])
		})
		test("tiktok url", () => {
			expect(filterTiktok(["http://test.com", url, "http://hi.com"])).toEqual([
				url,
			])
		})
		// todo: Unsupported short url
		// test("tiktok short url", () => {
		// 	expect(
		// 		filterTiktok(["http://test.com", shorturl, "http://hi.com"])
		// 	).toEqual([shorturl])
		// })
	})
	// describe("downloadTiktok", () => {
	// 	testIfIntegration("get url", async () => {
	// 		const videoPath = await downloadTiktok(url)
	// 		console.log(videoPath) // async fail
	// 		// check if file exists
	// 		expect(fs.existsSync(videoPath)).toBeTruthy()
	// 	})
	// })
})
