(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-memberCode-memberCode"],{"02a7":function(e,t,r){"use strict";var n=r("2479"),a=r.n(n);a.a},"15af":function(e,t,r){"use strict";r.r(t);var n=r("94d7"),a=r.n(n);for(var i in n)"default"!==i&&function(e){r.d(t,e,(function(){return n[e]}))}(i);t["default"]=a.a},"1ce1":function(e,t,r){var n=r("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 英国城自定义 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*通用字体属性*/\r\n/*margin或者padding值*/\r\n/*默认整体的背景色*/\r\n/*默认的局部主题色*/.layer[data-v-3a78ff78]{width:100%;height:100vh;position:fixed;top:0;left:0;z-index:111111}.layer .masking[data-v-3a78ff78]{width:100%;height:100%;position:relative;top:0;left:0;background:rgba(0,0,0,.5);z-index:-1111}.layer .content[data-v-3a78ff78]{position:fixed;bottom:0;left:0}',""]),e.exports=t},2479:function(e,t,r){var n=r("5200");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=r("4f06").default;a("3c04cc89",n,!0,{sourceMap:!1,shadowMode:!1})},"2c31":function(e,t,r){function n(e,t){var r,n=t.data,i=void 0===n?{}:n,o=t.method,c=void 0===o?"POST":o,u=t.isToken,d=void 0===u||u,s={};return d&&(s["token"]=getApp().globalData.userToken),s["Content-Type"]="application/x-www-form-urlencoded",r="/api",new Promise((function(t,n){uni.request({url:r+e,data:i,method:c,header:s,success:function(e){200===e.statusCode&&1001!==e.data.code?t(e.data):a(d,e,n)},fail:function(e){console.log("请求出错",e.data),n(e)}})}))}function a(e,t,r){var n=uni.getStorageSync("token");console.log(n),n&&e&&"Token Error"===t.data.msg?(uni.hideLoading(),uni.showModal({title:"登陆状态失效!\n请重新登陆",success:function(e){e.confirm?uni.navigateTo({url:"/pages/login/login"}):r(t)}})):r(t)}r("d3b7"),e.exports=n},"365e":function(e,t,r){"use strict";r.r(t);var n=r("e10d"),a=r("15af");for(var i in a)"default"!==i&&function(e){r.d(t,e,(function(){return a[e]}))}(i);r("02a7");var o,c=r("f0c5"),u=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"6c4ae3e9",null,!1,n["a"],o);t["default"]=u.exports},"374e":function(e,t,r){"use strict";r("a9e3"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={name:"popUpLayer",props:{floor:{type:Number,default:999999}},methods:{}};t.default=n},5200:function(e,t,r){var n=r("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 英国城自定义 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*通用字体属性*/\r\n/*margin或者padding值*/\r\n/*默认整体的背景色*/\r\n/*默认的局部主题色*/uni-image[data-v-6c4ae3e9]{width:%?100?%;height:%?100?%}.member_code[data-v-6c4ae3e9]{width:100%;height:100vh;z-index:-1111}.member_code .content[data-v-6c4ae3e9]{width:100vw;height:%?984?%;background-color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.member_code .content .user_info[data-v-6c4ae3e9]{font-size:%?32?%;color:#000;margin-bottom:%?50?%;margin-top:%?-75?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.member_code .content .user_info uni-image[data-v-6c4ae3e9]{width:%?130?%;height:%?130?%;margin-bottom:%?10?%;vertical-align:middle}.member_code .content .payment[data-v-6c4ae3e9]{width:%?500?%;height:%?54?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;border-bottom:%?1?% solid #ccc;font-size:%?24?%;color:#000;margin-bottom:%?100?%}.member_code .content .payment uni-image[data-v-6c4ae3e9]{width:%?30?%;height:%?30?%;vertical-align:middle}.member_code .content .payment uni-view[data-v-6c4ae3e9]:nth-child(3){color:#999}.member_code .content .qr_code[data-v-6c4ae3e9]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.member_code .content .qr_code uni-view[data-v-6c4ae3e9]:nth-child(1){font-size:%?24?%;color:#000;margin-bottom:%?30?%}.member_code .content .qr_code uni-image[data-v-6c4ae3e9]{width:%?260?%;height:%?260?%;vertical-align:middle;margin-bottom:%?20?%}.member_code .content .qr_code uni-view[data-v-6c4ae3e9]:nth-child(3){font-size:%?22?%;color:#999}',""]),e.exports=t},"6a75":function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return i})),r.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-uni-view",{staticClass:"layer",style:{"z-index":e.floor}},[r("v-uni-view",{staticClass:"masking",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.$emit("mask-click")}}}),r("v-uni-view",{staticClass:"content"},[e._t("default")],2)],1)},i=[]},"80d4":function(e,t){e.exports="data:image/png;base64,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"},"94d6":function(e,t,r){"use strict";var n=r("fd1a"),a=r.n(n);a.a},"94d7":function(e,t,r){"use strict";var n=r("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,r("96cf");var a=n(r("1da1")),i=n(r("f009")),o=r("95b9"),c={data:function(){return{user:{},qrCodeData:"",isWallet:!1,timer:null}},onLoad:function(){var e=this;return(0,a.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.user=getApp().globalData.userInfo,t.next=4,e.QRcode();case 4:e.timer=setInterval((0,a.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.QRcode();case 2:console.log(1);case 3:case"end":return t.stop()}}),t)}))),3e4),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),e.customToast("會員碼獲取失敗");case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},methods:{QRcode:function(){var e=this;return(0,a.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,o.qrCode)({});case 2:e.qrCodeData=t.sent.data;case 3:case"end":return t.stop()}}),t)})))()}},onUnload:function(){console.log("定時器清除，onUnload"),clearInterval(this.timer),console.log(this.timer)},components:{popUpLayer:i.default}};t.default=c},"95b9":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.giveForesee=t.mutualRecord=t.buyForesee=t.myForesee=t.foreseeList=t.receiveMsg=t.sendMsg=t.initChat=t.usedCoupon=t.paymentStart=t.createOrder=t.paymentAttach=t.memberRechargeInfo=t.msgCenter=t.rechargeRecord=t.receiveKnight=t.interestsPark=t.receivePack=t.monthPack=t.receiveLevel=t.levelPack=t.recharge=t.qrCode=t.expensesRecord=t.setPwd=t.discount=t.joinMember=t.userSpace=t.redeemGifts=t.pointsGoodsDetail=t.exchangeRecord=t.pointsDetails=t.convert=t.login=t.verifyCode=t.sendCheckCode=t.invoice=t.orderForm=t.tolk=void 0;var n=r("2c31"),a=function(e){return n("/config/talk",{data:e,isToken:!1})};t.tolk=a;var i=function(e){return n("/user/order",{data:e})};t.orderForm=i;var o=function(e){return n("/invoice-apply/create-apply",{data:e})};t.invoice=o;var c=function(e){return n("/sms/login-sms",{data:e,isToken:!1})};t.sendCheckCode=c;var u=function(e){return n("/sms/verify-sms",{data:e,isToken:!1})};t.verifyCode=u;var d=function(e){return n("/login/login",{data:e,isToken:!1})};t.login=d;var s=function(e){return n("/convert/list",{data:e})};t.convert=s;var f=function(e){return n("/record/integral-notes",{data:e})};t.pointsDetails=f;var l=function(e){return n("/integral/convert-record",{data:e})};t.exchangeRecord=l;var v=function(e){return n("/convert/detail",{data:e})};t.pointsGoodsDetail=v;var p=function(e){return n("/convert/convert",{data:e})};t.redeemGifts=p;var m=function(e){return n("/user/user-info",{data:e})};t.userSpace=m;var g=function(e){return n("/pay/service",{data:e})};t.joinMember=g;var h=function(e){return n("/ticket/tickets",{data:e})};t.discount=h;var b=function(e){return n("/user/setpwd",{data:e})};t.setPwd=b;var k=function(e){return n("/record/balance-notes",{data:e})};t.expensesRecord=k;var w=function(e){return n("/qr-code/user-code",{data:e})};t.qrCode=w;var y=function(e){return n("/pay/recharge",{data:e})};t.recharge=y;var x=function(e){return n("/grade/park-list",{data:e})};t.levelPack=x;var A=function(e){return n("/grade/receive-park",{data:e})};t.receiveLevel=A;var R=function(e){return n("/month/park-list",{data:e})};t.monthPack=R;var C=function(e){return n("/month/receive-park",{data:e})};t.receivePack=C;var z=function(e){return n("/interests/park-list",{data:e})};t.interestsPark=z;var P=function(e){return n("/interests/receive-park",{data:e})};t.receiveKnight=P;var F=function(e){return n("/record/service-notes",{data:e})};t.rechargeRecord=F;var M=function(e){return n("/msg-center/list",{data:e})};t.msgCenter=M;var T=function(e){return n("/config/recharge-level",{data:e})};t.memberRechargeInfo=T;var j=function(e){return n("/config/attach",{data:e,isToken:!1})};t.paymentAttach=j;var E=function(e){return n("/order/create-order",{data:e})};t.createOrder=E;var U=function(e){return n("/pay/pay",{data:e})};t.paymentStart=U;var S=function(e){return n("/ticket/suit-tickets",{data:e})};t.usedCoupon=S;var q=function(e){return n("/dialog/init-dialog",{data:e})};t.initChat=q;var Z=function(e){return n("/dialog/send-msg",{data:e})};t.sendMsg=Z;var Q=function(e){return n("/dialog/latest-dialog",{data:e})};t.receiveMsg=Q;var D=function(e){return n("/foreseeList-card/list",{data:e})};t.foreseeList=D;var J=function(e){return n("/foreseeList-card/my-card",{data:e})};t.myForesee=J;var N=function(e){return n("/foreseeList-card/pay-card",{data:e})};t.buyForesee=N;var W=function(e){return n("/foreseeList-card/my-gift",{data:e})};t.mutualRecord=W;var G=function(e){return n("/foresee-card/handsel-gift",{data:e})};t.giveForesee=G},ad93:function(e,t,r){"use strict";r.r(t);var n=r("374e"),a=r.n(n);for(var i in n)"default"!==i&&function(e){r.d(t,e,(function(){return n[e]}))}(i);t["default"]=a.a},e10d:function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return i})),r.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"member_code"},[n("popUpLayer",{attrs:{floor:1}},[[n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"user_info"},[n("v-uni-image",{attrs:{src:r("80d4")}}),n("v-uni-view",[e._v(e._s(e.user.user_name))])],1),n("v-uni-view",{staticClass:"qr_code"},[n("v-uni-view",[e._v("此二维码可累计积分")]),n("v-uni-image",{attrs:{src:e.qrCodeData}}),n("v-uni-view",[e._v("会员码每30秒自动刷新一次")])],1)],1)]],2)],1)},i=[]},f009:function(e,t,r){"use strict";r.r(t);var n=r("6a75"),a=r("ad93");for(var i in a)"default"!==i&&function(e){r.d(t,e,(function(){return a[e]}))}(i);r("94d6");var o,c=r("f0c5"),u=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"3a78ff78",null,!1,n["a"],o);t["default"]=u.exports},fd1a:function(e,t,r){var n=r("1ce1");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=r("4f06").default;a("ee66df76",n,!0,{sourceMap:!1,shadowMode:!1})}}]);