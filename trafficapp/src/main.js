// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false
// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCzGhXW70cAYIsxooXjrKtmrNomm7eUh00',
  authDomain: 'trafficreport-42547.firebaseapp.com',
  databaseURL: 'https://trafficreport-42547.firebaseio.com',
  projectId: 'trafficreport-42547',
  storageBucket: 'trafficreport-42547.appspot.com',
  messagingSenderId: '794288775239'
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
