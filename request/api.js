const ajax = require('./ajax')

//开发环境下需要开启本地后端服务，生产环境需要替换api地址,测试地址不适用于


//订单详情
export const orderForm = (data) => ajax('/user/order', data, 'post',1)
//用户信息
export const userSpace = (data) => ajax('/user/user-info', data, 'post',1)
//发送验证码
export const sendCheckCode = (data) => ajax('/sms/login-sms', data, 'post')
//效验验证码
export const verifyCode = (data) => ajax('/sms/verify-sms', data, 'post')
//登录&注册
export const login = (data) => ajax('/login/login', data, 'post')
//积分商城
export const convert = (data) => ajax('/convert/list', data, 'post')
//开通会员
export const joinMember = (data) => ajax('/account/service-pay', data, 'post')

export const discount = (data) => ajax('http://localhost:3000/discount', data, 'post')
export const setPwd = (data) => ajax('http://localhost:3000/setpassword', data, 'post')
export const qrCode = (data) => ajax('http://localhost:3000/qrcode', data, 'post')
export const pointsDetails = (data) => ajax('http://localhost:3000/pointsdetails', data, 'post')
export const record = (data) => ajax('http://localhost:3000/record', data, 'post')
export const expensesRecord = (data) => ajax('http://localhost:3000/expensesrecord', data, 'post')
export const changeCode = (data) => ajax('http://localhost:3000/changecode', data, 'post')
