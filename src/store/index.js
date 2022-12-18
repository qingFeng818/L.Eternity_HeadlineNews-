import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/utils/storage'
import { getToken, setToken, getNewDetail, setNewDetail } from '@/utils/authors'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenObj: getToken() || {},
    detailInfo: getNewDetail() || {}
    // historyList: getHistory() || []
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, payload) {
      state.tokenObj = payload
      setToken(payload)
    },
    SET_DETAIL(state, payload) {
      state.detailInfo = payload
      setNewDetail(payload)
    }
    // SET_HISTORY(state, payload) {
    //   state.historyList = payload
    //   setHistory(payload)
    // }
  },
  actions: {},
  modules: {}
})
