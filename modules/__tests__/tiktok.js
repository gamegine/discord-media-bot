// todo: Unsupported tiktok shortlink URL (requires a fetch/redirect to find the real id)
const fs = require("fs")
const { filterTiktok, getVideoMeta, downloadTiktok } = require("../tiktok")
const expectedVideoMeta = require("./__data__/expectedVideoMeta.json")

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
	describe("getVideoMeta", () => {
		testIfIntegration("get url", async () => {
			const meta = await getVideoMeta(url)
			// check static data
			expect(meta.id).toEqual(expectedVideoMeta.id)
			expect(meta.createTime).toEqual(expectedVideoMeta.createTime)
			expect(meta.videoMeta).toMatchObject(expectedVideoMeta.videoMeta)
			expect(meta.authorMeta.id).toEqual(expectedVideoMeta.authorMeta.id)
			// videoUrl not static
		})
		// todo: Unsupported short url
		// test("get shorturl", async () => {
		// 	const meta = await getVideoMeta(shorturl)
		// 	// check static data
		// 	expect(meta.id).toEqual(expectedVideoMeta.id)
		// 	expect(meta.createTime).toEqual(expectedVideoMeta.createTime)
		// 	expect(meta.videoMeta).toMatchObject(expectedVideoMeta.videoMeta)
		// 	expect(meta.authorMeta.id).toEqual(expectedVideoMeta.authorMeta.id)
		// 	// videoUrl not static
		// })
	})
	describe("downloadTiktok", () => {
		testIfIntegration("get url", async () => {
			const videoPath = await downloadTiktok(url)
			// check if file exists
			expect(fs.existsSync(videoPath)).toBeTruthy()
		})
	})
})
