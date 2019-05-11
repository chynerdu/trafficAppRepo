<template>
    <div>
        <div id="page">
            <appHeader></appHeader>    
            <div class="page-content header-clear-large" @click= "toggleFold">	   
                <div class="content">
                    <h2 class="bolder">Traffic Status</h2>
                    <p class="under-heading color-highlight font-10 bottom-10">Status was last updated about 35 minutes ago</p>
                    <p>
                        Traffic status from <span class="bold">{{location.start_point}}</span> To <span class="bold">{{location.end_point}} </span>
                    </p>
                </div>
                
                <div class="content">
                    <div v-if="loading == true" class="row">
                        <div class="loading">
                        <div class="spinner">
                            <p class="color-highlight rect1"></p>
                            <p class="color-highlight rect2"></p>
                            <p class="color-highlight rect3"></p>
                            <p class="color-highlight rect4"></p>
                            <p class="color-highlight rect5"></p>
                        </div>
                        </div>
                    </div>
                    <donut-chart 
                        v-if = "loading === false"
                        id="donut" 
                        :data="trafficData" 
                        colors='[ "#A0D468", "#2ABA66", "#D8334A", "#BF263C" ]' 
                        resize="true">
                    </donut-chart>
                    <template v-if = "loading === false">
                        <div class="link-list link-list-3">
                            <p class="round-small shadow-tiny">
                                <i class="fa fa-car font-18 color-green1-dark"></i>
                                <span>The Road Is Free</span>
                                <strong>No traffic the road is free.</strong>
                                <i class="color-green1-dark">{{levelOnePercentage}}%</i>
                                <!--<i class="fa fa-check-circle color-green1-dark"></i>-->
                            </p>
                        </div>        
                        <div class="link-list link-list-3">
                            <p  class="round-small shadow-tiny">
                                <i class="fa fa-car font-18 color-green2-light"></i>
                                <span>Traffic is mild</span>
                                <strong>No major traffic, just some few stops. </strong>
                                <i class="color-green2-light">{{levelTwoPercentage}}%</i>
                                <!--<i class="fa fa-check-circle color-green1-dark"></i>-->
                            </p>
                        </div>           
                        <div class="link-list link-list-3">
                            <p  class="round-small shadow-tiny">
                                <i class="fa fa-car font-18 color-red2-light"></i>
                                <span>Heavy Traffic</span>
                                <strong>Major traffic along the road</strong>
                                <i class="color-red2-light">{{levelThreePercentage}}%</i>
                                <!--<i class="fa fa-check-circle color-green1-dark"></i>-->
                            </p>
                        </div>           
                        <div class="link-list link-list-3">
                            <p  class="round-small shadow-tiny">
                                <i class="fa fa-car font-18 color-red1-dark"></i>
                                <span>Road Is Blocked</span>
                                <strong>The road is blocked, alternative route advised</strong>
                                <i class="color-red1-dark">{{levelFourPercentage}}%</i>
                                <!--<i class="fa fa-exclamation-triangle color-yellow1-dark"></i>-->
                            </p>
                        </div>   
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import appheader from '../modules/header.vue'
import Raphael from 'raphael/raphael'
global.Raphael = Raphael
import Vue from 'vue'
import { DonutChart } from 'vue-morris'
export default {
  data () {
    return {
      phone_no: '',
      password: '',
      levelOnePercentage: '',
      levelTwoPercentage: '',
      levelThreePercentage: '',
      levelFourPercentage: '',
      notificationSystem: {
        options: {
            success: {
            position: "topRight"
          },
          warning: {
            position: "topLeft"
          },
          error: {
            position: "topRight"
          },
          info: {
            position: 'topLeft'
         },
        }
      },
      donutData: [
      { label: 'Red', value: 2 },
      { label: 'Blue', value: 1},
      { label: 'Yellow', value: 4 }
    ],
    loading: true

    }
  },
  components: {
    // sideBar: sideBar,
    appHeader: appheader,
    DonutChart
    // BarChart, 
    // LineChart, 
    // AreaChart
  },
  created(){
      console.log('traffic report ')
      console.log('from query: ', this.$route.query)
      this.getTraffic()
  },
  computed: {
      location() {
          return this.$route.query
      }
    //   trafficData() {
    //       console.log('donught ', this.LevelOne)
    //       return [
    //   { label: 'Free', value: this.LevelOne },
    //   { label: 'Mild', value: this.LevelTwo },
    //   { label: 'Heavy', value: this.LevelThree },
    //   { label: 'Blocked', value: this.LevelFour } 
    //       ]
    //   }
  },
  methods: {
    toggleFold () {
    //   console.log('closed sidebar')
    document.getElementById('menu-1').classList.remove('menu-active')
    },
    getTraffic() {
        this.start = this.$route.query.start_point
        this.end = this.$route.query.end_point
        this.API = this.$store.state.api
        this.$Progress.start()
        this.$http
        .get(`${this.API}/traffic-report?ending_point=${this.end}&starting_point=${this.start}`)
        .then(
            response => {
                if (response.body.length === 0) {
                  this.$toast.warning('No report have been made for this location yet, try again!', 'OK', this.notificationSystem.options.warning)  
                } else {
                    console.log('traffic ', response)
                    var resultLength = response.body.length
                    var TrafficResult = response.body
                    let self = this
                    var waitForFilter = new Promise(function(resolve, reject) {
                        // this.getLevelOne(TrafficResult)
                        // this.getLevelTwo(TrafficResult)
                        // this.getLevelThree(TrafficResult)
                        // this.getLevelFour(TrafficResult)
                        var levelOne = TrafficResult.filter(free => {
                            // this.loading = false
                            return free.time_lapse.traffic_status == 1
                        })
                        self.levelOne = levelOne.length
                        self.levelOnePercentage = (parseFloat(self.levelOne) * 100)/parseFloat(resultLength)
                        console.log('free length ', resultLength)

                        var levelTwo = TrafficResult.filter(mild => {
                            // self.loading = false
                            return mild.time_lapse.traffic_status == 2
                        })
                        self.levelTwo = levelTwo.length
                        self.levelTwoPercentage = (self.levelTwo/resultLength) * 100
                        console.log('mild length ', levelTwo.length)

                        var levelThree = TrafficResult.filter(heavy => {
                            // self.loading = false
                            return heavy.time_lapse.traffic_status == 3
                        })
                        self.levelThree = levelThree.length
                        self.levelThreePercentage = (self.levelThree/resultLength) * 100
                        console.log('heavy length ', levelThree.length)
                        var levelFour = TrafficResult.filter(blocked => {
                            // self.loading = false
                            return blocked.time_lapse.traffic_status == 4
                        })
                        self.levelFour = levelFour.length
                        self.levelFourPercentage = (self.levelFour/resultLength) * 100
                        console.log('heavy length ', levelFour.length)
                        if (self.levelOne != null && self.levelTwo != null && self.levelThree != null && self.levelFour != null) {
                            var trafficData = {
                                levelOne: self.levelOne,
                                levelTwo: self.levelTwo,
                                levelThree: self.levelThree,
                                levelFour: self.levelFour
                            }
                            resolve(trafficData)
                        } else {
                            reject(Error)
                        }
                    })
                    waitForFilter.then(result => {
                    console.log('from promise ', result)
                    this.$Progress.finish()
                    this.loading = false
                    this.trafficData = [
                            { label: 'Free', value: result.levelOne },
                            { label: 'Mild', value: result.levelTwo },
                            { label: 'Heavy', value: result.levelThree },
                            { label: 'Blocked', value: result.levelFour }
                        ]  
                    },
                    error => {
                        this.$Progress.fail()
                        this.$toast.error('Unable to fetch!', 'OK', this.notificationSystem.options.error)
                        console.log('promise error ', error)
                    })
                }
                
                // this.trafficData = [
                //     { label: 'Free', value: this.LevelOne },
                //     { label: 'Mild', value: this.LevelTwo },
                //     { label: 'Heavy', value: this.LevelThree },
                //     { label: 'Blocked', value: this.LevelFour }
                // ]
                // this.loading = false
            })
            .catch(err => {
                this.$Progress.fail()
                 if (err.status == 400) {
                    this.$toast.error(err.body, 'OK', this.notificationSystem.options.error)   
                 } else {
                   this.$toast.error('Unable to fetch!', 'OK', this.notificationSystem.options.error)
                 }
                console.log('fetch failed ', err)
            })
        
    },
    getLevelOne(result) {
      var levelOne = result.filter(free => {
        this.loading = false
        return free.time_lapse.traffic_status == 1
      })
      this.levelOne = levelOne.length
      console.log('free length ', this.levelOne)
    },
     getLevelTwo(result) {
       var levelTwo = TrafficResult.filter(mild => {
        this.loading = false
        return mild.time_lapse.traffic_status == 2
      })
      this.levelTwo = levelTwo.length
      console.log('mild length ', levelTwo.length)
    },
     getLevelThree(result) {
        var levelThree = TrafficResult.filter(heavy => {
            this.loading = false
            return heavy.time_lapse.traffic_status == 3
        })
        this.levelThree = levelThree.length
        console.log('heavy length ', levelThree.length)
    },
     getLevelFour(result) {
        var levelFour = TrafficResult.filter(blocked => {
            this.loading = false
            return blocked.time_lapse.traffic_status == 4
        })
        this.levelFour = levelFour.length
    },
    postReport(status) {
          this.API = this.$store.state.api
          this.$http
            .post(`${this.API}/post-report`, {
                traffic_status: status,
                starting_point: this.location.start_point,
                ending_point: this.location.end_point
            })
            .then(
                response => {
                  if(response.status == 208) {
                    this.$toast.info(response.body.message, 'OK', this.notificationSystem.options.info)  
                  } else {
                    console.log('successful ', response)
                    this.$toast.success('Post successful!', 'OK', this.notificationSystem.options.success)
                  }
                })
                .catch(err => {
                  console.log('login error ', err)
                  this.$toast.error('Unable to post!', 'OK', this.notificationSystem.options.error)
                })
            
      },
  }
}
</script>