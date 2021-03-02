import UsersService from '../../api/UsersService'

const state = {
    user: null
}

const getters = {
    loggedUser: state => state.user
}

const actions = {
    
    async fetchUser({commit}){
        let response = await UsersService.fetchUser()
        commit('setUser', response.data.username)
        console.log(response.data)
    },
    async logout({commit}){
        await UsersService.logoutUser()
        commit('logout')
    } 

}

const mutations = {
    setUser(state, user){
        state.user = user
        
    },
    logout(state){
        state.user = null
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}