(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-more-more"],{"1fd4":function(t,n,e){var i=e("97c3");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=e("4f06").default;r("1a0b431c",i,!0,{sourceMap:!1,shadowMode:!1})},"2a10":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={name:"optionsList",props:{list:{type:Array,required:!0},head:{type:Boolean,default:!1},foot:{type:Boolean,default:!1},border:{type:Boolean,default:!1},height:{type:String,default:""}}};n.default=i},"2a36":function(t,n,e){"use strict";e.r(n);var i=e("cd5f"),r=e("735b");for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);e("cc3e");var o,s=e("f0c5"),c=Object(s["a"])(r["default"],i["b"],i["c"],!1,null,"0250074b",null,!1,i["a"],o);n["default"]=c.exports},"2e11":function(t,n,e){"use strict";var i=e("4ea4");e("99af"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=i(e("6c4b")),a={name:"more",data:function(){return{options:[{title:"個人資料",icon:"arrowright"}]}},methods:{navPage:function(t){var n=t.page;switch(n){case"個人資料":n="profile";break}uni.navigateTo({url:"/pages/".concat(n,"/").concat(n)})}},components:{optionsList:r.default}};n.default=a},3512:function(t,n,e){"use strict";e.r(n);var i=e("2a10"),r=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=r.a},"6c4b":function(t,n,e){"use strict";e.r(n);var i=e("8520"),r=e("3512");for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);e("cbfc");var o,s=e("f0c5"),c=Object(s["a"])(r["default"],i["b"],i["c"],!1,null,"15dfadba",null,!1,i["a"],o);n["default"]=c.exports},"735b":function(t,n,e){"use strict";e.r(n);var i=e("2e11"),r=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=r.a},8520:function(t,n,e){"use strict";e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var i={uniIcons:e("72bc").default},r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"options_list"},[t.head?e("v-uni-view",{staticClass:"head"},[t._t("head")],2):t._e(),e("v-uni-view",{staticClass:"items",style:{height:t.height||"100%"}},t._l(t.list,(function(n,i){return e("v-uni-view",{key:i,class:["list_item",t.border?"border-bottom":""],style:{height:t.height||"100%"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$emit("options-click",{page:n.title})}}},[e("v-uni-text",{staticClass:"title"},[t._v(t._s(n.title))]),n.summary?e("v-uni-text",{staticClass:"summary"},[t._v(t._s(n.summary))]):t._e(),n.right?e("v-uni-text",{staticClass:"right"},[t._v(t._s(n.right))]):t._e(),n.icon?e("uni-icons",{staticClass:"icon",staticStyle:{display:"inline-block","vertical-align":"middle"},attrs:{type:n.icon,size:"30",color:"#cccccc"}}):t._e()],1)})),1),t.foot?e("v-uni-view",{staticClass:"foot"},[t._t("foot")],2):t._e()],1)},a=[]},"97c3":function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 英国城自定义 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*通用字体属性*/\r\n/*margin或者padding值*/\r\n/*默认整体的背景色*/\r\n/*默认的局部主题色*/.options_list[data-v-15dfadba]{width:100%;height:100%}.options_list .items[data-v-15dfadba]{width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:space-around;justify-content:space-around}.options_list .items .list_item[data-v-15dfadba]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.options_list .items .list_item.border-bottom[data-v-15dfadba]{border-bottom:%?1?% solid #ccc}.options_list .items .list_item .title[data-v-15dfadba]{font-size:%?28?%;color:#333}.options_list .items .list_item .summary[data-v-15dfadba]{font-size:%?24?%;color:#ccc;margin-left:auto}.options_list .items .list_item .icon[data-v-15dfadba]{margin-left:%?10?%}',""]),t.exports=n},cbfc:function(t,n,e){"use strict";var i=e("1fd4"),r=e.n(i);r.a},cc3e:function(t,n,e){"use strict";var i=e("fd62"),r=e.n(i);r.a},cd5f:function(t,n,e){"use strict";var i;e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"more"},[e("optionsList",{attrs:{height:"100rpx",border:!0,list:t.options},on:{"options-click":function(n){arguments[0]=n=t.$handleEvent(n),t.navPage.apply(void 0,arguments)}}})],1)},a=[]},e9ff:function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 英国城自定义 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*通用字体属性*/\r\n/*margin或者padding值*/\r\n/*默认整体的背景色*/\r\n/*默认的局部主题色*/.more[data-v-0250074b]{width:100%;padding:0 %?24?%;-webkit-box-sizing:border-box;box-sizing:border-box}',""]),t.exports=n},fd62:function(t,n,e){var i=e("e9ff");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=e("4f06").default;r("32488221",i,!0,{sourceMap:!1,shadowMode:!1})}}]);