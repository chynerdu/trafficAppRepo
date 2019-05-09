<template>
    <div>
        <div id="page">
            <appHeader></appHeader>
            <div class="page-content-black"> </div>
            <div class="page-content" @click= "toggleFold">	        
                <div class="cover-wrapper cover-no-buttons">
                    <div data-height="cover" class="caption bottom-0">
                        <div class="caption-center">

                            <div class="left-50 right-50 top-50">
                                <h5 class="color-white center-text uppercase fa-2x bottom-20">Report Traffic</h5>
                                <p class="color-highlight center-text font-12 under-heading bottom-30">
                                    Report Traffic status in your current location
                                </p>
                                <div class="input-style input-light input-style-1 input-required">
                                    <span class="color-white" >Traffic From:</span>
                                    <em><i class="fa fa-angle-down"></i></em>
                                    <select v-model="start_point">
                                        <option value="default" disabled selected>Where You Dey Now?</option>
                                        <option value="Iyana-Ipaja">Iyana-Ipaja</option>
                                        <option value="Dopemu">Dopemu</option>
                                        <option value="Cement">Cement</option>
                                        <option value="Mangoro">Mangoro</option>
                                        <option value="Ikeja">Ikeja</option>
                                        <option value="Airport">Airport</option>
                                        <option value="PWD">PWD</option>
                                        <option value="Shogunle">Shogunle</option>
                                        <option value="Ladipo">Ladipo</option>
                                        <option value="Bolade">Bolade</option>
                                        <option value="Oshodi">Oshodi</option>
                                    </select>
                                </div>
                                <div class="input-style input-light input-style-1 input-required">
                                    <span class="color-white">To:</span>
                                    <em><i class="fa fa-angle-down"></i></em>
                                    <select v-model= "end_point">
                                        <option value="default" disabled selected>Where You Dey Go?</option>
                                        <option value="Iyana-Ipaja">Iyana-Ipaja</option>
                                        <option value="Dopemu">Dopemu</option>
                                        <option value="Cement">Cement</option>
                                        <option value="Mangoro">Mangoro</option>
                                        <option value="Ikeja">Ikeja</option>
                                        <option value="Airport">Airport</option>
                                        <option value="PWD">PWD</option>
                                        <option value="Shogunle">Shogunle</option>
                                        <option value="Ladipo">Ladipo</option>
                                        <option value="Bolade">Bolade</option>
                                        <option value="Oshodi">Oshodi</option>
                                    </select>
                                </div>  
                                <div class="clear"></div>
                                <button @click= "report" class="button button-full button-m btn-block shadow-large button-round-small bg-highlight top-30 bottom-0">Report Traffic</button>              
                                <!--<a href="#" class="back-button button button-full button-m shadow-large button-round-small bg-highlight top-30 bottom-0">Check Traffic/a>-->
                            </div>

                        </div>
                    </div>   
                    <div class="caption-overlay bg-black opacity-60"></div>
                    <div class="caption-bg" style="background-image:url(static/assets/img/pictures/34u.jpg)"></div>
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
      start_point: '',
      end_point: ''
    }
  },
  components: {
    // sideBar: sideBar,
    appHeader: appheader,
  },
  mounted(){
      console.log('traffic report')
  },
  methods: {
    toggleFold () {
        //   console.log('closed sidebar')
        document.getElementById('menu-1').classList.remove('menu-active')
    },
    report() {
    // this.$router.push('/select-status')
        this.$router.push({path: '/select-status', query: {start_point: this.start_point, end_point: this.end_point}})
        location.reload()
    }
  }
}
</script>