(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-exchangeRecord-exchangeRecord"],{"07d1":function(e,t,r){var n=r("4772");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=r("4f06").default;a("6c1ee35f",n,!0,{sourceMap:!1,shadowMode:!1})},2668:function(e,t,r){"use strict";r.r(t);var n=r("82de"),a=r.n(n);for(var i in n)"default"!==i&&function(e){r.d(t,e,(function(){return n[e]}))}(i);t["default"]=a.a},"2c31":function(e,t,r){function n(e,t){var r,n=t.data,i=void 0===n?{}:n,o=t.method,c=void 0===o?"POST":o,d=t.isToken,s=void 0===d||d,u={};return s&&(u["token"]=getApp().globalData.userToken),u["Content-Type"]="application/x-www-form-urlencoded",r="/api",new Promise((function(t,n){uni.request({url:r+e,data:i,method:c,header:u,success:function(e){200===e.statusCode&&1001!==e.data.code?t(e.data):a(s,e,n)},fail:function(e){console.log("请求出错",e.data),n(e)}})}))}function a(e,t,r){var n=uni.getStorageSync("token");console.log(n),n&&e&&"Token Error"===t.data.msg?(uni.hideLoading(),uni.showModal({title:"登陆状态失效!\n请重新登陆",success:function(e){e.confirm?uni.navigateTo({url:"/pages/login/login"}):r(t)}})):r(t)}r("d3b7"),e.exports=n},"2da2":function(e,t,r){"use strict";r.r(t);var n=r("eee1"),a=r("2668");for(var i in a)"default"!==i&&function(e){r.d(t,e,(function(){return a[e]}))}(i);r("aa1d");var o,c=r("f0c5"),d=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"46065b20",null,!1,n["a"],o);t["default"]=d.exports},4772:function(e,t,r){var n=r("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 英国城自定义 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*通用字体属性*/\r\n/*margin或者padding值*/\r\n/*默认整体的背景色*/\r\n/*默认的局部主题色*/.record[data-v-46065b20]{width:100%;min-height:100vh;background-color:#f5f5f5;padding:0 %?24?%;-webkit-box-sizing:border-box;box-sizing:border-box}.record .content[data-v-46065b20]{width:100%;font-size:%?22?%;color:#333}.record .content .head[data-v-46065b20]{height:%?90?%;padding:%?30?% 0;-webkit-box-sizing:border-box;box-sizing:border-box}.record .content .details[data-v-46065b20]{width:100%;background-color:#fff;padding:0 %?20?%;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-border-radius:%?20?%;border-radius:%?20?%}.record .content .details .item[data-v-46065b20]{width:100%;height:%?124?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.record .content .details .item.borderBottom[data-v-46065b20]{border-bottom:%?1?% solid hsla(0,0%,80%,.4)}.record .content .details .item uni-view[data-v-46065b20]:nth-child(1){font-size:%?24?%;color:#333;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:space-around;justify-content:space-around}.record .content .details .item uni-view:nth-child(1) uni-view[data-v-46065b20]:nth-child(2){font-size:%?20?%;color:#999}.record .content .details .item uni-view[data-v-46065b20]:nth-child(2){font-size:%?24?%;color:#17a1ff}',""]),e.exports=t},"82de":function(e,t,r){"use strict";var n=r("4ea4");r("99af"),r("4160"),r("ac1f"),r("1276"),r("159b"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,r("96cf");var a=n(r("1da1")),i=r("95b9"),o={data:function(){return{record:[],page:1}},mounted:function(){var e=this;return(0,a.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,i.exchangeRecord)({page:e.page});case 2:e.record=t.sent.data;case 3:case"end":return t.stop()}}),t)})))()},computed:{spliceData:function(){if(this.record){var e={},t=[];return this.record.forEach((function(r){t=r.created_at.split("/"),r.name="".concat(t[0],"年").concat(t[1],"月"),e[r.name]||(e[r.name]={name:r.name,data:[]}),e[r.name].data.push(r)})),e}}},onReachBottom:function(){var e=this;return(0,a.default)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,i.exchangeRecord)({page:++e.page});case 3:if(r=t.sent.data,r){t.next=7;break}throw--e.page,1;case 7:e.record=e.record.concat(r),console.log(e.record),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](0),e.customToast("没有更多数据了",!1);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})))()}};t.default=o},"95b9":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.giveForesee=t.mutualRecord=t.buyForesee=t.myForesee=t.foreseeList=t.receiveMsg=t.sendMsg=t.initChat=t.usedCoupon=t.paymentStart=t.createOrder=t.paymentAttach=t.memberRechargeInfo=t.msgCenter=t.rechargeRecord=t.receiveKnight=t.interestsPark=t.receivePack=t.monthPack=t.receiveLevel=t.levelPack=t.recharge=t.qrCode=t.expensesRecord=t.setPwd=t.discount=t.joinMember=t.userSpace=t.redeemGifts=t.pointsGoodsDetail=t.exchangeRecord=t.pointsDetails=t.convert=t.login=t.verifyCode=t.sendCheckCode=t.invoice=t.orderForm=t.tolk=void 0;var n=r("2c31"),a=function(e){return n("/config/talk",{data:e,isToken:!1})};t.tolk=a;var i=function(e){return n("/user/order",{data:e})};t.orderForm=i;var o=function(e){return n("/invoice-apply/create-apply",{data:e})};t.invoice=o;var c=function(e){return n("/sms/login-sms",{data:e,isToken:!1})};t.sendCheckCode=c;var d=function(e){return n("/sms/verify-sms",{data:e,isToken:!1})};t.verifyCode=d;var s=function(e){return n("/login/login",{data:e,isToken:!1})};t.login=s;var u=function(e){return n("/convert/list",{data:e})};t.convert=u;var f=function(e){return n("/record/integral-notes",{data:e})};t.pointsDetails=f;var v=function(e){return n("/integral/convert-record",{data:e})};t.exchangeRecord=v;var l=function(e){return n("/convert/detail",{data:e})};t.pointsGoodsDetail=l;var p=function(e){return n("/convert/convert",{data:e})};t.redeemGifts=p;var g=function(e){return n("/user/user-info",{data:e})};t.userSpace=g;var b=function(e){return n("/pay/service",{data:e})};t.joinMember=b;var h=function(e){return n("/ticket/tickets",{data:e})};t.discount=h;var m=function(e){return n("/user/setpwd",{data:e})};t.setPwd=m;var k=function(e){return n("/record/balance-notes",{data:e})};t.expensesRecord=k;var w=function(e){return n("/qr-code/user-code",{data:e})};t.qrCode=w;var x=function(e){return n("/pay/recharge",{data:e})};t.recharge=x;var y=function(e){return n("/grade/park-list",{data:e})};t.levelPack=y;var C=function(e){return n("/grade/receive-park",{data:e})};t.receiveLevel=C;var R=function(e){return n("/month/park-list",{data:e})};t.monthPack=R;var _=function(e){return n("/month/receive-park",{data:e})};t.receivePack=_;var P=function(e){return n("/interests/park-list",{data:e})};t.interestsPark=P;var T=function(e){return n("/interests/receive-park",{data:e})};t.receiveKnight=T;var M=function(e){return n("/record/service-notes",{data:e})};t.rechargeRecord=M;var j=function(e){return n("/msg-center/list",{data:e})};t.msgCenter=j;var z=function(e){return n("/config/recharge-level",{data:e})};t.memberRechargeInfo=z;var D=function(e){return n("/config/attach",{data:e,isToken:!1})};t.paymentAttach=D;var F=function(e){return n("/order/create-order",{data:e})};t.createOrder=F;var L=function(e){return n("/pay/pay",{data:e})};t.paymentStart=L;var S=function(e){return n("/ticket/suit-tickets",{data:e})};t.usedCoupon=S;var O=function(e){return n("/dialog/init-dialog",{data:e})};t.initChat=O;var A=function(e){return n("/dialog/send-msg",{data:e})};t.sendMsg=A;var q=function(e){return n("/dialog/latest-dialog",{data:e})};t.receiveMsg=q;var B=function(e){return n("/foreseeList-card/list",{data:e})};t.foreseeList=B;var G=function(e){return n("/foreseeList-card/my-card",{data:e})};t.myForesee=G;var E=function(e){return n("/foreseeList-card/pay-card",{data:e})};t.buyForesee=E;var I=function(e){return n("/foreseeList-card/my-gift",{data:e})};t.mutualRecord=I;var J=function(e){return n("/foresee-card/handsel-gift",{data:e})};t.giveForesee=J},aa1d:function(e,t,r){"use strict";var n=r("07d1"),a=r.n(n);a.a},eee1:function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return i})),r.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-uni-view",{staticClass:"record"},[e.spliceData&&0!==e.spliceData.length?e._l(e.spliceData,(function(t,n){return r("v-uni-view",{key:n,staticClass:"content"},[r("v-uni-view",{staticClass:"head"},[e._v(e._s(t.name))]),r("v-uni-view",{staticClass:"details"},e._l(t.data,(function(n,a){return r("v-uni-view",{key:n.id,class:["item",a!==t.data.length-1?"borderBottom":""]},[r("v-uni-view",[r("v-uni-view",[r("v-uni-text",[e._v(e._s(n.goods_name))])],1),r("v-uni-view",[r("v-uni-text",[e._v(e._s(n.created_at))])],1)],1),r("v-uni-view",[r("v-uni-text",[e._v(e._s("-"+n.barter_integral))])],1)],1)})),1)],1)})):r("noMoreData")],2)},i=[]}}]);