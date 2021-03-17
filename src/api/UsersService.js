import api from './api'

export default{ 
    
    createUser(params){
       return api().post('users', params)
},

    loginUser(params){
       return api().post('login', params)
         
    },
    fetchUser(){
      return  api().get('users')
       
    },
    logoutUser(){
        api().post('logout')
    }
    
}

