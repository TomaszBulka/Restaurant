import api from './api'

export default{ 
    
    createUser(params){
        api().post('users', params)
},

    loginUser(params){
        console.log(params)
        api().post('login', params)
    },
    fetchUser(){
      return  api().get('users')
       
    },
    logoutUser(){
        api().post('logout')
    }
    
}

