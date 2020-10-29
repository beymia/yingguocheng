import Vue from 'vue'
import App from './App'
import store from './store'
import {VueJsonp} from 'vue-jsonp'

Vue.use(VueJsonp)
//极其简单的数据为空时展示的页面
import noMoreData from "./components-lk/noMoreData/noMoreData";

Vue.component('noMoreData', noMoreData)

Vue.prototype.imgSrc = 'http://publicfile.wugee.net';
//全局过滤器，解决小程序全局属性不可用
Vue.filter('filterImg',function(src){
  return 'http://publicfile.wugee.net' + src
})

//通用的提示處理
Vue.prototype.customToast = function (title = '出現了錯誤', clear = true) {
  clear && uni.hideLoading()
  uni.showToast({
    title,
    icon: 'none'
  })
}
/**
 * 获取组件的布局信息,兼容小程序需要异步调用
 * @param name id或class类名
 */
Vue.prototype.getLayoutInfo = function (name) {
  let query
  return new Promise((resolve, reject) => {
    // #ifndef MP
    query = uni.createSelectorQuery().in(this);
    // #endif
    // #ifdef MP
    query = uni.createSelectorQuery();
    // #endif
    query.select(name).boundingClientRect(data => {
      data ? resolve(data) : reject(data);
    }).exec();
  })
}

/**
 * uni通用的异步支付函數
 * @param orderInfo 必传，切符合规范
 * @param provider 支付服务商
 * @returns {Promise<unknown>} promise对象
 */
Vue.prototype.utilPayment = async function (orderInfo, provider = 'wxpay') {
  //提取支付所需的信息
  let {signType, paySign, timeStamp, nonceStr} = orderInfo;

  return new Promise((resolve, reject) => {
    //微信支付
    // #ifdef MP-WEIXIN
    uni.requestPayment({
      provider,
      orderInfo,
      timeStamp,
      nonceStr,
      package: orderInfo.package,
      signType,
      paySign,
      success(s) {
        resolve(s)
      },
      //支付失败
      fail(e) {
        console.log(e);
        reject(e)
      },
    })
    // #endif

    // #ifdef APP-PLUS
    orderInfo.partnerid = '1541769301';
    //支付所需字段名转换为小写
    orderInfo = Object.keys(orderInfo).reduce((arr,key)=>{
      arr[key.toLowerCase()] = orderInfo[key]
      return arr
    },{})
    console.log(orderInfo);
    uni.requestPayment({
      provider,
      orderInfo:JSON.stringify(orderInfo),
      success(res){
        resolve(res)
      },
      fail(e){
        console.log(e);
        console.log(orderInfo);
        uni.showModal({
          content:JSON.stringify(e)
        })
        reject(e);
      },
      complete(e){
        console.log(e);
      }
    })
    // #endif
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()