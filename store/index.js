import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    headerClass: "",
    apiUrl: 'https://web.utlandia.com/api?id='
  },
  mutations: {
    setHeader (state, payload) {
      state.headerClass = payload;
    }
  }
})

export default store