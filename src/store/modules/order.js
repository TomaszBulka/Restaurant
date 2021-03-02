import OrderService from '../../api/OrderService'

const state = {
    order: {
        positions: null,
        sumOfPrices: null,
    },
    pastOrders: null,
    sumOfOrders: null
}

const getters = {
    getOrder: state => state.order,
    getPastOrders: state => state.pastOrders,
    getSumOfOrders: state =>state.sumOfOrders
}

const actions = {
    async createOrder({commit}, order ){
        await OrderService.createOrder(order)
        commit('setOrder', order)
    },
    async fetchPastOrders({commit}){
        let response = await OrderService.getPastOrders()
        commit('setPastOrders', response.data)    
    },
    async fetchSumOfOrders({commit}){
        let response = await OrderService.getSumOfOrders()
        console.log(response.data.result)
        commit('setSumOfOrders', response.data.result)
    }
}

const mutations = {
    setOrder(state, order){     
        state.order.sumOfPrices = order.getSumOfPrices
        state.order.positions = order.orderedPositions
    },
    setPastOrders(state, pastOrders){
        if(typeof(pastOrders)=="string"){ state.pastOrders = null}
        else{
            state.pastOrders = pastOrders.splice(0, 5)
        }    
    },
    setSumOfOrders(state, sumOfOrders){

        state.sumOfOrders = sumOfOrders
    }
}

export default {
    state,
    getters,
    actions,
    mutations

}