/*
* 简易封装模拟测试请求
* */
function ajax(url, data = {}, method = 'get', header) {
    return new Promise((resolve, reject) => {
        uni.request({
            url,
            data,
            method,
            header,
            success(result) {
                resolve(result)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

module.exports = ajax