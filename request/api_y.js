const ajax = require('./ajax')

//門店列表
export const shops_list = (data) => ajax('/shop/shop-list', data, 'post', 0)
//門店詳情
export const shops_detail = (data) => ajax('/shop/shop-detail', data, 'post', 0)
//商品列表
export const goods_list = (data) => ajax('/goods/list', data, 'post', 0)
//商品詳情
export const goods_detail = (data) => ajax('/goods/details', data, 'post', 0)


//新建拼單
export const pintuan_creat = (data) => ajax('/merger-team/create-team', data, 'post', 1)
//團隊點單
export const pintuan_order = (data) => ajax('/merger-team/merger-order', data, 'post', 1)
//邀請成員
export const pintuan_invite = (data) => ajax('/merger-team/join-team', data, 'post', 1)
//邀請成員二维码
export const pintuan_invite_code = (data) => ajax('/qr-code/invite-code', data, 'post', 1)
//拼團鎖定
export const pintuan_lock = (data) => ajax('/merger-team/lock-team', data, 'post', 1)
//拼團解鎖
export const pintuan_unlock = (data) => ajax('/merger-team/unlock-team', data, 'post', 1)
//組團詳情
export const pintuan_detail = (data) => ajax('/merger-team/merger-detail', data, 'post', 1)
//取消拼團
export const pintuan_cancel = (data) => ajax('/merger-team/cancel-team', data, 'post', 1)


//地址列表
export const userAddresses = (data) => ajax('/address/list', data, 'post', 1)
//添加地址
export const address_add = (data) => ajax('/address/increase', data, 'post', 1)
//修改地址
export const address_edit = (data) => ajax('/address/modify', data, 'post', 1)
//刪除地址
export const address_delete = (data) => ajax('/address/delete', data, 'post', 1)


//首页轮播图和logo
export const home_images = (data) => ajax('/config/poster', data, 'post', 0)