<template>
    <div>
        <div class="header header-fixed header-logo-app" @click="toggleFold">
            <a href="#" class="header-title ultrabold"><span class="color-highlight">TRA</span>FIK</a>
            <a href="#" class="header-icon header-icon-1" data-menu="menu-1"><i class="fas fa-bars"></i></a>
            <a href="#" class="header-icon header-icon-2" data-menu="menu-2"><i class="fas fa-cog"></i></a>
            <a href="#" class="header-icon header-icon-3" data-toggle-theme><i class="fas fa-moon"></i></a>
	    </div>
        <!-- left navigation -->
        <div id="menu-1"  @click="toggleFold" class="menu menu-box-left" 
            data-menu-width="250"
            data-menu-effect="menu-over"
            data-menu-select="page-home">
            
            <!-- menu info -->   
            <a href="#" class="nav-title color-theme"><span class="color-highlight">TRA</span>FIK</a>
            <span class="nav-text color-theme opacity-50">Stay updated.</span>

            <div class="nav nav-medium">
                <span class="nav-text color-theme opacity-50">Welcome: {{user.firstName}}</span>
                <div class="divider"></div> 
                 <router-link to= "/traffic-status"  id="page-home" >
                    <i class="fa fa-eye color-green1-dark"></i><span>Check Traffic</span><i class="fa fa-angle-right"></i>
                </router-link>  
                <router-link to= "/traffic-report"  id="page-home">
                    <i class="fa fa-pen color-green1-dark"></i><span>Post Traffic</span><i class="fa fa-angle-right"></i>
                </router-link>  
                <router-link to= "/signup"  id="page-home" >
                    <i class="fa fa-cog color-green1-dark"></i><span>Setting</span><i class="fa fa-angle-right"></i>
                </router-link>  
                <a @click= "logout">
                    <i class="fa fa-star color-yellow1-light"></i><span>Logout</span><i class="fa fa-angle-right"></i>
                </a>   
                <div class="divider top-15"></div>
                <p>Copyright <span class="copyright-year"></span> - Enabled. All rights Reserved.</p>
            </div>
        </div>  

        <!-- right naviagtion -->
         <div id="menu-2" class="menu menu-box-right"  data-menu-width="75" data-menu-effect="menu-over">
                    
            <div class="highlight-changer">
                <a href="#" data-change-highlight="red1"><i class="fa fa-circle color-red1-dark"></i><span class="color-red2-light">Red</span></a>    
                <a href="#" data-change-highlight="orange"><i class="fa fa-circle color-orange-dark"></i><span class="color-orange-light">Orange</span></a>    
                <a href="#" data-change-highlight="pink2"><i class="fa fa-circle color-pink2-dark"></i><span class="color-pink2-light">Pink</span></a>    
                <a href="#" data-change-highlight="magenta2"><i class="fa fa-circle color-magenta2-dark"></i><span class="color-magenta2-light">Purple</span></a>    
                <a href="#" data-change-highlight="blue2"><i class="fa fa-circle color-blue2-dark"></i><span class="color-blue2-light">Blue</span></a>
                <a href="#" data-change-highlight="aqua"><i class="fa fa-circle color-aqua-dark"></i><span class="color-aqua-light">Aqua</span></a>      
                <a href="#" data-change-highlight="teal"><i class="fa fa-circle color-teal-dark"></i><span class="color-teal-light">Teal</span></a>      
                <a href="#" data-change-highlight="mint"><i class="fa fa-circle color-mint-dark"></i><span class="color-mint-light">Mint</span></a>      
                <a href="#" data-change-highlight="green2"><i class="fa fa-circle color-green2-dark"></i><span class="color-green2-light">Green</span></a>    
                <a href="#" data-change-highlight="green1"><i class="fa fa-circle color-green1-dark"></i><span class="color-green1-light">Grass</span></a>       
                <a href="#" data-change-highlight="yellow2"><i class="fa fa-circle color-yellow2-dark"></i><span class="color-yellow2-light">Sunny</span></a>    
                <a href="#" data-change-highlight="yellow1"><i class="fa fa-circle color-yellow1-dark"></i><span class="color-yellow1-light">Goldish</span></a>
                <a href="#" data-change-highlight="brown1"><i class="fa fa-circle color-brown1-dark"></i><span class="color-brown1-light">Wood</span></a>    
                <a href="#" data-change-highlight="brown2"><i class="fa fa-circle color-brown2-dark"></i><span class="color-brown2-light">Earth</span></a>
                <a href="#" data-change-highlight="dark1"><i class="fa fa-circle color-dark1-dark"></i><span class="color-dark1-light">Night</span></a>
                <a href="#" data-change-highlight="dark2"><i class="fa fa-circle color-dark2-dark"></i><span class="color-dark2-light">Dark</span></a>
                <a href="#" data-change-highlight="gray2"><i class="fa fa-circle color-gray2-dark"></i><span class="color-gray2-light">Gray</span></a>
            </div>                        
        </div> 
    </div>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      email: '',
      password: '',
      user: {}
    }
  },
  mounted() {
      this.user = JSON.parse(this.$store.state.user)
      console.log('user ', this.user)
  },
  methods: {
    toggleFold () {
        //   console.log('closed sidebar')
        document.getElementById('menu-1').classList.remove('menu-active')
    },
    logout() {
        localStorage.clear()
        this.$router.push('/login')
    }
    }
}
  </script>