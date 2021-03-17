import api from './api'

export default {

    createOrder(params){
        api().post('orders', params)
    },

    getPastOrders(){
        return api().get('orders')
    },

    getSumOfOrders(){
       return api().get('sum')
    },
    getCurrentOrder(){
        return api().get('currentOrder')
    },
    addAddress(params){
        api().post('currentOrder', params)
    },
    payAndDeleteSession(){
        api().post('payment')
    }
    
}