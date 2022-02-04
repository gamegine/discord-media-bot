const { getUrls } = require("../functions")

describe("get url from text", () => {
	test("no arg", () => {
		expect(getUrls()).toEqual([])
	})
	test("no url in text", () => {
		expect(getUrls(" test ")).toEqual([])
	})
	test("url", () => {
		expect(
			getUrls(
				"Create an invite-only place where you belong https://discord.com/ !"
			)
		).toEqual(["https://discord.com/"])
	})
	test("url http", () => {
		expect(getUrls("http://test.com")).toEqual(["http://test.com"])
	})
	test("url+", () => {
		expect(getUrls("hi https://discord.com/ and http://test.com")).toEqual([
			"https://discord.com/",
			"http://test.com",
		])
	})
})
