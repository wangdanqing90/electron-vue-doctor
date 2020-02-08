import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token:'',
    count: 0,
    show: ''
  },
  getters: {
    counts: (state) => {
      return state.count
    }
  },
  mutations: {
    saveToken: (state,token) => {
      state.token=token;
    },
    clearToken: (state) => {
      state.token='';
    },
    increment: (state) => {
      state.count++
    },
    decrement: (state) => {
      state.count--
    },
    changTxt: (state, v) => {
      state.show = v
    }
  }
})

export default store