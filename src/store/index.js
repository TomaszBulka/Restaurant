import { createStore } from 'vuex'
import positions from './modules/positions'
import user from './modules/user'
import order from './modules/order'
import discounts from './modules/discounts'



export const store =  createStore({
 
  modules: {
    positions,
    user,
    order,
    discounts
  }
})
