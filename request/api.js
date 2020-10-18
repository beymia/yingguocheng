const ajax = require('./ajax')

//true是请求时携带token，false为不携带

//致用戶
export const tolk = (data)=>ajax('/config/talk',data,'post')
//订单详情
export const orderForm = (data) => ajax('/user/order', data, 'post', 1)
//开发票
export const invoice = (data) => ajax('/invoice-apply/create-apply', data, 'post', 1)
//发送验证码
export const sendCheckCode = (data) => ajax('/sms/login-sms', data, 'post')
//效验验证码
export const verifyCode = (data) => ajax('/sms/verify-sms', data, 'post')
//登录&注册
export const login = (data) => ajax('/login/login', data, 'post')
//积分商城
export const convert = (data) => ajax('/convert/list', data, 'post', 1)
//积分明细
export const pointsDetails = (data) => ajax('/record/integral-notes', data, 'post', 1)
//积分兑换记录
export const exchangeRecord = (data) => ajax('/integral/convert-record', data, 'post', 1)
//積分商品詳情
export const pointsGoodsDetail = (data) => ajax('/convert/detail', data, 'post', 1)
//積分兌換禮品
export const redeemGifts = (data) => ajax('/convert/convert', data, 'post', 1)
//用户信息
export const userSpace = (data) => ajax('/user/user-info', data, 'post', 1)
//开通会员
export const joinMember = (data) => ajax('/pay/service', data, 'post',1)
//优惠券
export const discount = (data) => ajax('/ticket/tickets', data, 'post', 1)
//设置交易密码
export const setPwd = (data) => ajax('/user/setpwd', data, 'post', 1)
//消费记录
export const expensesRecord = (data) => ajax('/record/balance-notes', data, 'post', 1)
//会员二维码
export const qrCode = (data) => ajax('/qr-code/user-code', data, 'post', 1)
//充值钱包
export const recharge = (data) => ajax('/pay/recharge', data, 'post', 1)
//会员月度礼包
export const monthPack = (data) => ajax('/month/park-list', data, 'post', 1)
//领取月度礼包
export const receivePack = (data) => ajax('/month/receive-park', data, 'post', 1)
//骑士会员礼包
export const interestsPark = (data) => ajax('/interests/park-list', data, 'post', 1)
//领取骑士会员礼包
export const receiveKnight = (data) => ajax('', data, 'post', 1)
//消息中心
export const msgCenter = (data) => ajax('/msg-center/list', data, 'post', 1)
//会员充值信息
export const memberRechargeInfo = (data) => ajax('/config/recharge-level', data, 'post', 1)

//訂單結算附加服務
export const paymentAttach = (data) => ajax('/config/attach', data, 'post')
//創建訂單
export const createOrder = (data) => ajax('/order/create-order', data, 'post', 1)
//發起支付
export const paymentStart = (data) => ajax('/pay/wechat-pay', data, 'post', 1)
//訂單可用優惠券
export const usedCoupon = (data) => ajax('/ticket/suit-tickets', data, 'post', 1)

//初始化聊天室
export const initChat = (data) => ajax('/dialog/init-dialog', data, 'post', 1)
//發送消息
export const sendMsg = (data) => ajax('/dialog/send-msg', data, 'post', 1)
//接受消息
export const receiveMsg = (data) => ajax('/dialog/latest-dialog', data, 'post', 1)

//奶茶有礼列表
export const milkList = (data) => ajax('/foreseeList-card/list', data, 'post', 1)
//我的卡片
export const myForesee = (data) => ajax('/foreseeList-card/my-card', data, 'post', 1)
//购买卡片
export const buyForesee = (data) => ajax('/foreseeList-card/pay-card', data, 'post', 1)
//收送记录
export const mutualRecord = (data) => ajax('/foreseeList-card/my-gift', data, 'post', 1)
//贈送預付卡
export const giveForesee = (data)=>ajax('/foresee-card/handsel-gift',data,'post',1)