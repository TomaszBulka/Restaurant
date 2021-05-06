import api from './api'

export default {
  fetchPositions () {
    return api().get('positions')
},

createPosition(params) {
  return api().post('positions', params)
},

editPosition(params){
  return api().put('single-position', params)
},

findPosition(params){
  console.log(params)
  return api().get(`single-position/${params}`)
},

deletePosition(params){
  api().post('delete-position', params)
}
  }