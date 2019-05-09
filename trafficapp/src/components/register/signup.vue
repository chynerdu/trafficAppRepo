<template>
    <div >
        <div class="page-content-black"> </div>
       <div class="page-content">	        
            <div class="cover-wrapper cover-no-buttons">
                <div data-height="cover" class="caption bottom-0">
                    <div class="caption-center">

                        <div class="left-50 right-50 top-50">
                            <h3 class="color-white center-text uppercase bold fa-2x">Register</h3>
                            <p class="color-highlight center-text font-12 under-heading bottom-30">
                                Create an Account. It's 100% free
                            </p>
                            <div class="input-style input-light has-icon input-style-1 input-required">
                                <i class="input-icon fa fa-user font-11"></i>
                                <span>First Name</span>
                                <em>(required)</em>
                                <input type="name" v-model= "first_name" placeholder="First Name">
                            </div> 
                            <div class="input-style input-light has-icon input-style-1 input-required">
                                <i class="input-icon fa fa-user font-11"></i>
                                <span>Last Name</span>
                                <em>(required)</em>
                                <input type="name" v-model= "last_name" placeholder="Last Name">
                            </div> 
                            <div class="input-style input-light has-icon input-style-1 input-required">
                                <i class="input-icon fa fa-at"></i>
                                <span>Email</span>
                                <em>(required)</em>
                                <input type="email" v-model= "email" placeholder="Email">
                            </div>         
                            <div class="input-style input-light has-icon input-style-1 input-required">
                                <i class="input-icon fa fa-lock font-11"></i>
                                <span>Password</span>
                                <em>(required)</em>
                                <input type="password" v-model= "password" placeholder="Choose a Password">
                            </div>          
                            <div class="input-style input-light has-icon input-style-1 input-required">
                                <i class="input-icon fa fa-lock font-11"></i>
                                <span>Password</span>
                                <em>(required)</em>
                                <input type="password" v-model= "confirm_password" placeholder="Confirm your Password">
                            </div>         
                            <a href="/login" class="color-white opacity-50 text-center font-11 top-30">Already Registered? Sign In here</a>
                            <a @click="signup" class=" button button-full button-m shadow-large button-round-small bg-highlight top-30 bottom-0">CREATE ACCOUNT</a>
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
      first_name: '',
      last_name: '',
      confirm_password: ''
    }
  },
  mounted(){
      console.log('traffic report')
    //   this.getTraffic()
  },
  methods: {
      signup() {
          this.API = this.$store.state.api
          if (this.password != this.confirm_password) {
              console.log('password mismatch')
          } else {
            this.$http
                .post(`${this.API}/signup`, {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    password: this.password
                })
                .then(
                    response => {
                        localStorage.setItem('user_token ', response.body.token)
                        console.log('successful ', response)
                        this.$router.push('/login')
                        location.reload()
                    
                    })
                    .catch(err => {
                        console.log('signup ', err)
                    })
          }
            
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