<template>
    <div>
        <div id="page">
            <appHeader></appHeader>    
            <div class="page-content header-clear-large" @click= "toggleFold">	   
                <div class="content">
                    <h2 class="bolder">Reporting Traffic</h2>
                    <p class="under-heading color-highlight font-10 bottom-10">Status was last updated about 35 minutes ago</p>
                    <p>
                        Traffic status from <span class="bold">{{location.start_point}}</span> To <span class="bold">{{location.end_point}} </span>
                    </p>
                </div>
                
                <div class="content">
                    <div class="link-list link-list-3">
                        <p @click.prevent= 'postReport(1)' class="round-small shadow-tiny">
                            <i class="fa fa-server font-18 color-blue2-dark"></i>
                            <span>The Road Is Free</span>
                            <strong>No traffic the road is free.</strong>
                            <em class="color-green1-dark">Online</em>
                            <i class="fa fa-check-circle color-green1-dark"></i>
                        </p>
                    </div>        
                    <div class="link-list link-list-3">
                        <p @click.prevent= 'postReport(2)' class="round-small shadow-tiny">
                            <i class="fa fa-mobile font-18 color-red2-dark"></i>
                            <span>Traffic is mild</span>
                            <strong>No major traffic, just some few stops. </strong>
                            <em class="color-green1-dark">Online</em>
                            <i class="fa fa-check-circle color-green1-dark"></i>
                        </p>
                    </div>           
                    <div class="link-list link-list-3">
                        <p @click.prevent= 'postReport(3)' class="round-small shadow-tiny">
                            <i class="fa fa-comment font-18 color-green1-dark"></i>
                            <span>Heavy Traffic</span>
                            <strong>Major traffic along the road</strong>
                            <em class="color-green1-dark">Online</em>
                            <i class="fa fa-check-circle color-green1-dark"></i>
                        </p>
                    </div>           
                    <div class="link-list link-list-3">
                        <p @click.prevent= 'postReport(4)' class="round-small shadow-tiny">
                            <i class="fa fa-shopping-bag font-18 color-brown1-dark"></i>
                            <span>Road Is Blocked</span>
                            <strong>The road is blocked, alternative route advised</strong>
                            <em class="color-yellow1-dark">INCIDENT</em>
                            <i class="fa fa-exclamation-triangle color-yellow1-dark"></i>
                        </p>
                    </div>   
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import appheader from '../modules/header.vue'
export default {
  data () {
    return {
      phone_no: '',
      password: '',
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
      }
    }
  },
  components: {
    // sideBar: sideBar,
    appHeader: appheader,
  },
  created(){
      console.log('traffic report ')
      console.log('from query: ', this.$route.query)
  },
  computed: {
      location() {
          return this.$route.query
      }
  },
  methods: {
    toggleFold () {
    //   console.log('closed sidebar')
    document.getElementById('menu-1').classList.remove('menu-active')
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