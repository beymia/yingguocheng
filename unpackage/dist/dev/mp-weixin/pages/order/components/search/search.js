(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/components/search/search"],{

/***/ 384:
/*!**********************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/work/develop/program/yingguocheng_git/yingguocheng/pages/order/components/search/search.vue ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _search_vue_vue_type_template_id_1de2f0e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search.vue?vue&type=template&id=1de2f0e0&scoped=true& */ 385);
/* harmony import */ var _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search.vue?vue&type=script&lang=js& */ 387);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _search_vue_vue_type_style_index_0_id_1de2f0e0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search.vue?vue&type=style&index=0&id=1de2f0e0&lang=scss&scoped=true& */ 389);
/* harmony import */ var _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 13);

var renderjs





/* normalize component */

var component = Object(_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _search_vue_vue_type_template_id_1de2f0e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _search_vue_vue_type_template_id_1de2f0e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1de2f0e0",
  null,
  false,
  _search_vue_vue_type_template_id_1de2f0e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/order/components/search/search.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 385:
/*!*****************************************************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/work/develop/program/yingguocheng_git/yingguocheng/pages/order/components/search/search.vue?vue&type=template&id=1de2f0e0&scoped=true& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_template_id_1de2f0e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./search.vue?vue&type=template&id=1de2f0e0&scoped=true& */ 386);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_template_id_1de2f0e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_template_id_1de2f0e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_template_id_1de2f0e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_template_id_1de2f0e0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 386:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/work/develop/program/yingguocheng_git/yingguocheng/pages/order/components/search/search.vue?vue&type=template&id=1de2f0e0&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  uniTransition: function() {
    return __webpack_require__.e(/*! import() | components/uni-transition/uni-transition */ "components/uni-transition/uni-transition").then(__webpack_require__.bind(null, /*! @/components/uni-transition/uni-transition.vue */ 553))
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 387:
/*!***********************************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/work/develop/program/yingguocheng_git/yingguocheng/pages/order/components/search/search.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./search.vue?vue&type=script&lang=js& */ 388);
/* harmony import */ var _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 388:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/work/develop/program/yingguocheng_git/yingguocheng/pages/order/components/search/search.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var uniTransition = function uniTransition() {__webpack_require__.e(/*! require.ensure | components/uni-transition/uni-transition */ "components/uni-transition/uni-transition").then((function () {return resolve(__webpack_require__(/*! @/components/uni-transition/uni-transition.vue */ 553));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default2 =



























































{
  name: 'search',
  components: {
    uniTransition: uniTransition },

  props: {
    show: {
      type: Boolean,
      default: false },

    categories: {
      type: Array,
      default: function _default() {return [];} } },


  data: function data() {
    return {
      tranStyles: {
        width: '100%',
        position: 'absolute',
        //
        // top: "69px",
        //
        //


        left: 0,
        bottom: 0,
        backgroundColor: '#fff',
        zIndex: 997 },

      hotSearch: [
      { id: 5, name: '黑糖波波希臘酸奶', price: 19, is_single: true, isHot: false, labels: ['含乳、燕麥、南瓜子仁'], materials: [], description: '黑糖脆波波與希臘酸奶靈感碰撞，酸奶部分無糖。選用100%生牛乳發酵，零添加我配附件哦机文件', images: ['/static/images_t/order/htbbxlsn_large.png', '/static/images_t/order/drmmgl_large.png'], imgurl: '/static/images_t/order/htbbxlsn.png' },
      { id: 6, name: '冷萃桂花綠', price: 9, is_single: true, isHot: false, labels: ['含茶'], materials: [], description: '冷萃茶不用等待叫號，可直接向店員出示後領取。細嫩茶芽與桂花壹同於冷露中为;为人家放假未发觉', images: ['/static/images_t/order/htbbxlsn_large.png', '/static/images_t/order/drmmgl_large.png'], imgurl: '/static/images_t/order/lcghl.png' },
      { id: 7, name: 'NFC桃桃汁', price: 25, is_single: true, isHot: false, labels: '', materials: [], description: '非濃縮還原，0脂肪，0添加劑，純粹鮮榨，不添加壹滴水。甜美水蜜桃鮮榨', images: ['/static/images_t/order/htbbxlsn_large.png', '/static/images_t/order/drmmgl_large.png'], imgurl: '/static/images_t/order/nfcttz.png' },
      { id: 8, name: '多肉芒芒甘露', price: 27, is_single: true, isHot: true, labels: ['含乳制品、茶'], materials: [], description: '冷/熱500ml 冷670ml 人氣top2經典茫茫與楊枝甘露的靈感碰撞，精選清幽綠茶', images: ['/static/images_t/order/htbbxlsn_large.png', '/static/images_t/order/drmmgl_large.png'], imgurl: '/static/images_t/order/drmmgl.png' }],

      historySearch: [
      { id: 1, name: '黑糖波波希臘酸奶', price: 19, is_single: false, isHot: false, labels: ['可做热饮', '含乳、燕麥、南瓜子仁'], materials: [{ "group_name": "餐具需要", "values": [{ "id": 1289, "name": "需要餐具", "price": "1", "is_selected": false }, { "id": 1289, "name": "不需要壹次性餐具", "price": "0", "is_selected": false }] }], description: '黑糖脆波波與希臘酸奶靈感碰撞，酸奶部分無糖。選用100%生牛乳發酵，零添加我配附件哦机文件', images: ['/static/images_t/order/htbbxlsn_large.png', '/static/images_t/order/drmmgl_large.png'], imgurl: '/static/images_t/order/htbbxlsn.png' },
      { id: 2, name: '冷萃桂花綠', price: 9, is_single: false, isHot: false, labels: ['可做热饮', '含茶'],
        materials: [
        { "group_name": "餐具需要", "values": [{ "id": 1289, "name": "需要餐具", "price": "1", "is_selected": false }, { "id": 1289, "name": "不需要壹次性餐具", "price": "0", "is_selected": false }] },
        { "group_name": "狀態", "values": [{ "id": 1289, "name": "冰沙（推薦）", "price": "1", "is_selected": false, "is_exclusive": true }, { "id": 1289, "name": "熱", "price": "1", "is_selected": false }, { "id": 1289, "name": "溫", "price": "1", "is_selected": false }] },
        { "group_name": "杯型", "values": [{ "id": 1289, "name": "標準杯（500ml）", "price": "1", "is_selected": false, "is_exclusive": true }, { "id": 1289, "name": "加大MAX杯（670ml）", "price": "1", "is_selected": false, "is_exclusive": true }] },
        { "group_name": "冰量", "values": [{ "id": 1289, "name": "正常（推薦）", "price": "1", "is_selected": false, "is_exclusive": true }, { "id": 1289, "name": "少冰", "price": "1", "is_selected": false, "is_exclusive": true }, { "id": 1289, "name": "少少冰", "price": "1", "is_selected": false, "is_exclusive": true }] }],
        description: '冷萃茶不用等待叫號，可直接向店員出示後領取。細嫩茶芽與桂花壹同於冷露中为;为人家放假未发觉', images: ['/static/images_t/order/htbbxlsn_large.png', '/static/images_t/order/drmmgl_large.png'], imgurl: '/static/images_t/order/lcghl.png' },
      { id: 3, name: 'NFC桃桃汁', price: 25, is_single: false, isHot: false, labels: '', materials: [], description: '非濃縮還原，0脂肪，0添加劑，純粹鮮榨，不添加壹滴水。甜美水蜜桃鮮榨', images: ['/static/images_t/order/htbbxlsn_large.png', '/static/images_t/order/drmmgl_large.png'], imgurl: '/static/images_t/order/nfcttz.png' },
      { id: 4, name: '多肉芒芒甘露', price: 27, is_single: true, isHot: true, labels: ['可做热饮', '含乳制品、茶'], materials: [], description: '冷/熱500ml 冷670ml 人氣top2經典茫茫與楊枝甘露的靈感碰撞，精選清幽綠茶', images: ['/static/images_t/order/htbbxlsn_large.png', '/static/images_t/order/drmmgl_large.png'], imgurl: '/static/images_t/order/drmmgl.png' },
      { id: 5, name: '黑糖波波希臘酸奶', price: 19, is_single: true, isHot: false, labels: ['含乳、燕麥、南瓜子仁'], materials: [], description: '黑糖脆波波與希臘酸奶靈感碰撞，酸奶部分無糖。選用100%生牛乳發酵，零添加我配附件哦机文件', images: ['/static/images_t/order/htbbxlsn_large.png', '/static/images_t/order/drmmgl_large.png'], imgurl: '/static/images_t/order/htbbxlsn.png' },
      { id: 6, name: '冷萃桂花綠', price: 9, is_single: true, isHot: false, labels: ['含茶'], materials: [], description: '冷萃茶不用等待叫號，可直接向店員出示後領取。細嫩茶芽與桂花壹同於冷露中为;为人家放假未发觉', images: ['/static/images_t/order/htbbxlsn_large.png', '/static/images_t/order/drmmgl_large.png'], imgurl: '/static/images_t/order/lcghl.png' },
      { id: 7, name: 'NFC桃桃汁', price: 25, is_single: true, isHot: false, labels: '', materials: [], description: '非濃縮還原，0脂肪，0添加劑，純粹鮮榨，不添加壹滴水。甜美水蜜桃鮮榨', images: ['/static/images_t/order/htbbxlsn_large.png', '/static/images_t/order/drmmgl_large.png'], imgurl: '/static/images_t/order/nfcttz.png' },
      { id: 8, name: '多肉芒芒甘露', price: 27, is_single: true, isHot: true, labels: ['含乳制品、茶'], materials: [], description: '冷/熱500ml 冷670ml 人氣top2經典茫茫與楊枝甘露的靈感碰撞，精選清幽綠茶', images: ['/static/images_t/order/htbbxlsn_large.png', '/static/images_t/order/drmmgl_large.png'], imgurl: '/static/images_t/order/drmmgl.png' }],

      keyword: '',
      result: [] };

  },
  created: function created() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var statusBarHeight, history_search, hotSearch, l, new_hot, _loop;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              console.log('searchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearch');
              console.log(_this.categories);
              statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
              _this.tranStyles.top = statusBarHeight + 44 + "px";

              /* this.hotSearch = await this.$api('hotSearch')
                                                                  this.historySearch = await this.$api('historySearch') */
              try {
                history_search = uni.getStorageSync('historySearch');
                if (history_search) {
                  _this.historySearch = JSON.parse(history_search);
                } else {
                  _this.historySearch = [];
                }
              } catch (e) {
                // error
              }

              hotSearch = [];
              _this.categories.forEach(function (category) {
                category.goods_list.forEach(function (good) {
                  hotSearch.push(good);
                });
              });
              l = hotSearch.length;
              if (l > 6) {
                new_hot = [];_loop = function _loop() {

                  var x = Math.round(Math.random() * l);
                  var g = hotSearch[x];
                  var is = new_hot.find(function (good) {
                    good.id == g.id;
                  });
                  if (!is) {
                    new_hot.push(g);
                  }};do {_loop();
                } while (new_hot.length <= 6);
                hotSearch = new_hot;
              }
              _this.hotSearch = hotSearch;case 10:case "end":return _context.stop();}}}, _callee);}))();
  },
  watch: {
    categories: function categories(n) {
      console.log('searchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearchsearch');
      console.log(n);
    } },

  methods: {
    hide: function hide() {
      this.keyword = '';
      this.result = [];
      this.$emit('hide');
    },
    handleChoose: function handleChoose(item) {var isSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (isSearch) {
        this.hide();
        var i = this.historySearch.findIndex(function (good) {
          return item.id == good.id;
        });
        if (i == -1) {
          this.historySearch.push(item);
          var new_h = JSON.stringify(this.historySearch);
          uni.setStorage({
            key: "historySearch",
            data: new_h });

        }

        this.$emit('choose', item);
        return;
      }

      var h_exis = false;
      var h_find = '';
      this.categories.forEach(function (category) {
        //  const find = category.goods_list.find(good => good.id == item.id)
        // if(find) {
        // 	this.hide()
        // 	this.$emit('choose', find)
        // 	return
        // }
        var find = category.goods_list.find(function (good) {return good.id == item.id;});
        if (find) {
          h_exis = true;
          h_find = find;
        }


      });
      if (h_exis) {
        this.hide();
        this.$emit('choose', h_find);
        return;
      } else {
        uni.showToast({
          title: '商品已过期',
          duration: 1500,
          icon: "none" });

        var _new_h = this.historySearch.filter(function (good) {
          good.id != item.id;
        });
        this.historySearch = _new_h;
        _new_h = JSON.stringify(_new_h);
        uni.setStorage({
          key: 'historySearch',
          data: _new_h });

      }
    },
    handleKeywordInput: function handleKeywordInput(e) {var _this2 = this;
      //为了方便，这里使用商品列表的数据来筛选结果
      var value = e.detail.value;

      if (!value) {
        this.result = [];
        return;
      }

      var result = [];
      this.categories.forEach(function (category) {
        category.goods_list.forEach(function (good) {
          if (good.name.indexOf(value) > -1) {
            result.push(good);
          }
        });
      });
      setTimeout(function () {return _this2.result = result;}, 300);
    },
    clearHistory: function clearHistory() {
      this.historySearch = [];
      var new_h = '';
      uni.setStorage({
        key: 'historySearch',
        data: new_h });

    },
    clear: function clear() {
      this.keyword = '';
      this.result = [];
    } } };exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 389:
/*!********************************************************************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/work/develop/program/yingguocheng_git/yingguocheng/pages/order/components/search/search.vue?vue&type=style&index=0&id=1de2f0e0&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_id_1de2f0e0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./search.vue?vue&type=style&index=0&id=1de2f0e0&lang=scss&scoped=true& */ 390);
/* harmony import */ var _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_id_1de2f0e0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_id_1de2f0e0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_id_1de2f0e0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_id_1de2f0e0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_id_1de2f0e0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 390:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/work/develop/program/yingguocheng_git/yingguocheng/pages/order/components/search/search.vue?vue&type=style&index=0&id=1de2f0e0&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/order/components/search/search.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/order/components/search/search-create-component',
    {
        'pages/order/components/search/search-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(384))
        })
    },
    [['pages/order/components/search/search-create-component']]
]);
