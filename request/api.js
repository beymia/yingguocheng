const ajax = require('./ajax')


const orderForm = ()=>ajax('/orderForm',{},)

module.exports = {
    orderForm
}