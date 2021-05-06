import UsersService from '../../api/UsersService'

const state = {
    user: null,
    address: null,
    isAdmin: false
}

const getters = {
    loggedUser: state => state.user,
    usersAddress: state => state.address,
    isAdmin: state => state.isAdmin
}

const actions = {
    
    async fetchUser({commit}){
        let response = await UsersService.fetchUser()
        commit('setUser', response.data.username)
        
    },
    async logout({commit}){
        await UsersService.logoutUser()
        commit('logout')
        setTimeout(() => window.location.reload(), 100) 
        
    },
    async fetchAddress({commit}){
        let response = await UsersService.fetchUser()
        commit('setAddress', response.data.address)
        
    },
    async fetchAdmin({commit}){
        let response = await UsersService.fetchUser()
        console.log(response.data)
        commit('setAdmin', response.data.isAdmin)
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
    },
    setAdmin(state, isAdmin){
        state.isAdmin = isAdmin
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}