const { filterTiktok } = require("../tiktok")

const url = "https://www.tiktok.com/@im_nukezztoo/video/7056230663942360366"
const shorturl = "https://vm.tiktok.com/ZMLNapU6C/" //
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
		test("tiktok short url", () => {
			expect(
				filterTiktok(["http://test.com", shorturl, "http://hi.com"])
			).toEqual([shorturl])
		})
	})
})
