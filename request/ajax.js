/*
* 简易封装模拟测试请求
* */
function ajax(url, data = {}, method = 'get', header) {
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      data,
      method,
      header:method==='post'?{'Content-type':'application/json'}:{},
      success(result) {
        resolve(result.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

module.exports = ajax