import {login, userSpace} from "./api";
/*
 * 简易封装模拟测试请求
 * */
function ajax(url, data = {}, method = 'GET', h) {
  // TODO 生产环境需要替换默认的URL地址

  let header = {};

  h && (header['token'] = getApp().globalData.userToken)

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
      method:method.toUpperCase(),
      header,
      success(result) {
		  if(result.statusCode == 200){
			  if (result.data.code == 1001 && result.data.msg == 'Token Error'){
				  // TODO token错误
				  tokenError(h, result, reject)
				  return;
			  }
			  resolve(result.data)
		  }else{
			  reject(result)
		  }
         
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
	  uni.login({
	    provider: "weixin",
	    async success(wxCode) {
	      try {
	        APP.userToken = (await login({code: wxCode.code,})).data.token;
	        uni.setStorageSync('token', APP.userToken)
	      } catch (e) {
	        console.log(e);
			uni.showModal({
			  title: '登陆状态失效!\n请重新登陆',
			  success(res) {
			    //点击确定跳转登录页
			    if (res.confirm) {
			      uni.navigateTo({
			        url: '/pages/login/login?from=order',
			      })
			      return;
			    }
			    //点击取消，抛出错误
			    reject(result)
			  },
			})
	      }
	    },
	  });
	  // #endif
    
  } else {
    //正常错误直接抛出
    reject(result)
  }
}

module.exports = ajax
