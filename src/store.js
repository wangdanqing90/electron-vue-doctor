import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token:'',
    WS:'',
    WS_MSG:''
  },
  getters: {
    counts: (state) => {
      return state.count
    }
  },
  mutations: {
    saveToken: (state,payload) => {
      state.token=payload;
    },
    clearToken: (state) => {
      state.token='';
    },
    SET_WS: (state,payload) => {
      state.WS=payload;
    },
    SET_WS_MSG: (state,payload) => {
      state.WS_MSG=payload;
    },
    
  }
})

export default store