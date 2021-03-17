import UsersService from '../../api/UsersService'

const state = {
    user: null,
    address: null
}

const getters = {
    loggedUser: state => state.user,
    usersAddress: state => state.address
}

const actions = {
    
    async fetchUser({commit}){
        let response = await UsersService.fetchUser()
        commit('setUser', response.data.username)
        
    },
    async logout({commit}){
        await UsersService.logoutUser()
        commit('logout')
    },
    async fetchAddress({commit}){
        let response = await UsersService.fetchUser()
        commit('setAddress', response.data.address)
        console.log(response.data.address)
    } 

}

const mutations = {
    setUser(state, user){
        state.user = user
        
    },
    logout(state){
        state.user = null
    },
    setAddress(state, address){
        state.address = address
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}