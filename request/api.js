const ajax = require('./ajax')


const orderForm = ()=>ajax('/orderrm',{},)

module.exports = {
    orderForm
}