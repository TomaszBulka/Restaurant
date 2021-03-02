import api from './api'

export default {
  fetchPositions () {
    return api().get('positions')
}
  }