const ajax = require('./ajax')

//开发环境下需要开启本地后端服务，生产环境需要替换api地址,测试地址不适用于
export const orderForm = (data) => ajax('http://localhost:3000/orderForm', data, 'post')
export const userSpace = (data) => ajax('http://localhost:3000/userspace', data, 'post')
export const sendCheckCode = (data) => ajax('http://localhost:3000/sendcheckcode', data, 'post')
export const verifyCode = (data) => ajax('http://localhost:3000/verifycode', data, 'post')
export const login = (data) => ajax('http://localhost:3000/login', data, 'post')
export const convert = (data) => ajax('http://localhost:3000/pointsmall', data, 'post')
export const convert = (data) => ajax('http://localhost:3000/pointsmall', data, 'post')
