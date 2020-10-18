import Vue from 'vue'
import App from './App'
import store from './store'
import {VueJsonp} from 'vue-jsonp'

Vue.use(VueJsonp)
//极其简单的数据为空时展示的页面
import noMoreData from "./components-lk/noMoreData/noMoreData";

Vue.component('noMoreData', noMoreData)

Vue.prototype.imgSrc = 'http://publicfile.wugee.net'

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
 * @returns {Promise<unknown>} promise对象
 */
Vue.prototype.utilPayment = async function (orderInfo) {
  //提取支付所需的信息
  let {signType, paySign, timeStamp, nonceStr} = orderInfo;

  return new Promise((resolve,reject)=>{
    //获取服务供应商
    uni.getProvider({
      service: 'payment',
       success(res) {
        let provider = res.provider[0];
        //微信支付
        if (provider === 'wxpay') {
          //发起支付
          uni.requestPayment({
            provider: provider,
            orderInfo,
            timeStamp,
            nonceStr,
            package: orderInfo.package,
            signType,
            paySign,
            //支付成功
            success(s) {
              resolve(s)
            },
            //支付失败
            fail(e) {
              reject(e)
            },
          })
        }
      },
      //服务供应商获取失败
      fail(e){
        reject(e)
      }
    })
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()