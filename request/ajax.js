import {login, userSpace} from "./api";

function ajax(url, {data = {}, method = 'POST', isToken = true}) {

  // TODO 生产环境需要替换默认的URL地址

  let header = {};

  isToken && (header['token'] = getApp().globalData.userToken)

  header['Content-Type'] = 'application/x-www-form-urlencoded'
  let baseURL;
  // #ifdef H5
  baseURL = '/api'
  // #endif
  // #ifndef H5
  baseURL = 'https://api.plg.wugee.net'
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
  if (token && (h && result.data.msg === 'Token Error')) {
    uni.hideLoading()
    // #ifndef MP-WEIXIN
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
    // #endif

    // #ifdef MP-WEIXIN
	const APP = getApp().globalData
    uni.login({
      provider: "weixin",
      async success(wxCode) {
        try {
          APP.userToken = (await login({code: wxCode.code,})).data.token;
          uni.setStorageSync('token', APP.userToken)
        } catch (e) {
          console.log(e);
          APP.isLoginBox = true;
        }
      },
    });
    // #endif
  } else {
    //正常错误直接抛出
    reject(result)
  }
}

// var ws = new WebSocket('ws://api.plg.wugee.net:2000')
// ws.onopen = function(){
//   ws.send(JSON.stringify({'uid':'4545646'}))
//   ws.send(JSON.stringify({'uid':'4545646','to_uid':'12313',
//   'msg':'画江湖抵扣积分','created_at':'2020-11-02 18:36'}))
// }
// ws.onmessage = function(e){
//   console.log(e.data)
// }

module.exports = ajax
