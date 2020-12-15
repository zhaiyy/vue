import Vue from 'vue'
// import Vuex from 'vuex'
import MVuex from '../mVuex'

Vue.use(MVuex)
// Vue.use(Vuex)

const storeConfig = {
  state: {
    storeName: 'storeName'
  },
  getters:{   
      myName(state){
        console.log('state', state)
          return state.storeName+'getter'
      }
  },
  mutations: {
    updateStoreName({commit}, data) {
      commit('storeName', data)
    }
  },
  actions: {
  },
  modules: {
  }
}
export default new MVuex.Store(storeConfig)
