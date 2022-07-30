import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/utils/storage'
import { getToken, setToken } from '@/utils/authors'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // tokenObj: storage.get('HEINA_TOUTIAO_TOKEN') || {}
    tokenObj: getToken() || {}
    // tokenObj: JSON.parse(localStorage.getItem('HEINA_TOUTIAO_TOKEN')) || {}
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, payload) {
      state.tokenObj = payload
      // localStorage.setItem('HEINA_TOUTIAO_TOKEN', JSON.stringify(payload))
      // storage.set('HEINA_TOUTIAO_TOKEN', payload)
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})
