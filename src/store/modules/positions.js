import PositionsService from '../../api/PositionsService'

const state  = {
    positions: [],
    orderedPositions: [],
    sumOfPrices: 0,
    discountedPrice: null,
    isDiscounted: false,
    positionToEdit: null
    
}

const getters = {
    allPositions: state => state.positions,
    orderedPositions: state => state.orderedPositions,
    getSumOfPrices: state => state.sumOfPrices,
    getDiscountedPrice: state => state.discountedPrice,
    getPositionToEdit: state => state.positionToEdit
}

const actions = {
    async fetchPositions({commit}){
        let response = await PositionsService.fetchPositions()
        commit('setAllPositions', response.data)
    },
    async deleteMenuPosition({commit}, menuPosition){
        console.log(menuPosition)
        await PositionsService.deletePosition(menuPosition.position)
        commit('deleteMenuPosition', menuPosition.index)

    },
    async findPositionToEdit({commit}, id){
        let response = await PositionsService.findPosition(id)
        commit('setPositionToEdit', response.data) 
    },
    orderPosition({commit}, position){ 
       commit('setOrderedPosition', position)    
    },
    addPrices({commit}, position){
       commit('setSumOfPrices', position)      
    },
    deleteOrder({commit}, index){
        commit('deletePosition', index)
    },
    substractPrices({commit}, position){
        commit('setSubstractedPrices', position)
    },
    addDiscount({commit}, discount){
        console.log(discount)
        commit('setDiscount', discount)
    },
    recalculateDiscount({commit}, sumAndDiscounts){
        commit('setRecalculatedDiscount', sumAndDiscounts)
    },
    cleanBasket({commit}){
        commit('cleanOrderedPositions')
    }
    

}

const mutations = {
    setAllPositions(state, positions){
        state.positions = positions
        
    },
    setOrderedPosition(state, position){
        state.orderedPositions.push(position)
        
    },
    setSumOfPrices(state, position) {
        state.sumOfPrices += position.price
    },
    deletePosition(state, index){
        state.orderedPositions.splice(index, 1)
    },
    setSubstractedPrices(state, position){
        state.sumOfPrices -= position.price
    },
    setDiscount(state, discount){
        if(state.discountedPrice == null ){
            state.discountedPrice = state.sumOfPrices * discount
            state.isDiscounted = true    
        }else{
            console.log(" Już wykorzystałeś swoją zniżkę")
        }  
    },
    setRecalculatedDiscount(state, sumAndDiscounts){
        if(state.isDiscounted){
            if(sumAndDiscounts.getSumOfOrders > 500 && sumAndDiscounts.getSumOfOrders <= 1000 ){
                state.discountedPrice = state.sumOfPrices * sumAndDiscounts.getDiscounts[0]
            }else if(sumAndDiscounts.getSumOfOrders > 1000){
                state.discountedPrice = state.sumOfPrices * sumAndDiscounts.getDiscounts[1]
            }
        }
    },
    cleanOrderedPositions(state){
        state.orderedPositions = []
        state.sumOfPrices = 0
    },
    deleteMenuPosition(state, index){
        state.positions.splice(index, 1)
    },
    setPositionToEdit(state, positionToEdit){
        state.positionToEdit = positionToEdit
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}