import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    api: 'http://192.168.43.33:8084',
    user: localStorage.getItem('user'),
    token: window.atob(localStorage.getItem('user_token'))
  }
})