import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    api: 'https://trafikappapi.herokuapp.com',
    user: localStorage.getItem('user'),
    token: window.atob(localStorage.getItem('user_token'))
  }
})