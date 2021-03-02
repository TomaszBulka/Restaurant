const state = {
    discounts: [ 0.95, 0.9]

}
const getters = {
    getDiscounts: state => state.discounts
}

export default {
    state,
    getters
}