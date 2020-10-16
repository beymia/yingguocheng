import Vue from 'vue'
import App from './App'
import store from './store'
import {VueJsonp} from 'vue-jsonp'
Vue.use(VueJsonp)
//數據為空時展示
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
  return new Promise((resolve, reject) => {
    /* #ifndef MP*/
    let query = uni.createSelectorQuery().in(this);
    /* #endif*/
    /* #ifdef MP*/
    let query = uni.createSelectorQuery();
    /* #endif*/
    query.select(name).boundingClientRect(data => {
      data ? resolve(data) : reject(data);
    }).exec();
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()