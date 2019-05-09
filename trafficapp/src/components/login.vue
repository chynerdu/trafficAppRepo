<template>
 <div>

  
    <div class="page-content-black"></div>    
    
	<div class="page-content">	
        <div class="cover-wrapper cover-no-buttons">
            <div data-height="cover" class="caption bottom-0">
                <div class="caption-center">

                    <div class="left-50 right-50 top-50">
                        <form  >
                        <h3 class="color-white center-text uppercase bold fa-2x">LOGIN</h3>
                        <p class="color-highlight center-text font-12 under-heading bottom-30 top-5">
                            Let's get you in your account
                        </p>
                        <div class="input-style input-light has-icon input-style-1 input-required">
                            <i class="input-icon fa fa-user font-11"></i>
                            <span>Username</span>
                            <em>(required)</em>
                            <input type="name" v-model= "email" placeholder="Username">
                        </div> 
                        <div class="input-style input-light has-icon input-style-1 input-required bottom-30">
                            <i class="input-icon fa fa-lock font-11"></i>
                            <span>Password</span>
                            <em>(required)</em>
                            <input type="password" v-model= "password" placeholder="Password">
                        </div>          
                        <div class="one-half">
                           <a href="/signup"  class="font-11 color-white opacity-50">Create Account</a>
                        </div>
                        <div class="one-half last-column">
                            <a href="pageapp-forgot.html" class="text-right font-11 color-white opacity-50">Fogot Credentials</a>
                        </div>
                        <div class="clear"></div>
                        <a @click="login" class="button button-full button-m shadow-large button-round-small bg-highlight top-30 bottom-0">LOGIN</a>
                        </form>
                    </div>

                </div>
            </div>   
            <div class="caption-overlay bg-black opacity-60"></div>
            <div class="caption-bg" style="background-image:url(static/assets/img/pictures/34u.jpg)"></div>
        </div>
    </div>
        
    <div id="menu-1" class="menu menu-box-left" 
         data-menu-width="250"
         data-menu-load="menu.html"
         data-menu-effect="menu-over"
         data-menu-select="page-pageapps">
    </div>                
        
    
    <div class="menu-hider"></div>

</div>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      email: '',
      password: '',
      notificationSystem: {
        options: {
            success: {
            position: "bottomRight"
          },
          warning: {
            position: "topLeft"
          },
          error: {
            position: "topRight"
          },
        }
      }
    }
  },
  mounted(){
      console.log('traffic report')
    //   this.getTraffic()
  },
  methods: {
      login() {
          this.API = this.$store.state.api
          this.$http
            .post(`${this.API}/login`, {
                email: this.email,
                password: this.password
            })
            .then(
                response => {
                  var token = window.btoa(response.body.token)
                  localStorage.setItem('user_token', token)
                  console.log('successful ', response)
                  var user = {
                      firstName: response.body.first_name,
                      email: response.body.email
                  }
                  localStorage.setItem('user', JSON.stringify(user))
                  this.$toast.success('Successfully logged in!', 'OK', this.notificationSystem.options.success)
                  this.$router.push('/traffic-report')
                  location.reload()
                //   var promise = new Promise(function(resolve, reject) {
                //    console.log('token here ', localStorage.getItem('user_token'))
                //    if (localStorage.getItem('user_token') != null) {
                //        resolve(true)
                //    } else {
                //        reject(Error)
                //    }
                //   })
                //   promise.then(result => {
                //     console.log('token from promise ', result)
                //      this.$http
                //         .get('http://127.0.0.1:8084/user')
                //         .then(response => {
                //             console.log('user info ', response)
                //         },
                //         error => {
                //             console.log('error fetching user ', error)
                //         })
                //   }, 
                //     error => {
                //         console.log('token not set')
                //     })
                  
                })
                .catch(err => {
                  console.log('login error ', err)
                  this.$toast.error(err.body, 'Failed', this.notificationSystem.options.error)
                })
            
      },
      getTraffic() {
          this.$http
            .get('http://127.0.0.1:8084/notes')
            .then(
                response => {
                  console.log('all traffic', response)
                })
                .catch(err => {
                  console.log('fetch failed ', err)
                })
            
      }
  }
}
</script>