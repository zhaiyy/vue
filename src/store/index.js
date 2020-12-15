import Vue from 'vue'
// import Vuex from 'vuex'
import MVuex from '../mVuex'

Vue.use(MVuex)
// Vue.use(Vuex)

const moduleA = {
  state: { 
    moduleA: 'moduleA'
   },
  mutations: {  },
  actions: {  },
  getters: {  }
}

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
    updateStoreName(state, data) {
      console.log('data', data)
      state.storeName = data

    }
  },
  actions: {
    updateNameAction({commit}, data) {
      setTimeout(() => {
        console.log(commit, data)
        commit('updateStoreName', data)
      }, 2000)
    }
  },
  modules: {
    moduleA
  }
}
export default new MVuex.Store(storeConfig)
