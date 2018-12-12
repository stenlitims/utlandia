import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    headerClass: ""
  },
  mutations: {
    setHeader (state, payload) {
      state.headerClass = payload;
    }
  }
})

export default store