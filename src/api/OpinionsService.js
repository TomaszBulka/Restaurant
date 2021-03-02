import api from './api'

export default {
  fetchOpinions () {
    return api().get('opinions')
  },
  addOpinion(params){
    return api().post('opinions', params)
  }
}