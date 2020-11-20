const ajax = require('./ajax')

//true是请求时携带Token，false为不携带

export const updateApp = (data) => ajax('/config/talk', {data, isToken: false})

//致用戶
export const tolk = (data) => ajax('/config/talk', {data, isToken: false})
//订单详情
export const orderForm = (data) => ajax('/user/order', {data})
//开发票
export const invoice = (data) => ajax('/invoice-apply/create-apply', {data})
//发送验证码
export const sendCheckCode = (data) => ajax('/sms/login-sms', {data, isToken: false})
//效验验证码
export const verifyCode = (data) => ajax('/sms/verify-sms', {data, isToken: false})
//注册
export const registered = (data) => ajax('/login/enroll', {data, isToken: false})
//登录
export const login = (data) => ajax('/login/login', {data, isToken: false})
//积分商城
export const convert = (data) => ajax('/convert/list', {data})
//积分明细
export const pointsDetails = (data) => ajax('/record/integral-notes', {data})
//积分兑换记录
export const exchangeRecord = (data) => ajax('/integral/convert-record', {data})
//積分商品詳情
export const pointsGoodsDetail = (data) => ajax('/convert/detail', {data})
//積分兌換禮品
export const redeemGifts = (data) => ajax('/convert/convert', {data})
//用户信息
export const userSpace = (data) => ajax('/user/user-info', {data})
//开通会员
export const joinMember = (data) => ajax('/pay/service', {data})
//全部优惠券
export const discount = (data) => ajax('/ticket/tickets', {data})
//设置交易密码
export const setPwd = (data) => ajax('/user/setpwd', {data})
//钱包余额消费记录
export const expensesRecord = (data) => ajax('/record/balance-notes', {data})
//会员二维码
export const qrCode = (data) => ajax('/qr-code/user-code', {data})
//充值钱包
export const recharge = (data) => ajax('/pay/recharge', {data})

//会员等级礼包
export const levelPack = (data) => ajax('/grade/park-list', {data})
//领取等级礼包
export const receiveLevel = (data) => ajax('/grade/receive-park', {data})
//会员月度礼包
export const monthPack = (data) => ajax('/month/park-list', {data})
//领取月度礼包
export const receivePack = (data) => ajax('/month/receive-park', {data})
//会员等阶礼包
export const interestsPark = (data) => ajax('/interests/park-list', {data})
//领取会员等阶礼包
export const receiveKnight = (data) => ajax('/interests/receive-park', {data})
//會員購買記錄
export const rechargeRecord = (data) => ajax('/record/service-notes', {data})

//消息中心
export const msgCenter = (data) => ajax('/msg-center/list', {data})
//获取会员充值等阶信息（金额 & 有效时间）
export const memberRechargeInfo = (data) => ajax('/config/recharge-level', {data})

//訂單結算附加服務
export const paymentAttach = (data) => ajax('/config/attach', {data, isToken: false})
//創建訂單
export const createOrder = (data) => ajax('/order/create-order', {data})
//發起支付
export const paymentStart = (data) => ajax('/pay/pay', {data})
//訂單可用優惠券
export const usedCoupon = (data) => ajax('/ticket/suit-tickets', {data})

//非实时消息存储
export const sendMsg = (data) => ajax('/dialog/send-msg', {data})
//接收非实时消息
export const receiveMsg = (data) => ajax('/dialog/latest-dialog', {data})

//奶茶有礼列表
export const foreseeList = (data) => ajax('/foresee-card/list', {data})
//我的卡片
export const myForesee = (data) => ajax('/foresee-card/my-card', {data})
//购买卡片
export const buyForesee = (data) => ajax('/pay/card', {data})
//收送记录
export const mutualRecord = (data) => ajax('/foresee-card/my-gift', {data})
//贈送預付卡
export const giveForesee = (data) => ajax('/foresee-card/handsel-gift', {data})