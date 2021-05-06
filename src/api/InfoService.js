import api from './api'

export default {

    updateInfo(params){
        api().put('info', params)
    },

    getInfo(){
      return  api().get('info')
    }
}