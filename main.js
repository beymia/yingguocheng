import Vue from 'vue'
import App from './App'
import store from './store'

//數據為空時展示
import noMoreData from "./components-lk/noMoreData/noMoreData";
Vue.component('noMoreData',noMoreData)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
