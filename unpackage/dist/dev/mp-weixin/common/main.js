(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],[
/*!***********************************************************!*\
  !*** C:/Users/Administrator/Desktop/yingguocheng/main.js ***!
  \***********************************************************/
/*! no static exports found */function(e,t,n){"use strict";(function(e,t){var o=c(n(/*! ./node_modules/@babel/runtime/regenerator */4));n(/*! uni-pages */7);var r=c(n(/*! vue */2)),u=c(n(/*! ./App */8)),i=c(n(/*! ./store */14)),a=n(/*! vue-jsonp */16);function c(e){return e&&e.__esModule?e:{default:e}}function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e,t,n,o,r,u,i){try{var a=e[u](i),c=a.value}catch(f){return void n(f)}a.done?t(c):Promise.resolve(c).then(o,r)}function d(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var u=e.apply(t,n);function i(e){p(u,o,r,i,a,"next",e)}function a(e){p(u,o,r,i,a,"throw",e)}i(void 0)}))}}r.default.use(a.VueJsonp);var v=function(){n.e(/*! require.ensure | components-lk/noMoreData/noMoreData */"components-lk/noMoreData/noMoreData").then(function(){return resolve(n(/*! ./components-lk/noMoreData/noMoreData */320))}.bind(null,n)).catch(n.oe)};r.default.component("noMoreData",v),r.default.prototype.imgSrc="http://publicfile.wugee.net",r.default.filter("filterImg",(function(e){return"http://publicfile.wugee.net"+e})),r.default.prototype.customToast=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"出現了錯誤",n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];n&&e.hideLoading(),e.showToast({title:t,icon:"none"})},r.default.prototype.getLayoutInfo=function(t){var n;return new Promise((function(o,r){n=e.createSelectorQuery(),n.select(t).boundingClientRect((function(e){e?o(e):r(e)})).exec()}))},r.default.prototype.utilPayment=function(){var t=d(o.default.mark((function t(n){var r,u,i,a,c,f=arguments;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=f.length>1&&void 0!==f[1]?f[1]:"wxpay",u=n.signType,i=n.paySign,a=n.timeStamp,c=n.nonceStr,t.abrupt("return",new Promise((function(t,o){e.requestPayment({provider:r,orderInfo:n,timeStamp:a,nonceStr:c,package:n.package,signType:u,paySign:i,success:function(e){t(e)},fail:function(e){console.log(e),o(e)}})})));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),r.default.config.productionTip=!1,u.default.mpType="app";var g=new r.default(l({store:i.default},u.default));t(g).$mount()}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"],n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["createApp"])},,,,,,,
/*!***********************************************************!*\
  !*** C:/Users/Administrator/Desktop/yingguocheng/App.vue ***!
  \***********************************************************/
/*! no static exports found */,function(e,t,n){"use strict";n.r(t);var o=n(/*! ./App.vue?vue&type=script&lang=js& */9);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n(/*! ./App.vue?vue&type=style&index=0&lang=scss& */11);var u,i,a,c,f=n(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */13),l=Object(f["default"])(o["default"],u,i,!1,null,null,null,!1,a,c);l.options.__file="App.vue",t["default"]=l.exports},
/*!************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/yingguocheng/App.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */10),r=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=r.a},
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/yingguocheng/App.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(/*! ./node_modules/@babel/runtime/regenerator */4));function r(e){return e&&e.__esModule?e:{default:e}}function u(e,t,n,o,r,u,i){try{var a=e[u](i),c=a.value}catch(f){return void n(f)}a.done?t(c):Promise.resolve(c).then(o,r)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var i=e.apply(t,n);function a(e){u(i,o,r,a,c,"next",e)}function c(e){u(i,o,r,a,c,"throw",e)}a(void 0)}))}}var a={globalData:{userToken:null,userInfo:{},isLoginBox:!1,isAuth:!0,wxUserInfo:{},goodsPayment:{},coupon:0,isForeseeBuy:!1,userAddresses:[],edit_address_id:{},choosed_address:{}},onLaunch:function(){var t=i(o.default.mark((function t(){var n;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.globalData.userToken=e.getStorageSync("token"),console.log("App Launch"),e.removeStorageSync("chatList"),n=this,t.next=6,e.getUserInfo({provider:"weixin",success:function(e){console.log(e.userInfo),n.globalData.wxUserInfo=e.userInfo,n.globalData.isAuth=!0},fail:function(){n.globalData.isAuth=!1}});case 6:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}(),onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};t.default=a}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},
/*!*********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/yingguocheng/App.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=scss& */12),r=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=r.a},
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/yingguocheng/App.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){}],[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map