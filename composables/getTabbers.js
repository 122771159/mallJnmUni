import pages from "@/pages.json"
export function getTabbers() {
	const tabBar = pages.tabBar
	const list = tabBar.list.map((item) => {
		return {...item, pagePath:`/${item.pagePath}`,go(){
			uni.switchTab({
				url:`/${item.pagePath}`
			})
		}}
	})
	const res = {}
	list.forEach((item) => {
		res[item.name] = item
	})
	return res;
}