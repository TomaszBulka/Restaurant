import OrderService from '../../api/OrderService'
import router from '../../router/index'
const state = {
    order: {
        positions: null,
        sumOfPrices: null
    },
    pastOrders: null,
    sumOfOrders: null,
    currentOrder: null,
    latestOrders: null
}

const getters = {
    getOrder: state => state.order,
    getPastOrders: state => state.pastOrders,
    getSumOfOrders: state => state.sumOfOrders,
    getCurrentOrder: state => state.currentOrder,
    getLatestOrders: state => state.latestOrders
}

const actions = {
    async createOrder({commit}, order ){
        await OrderService.createOrder(order)
        commit('setOrder', order)
        setTimeout(() => router.push({name: 'AddressForm'}), 1500)
    },
    async fetchPastOrders({commit}){
        let response = await OrderService.getPastOrders()
        commit('setPastOrders', response.data)    
    },
    async fetchSumOfOrders({commit}){
        let response = await OrderService.getSumOfOrders()
        commit('setSumOfOrders', response.data.result)
    },
    async fetchCurrentOrder({commit}){
        let response = await OrderService.getCurrentOrder()
        commit('setCurrentOrder', response.data)
    },
    async payAndDeleteCurrentOrder({commit}){
        await OrderService.payAndDeleteSession()
        commit('deleteCurrentOrder' )
        router.push({ name: 'Confirmation'})
    },
    async fetchLatestOrders({commit}){
        let response = await OrderService.getLatestOrders()
        console.log(response.data)
        if(typeof(response.data) != "string")
        commit('setLatestOrders', response.data )
    },
    async markAsRealized({dispatch, commit}, order){
       let response =  await OrderService.markAsRealized(order)
        commit('setAsRealized')
        if(response.data == "Order has been realized !"){
        dispatch('fetchLatestOrders')
        }
        
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
    },
    setCurrentOrder(state, currentOrder){
        state.currentOrder = currentOrder[0]
    },
    deleteCurrentOrder(state){
        state.currentOrder = null
    },
    setLatestOrders(state, latestOrders){
        state.latestOrders = latestOrders
    }
}

export default {
    state,
    getters,
    actions,
    mutations

}