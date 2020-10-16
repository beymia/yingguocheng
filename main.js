import Vue from 'vue'
import App from './App'
import store from './store'
import VueJsonp from 'vue-jsonp'

console.log(VueJsonp);
//數據為空時展示
import noMoreData from "./components-lk/noMoreData/noMoreData";

Vue.component('noMoreData', noMoreData)

Vue.prototype.imgSrc = 'http://publicfile.wugee.net'
//通用的提示處理
Vue.prototype.customToast = function (title = '出現了錯誤', clear= true) {
  clear && uni.hideLoading()
  uni.showToast({
    title,
    icon: 'none'
  })
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()