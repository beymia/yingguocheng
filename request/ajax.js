/*
 * 简易封装模拟测试请求
 * */
function ajax(url, {data={},method='POST',isToken=true}) {

  // TODO 生产环境需要替换默认的URL地址

  let header = {};

  isToken && (header['token'] = getApp().globalData.userToken)

  header['Content-Type'] = 'application/x-www-form-urlencoded'
  let baseURL;
  // #ifdef H5
  baseURL = '/api'
  // #endif
  // #ifndef H5
  baseURL = 'http://api.plg.wugee.net'
  // #endif
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + url,
      data,
      method,
      header,
      success(result) {
        // TODO token错误
        if (result.statusCode !== 200 || result.data.code === 1001) {
          tokenError(isToken, result, reject)
          return;
        }
        resolve(result.data)
      },
      fail(err) {
        console.log('请求出错', err.data);
        reject(err)
      }
    })
  })
}

//本地存在token，并且请求的数据需要token！但错误信息为token错误时触发
function tokenError(h, result, reject) {
  let token = uni.getStorageSync('token')
  console.log(token);
  if (token && (h && result.data.msg === 'Token Error')) {
    uni.hideLoading()
    uni.showModal({
      title: '登陆状态失效!\n请重新登陆',
      success(res) {
        //点击确定跳转登录页
        if (res.confirm) {
          uni.navigateTo({
            url: '/pages/login/login',
          })
          return;
        }
        //点击取消，抛出错误
        reject(result)
      },
    })
  } else {
    //正常错误直接抛出
    reject(result)
  }
}

module.exports = ajax
