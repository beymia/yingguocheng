/*
 * 简易封装模拟测试请求
 * */
function ajax(url, data = {}, method = 'GET', h) {
	// TODO 生产环境需要替换默认的URL地址

	let header = {};


	h && (header['token'] = getApp().globalData.userToken)

	header['Content-Type'] = 'application/x-www-form-urlencoded'

	let baseURL = 'http://api.plg.wugee.net'
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + url,
			data,
			method,
			header,
			success(result) {
				if (result.statusCode !== 200) reject(result)
				resolve(result.data)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

module.exports = ajax
