// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './router/index.js'
import { store } from './store'
import App from './App'
import VueResource from 'vue-resource'
import VueIziToast from 'vue-izitoast'
import 'izitoast/dist/css/iziToast.css'
import * as VueGoogleMaps from "vue2-google-maps"
 import Multiselect from 'vue-multiselect'
 import VueProgressBar from 'vue-progressbar'
// import firebase from 'firebase'

Vue.use(VueRouter)  
Vue.use(VueResource)
Vue.use(VueIziToast)
Vue.use(VueGoogleMaps, {
  load: {
    key: "REPLACE-THIS-WITH-YOUR-KEY-FROM-ABOVE",
    libraries: "places" // necessary for places input
  }
});
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '10px'
})
Vue.component('multiselect', Multiselect)

Vue.config.productionTip = false
const router = new VueRouter({
  mode: 'history',
  routes
})
// Initialize Firebase
// var config = {
//   apiKey: 'AIzaSyCzGhXW70cAYIsxooXjrKtmrNomm7eUh00',
//   authDomain: 'trafficreport-42547.firebaseapp.com',
//   databaseURL: 'https://trafficreport-42547.firebaseio.com',
//   projectId: 'trafficreport-42547',
//   storageBucket: 'trafficreport-42547.appspot.com',
//   messagingSenderId: '794288775239'
// }
// firebase.initializeApp(config)
// Navigation guards
router.beforeEach((to, from, next) => {
  // route guards
  var token = store.state.token
  if (to.matched.some(record => record.meta.reqToken)) {
    if (token === null) {
      // console.log('not logged in')
      next('/login')
    } else {
      next()
      // console.log('already logged in')
      // console.log('token is :', token)
    }
  }
  if (to.matched.some(record => record.meta.noReqToken)) {
    if (token != null) {
      // console.log('user already logged in')
      // console.log('token is :', token)
      next('/traffic-report')
    } else {
      localStorage.removeItem('user')
      next()
      // console.log('token null')
    }
  }
  next()
})

Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://127.0.0.1:8084'
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
// Vue.http.options.credentials = true;
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', window.atob(localStorage.getItem('user_token')))
  request.headers.set('Accept', 'application/json')
  next()
  // return function (error) {
  //   // console.log('from interceptor ', error.status)
  //   if (error.status === 401) {
  //     console.log('401')
  //     // localStorage.setItem('unathorized__access', 1)
  //     // // localStorage.clear()
  //     // localStorage.removeItem('user_token')
  //     // localStorage.removeItem('userType')
  //     // localStorage.removeItem('user_phone')
  //     // router.push('/login')
  //   } else {
  //     // console.log('nill')
  //   }
  // }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
