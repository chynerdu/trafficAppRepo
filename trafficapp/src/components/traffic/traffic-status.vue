<template>
    <div >
        <div id="page">
            <appHeader></appHeader>
            <div class="page-content-black"> </div>
            <div class="page-content" @click= "toggleFold">	        
                <div class="cover-wrapper cover-no-buttons">
                    <div data-height="cover" class="caption bottom-0">
                        <div class="caption-center">

                            <div class="left-20 right-20 top-50">
                                <h3 class="color-white center-text uppercase bottom-20">Check Traffic</h3>
                                <p class="color-highlight center-text font-12 under-heading bottom-30">
                                    Enter starting point and your destination
                                </p>
                                <div class="input-required bottom-30">
                                    <span class="color-white" >Where You Dey Now?</span>
                                    <em><i class="fa fa-angle-down"></i></em>
                                    <multiselect v-model="start_point" :options="options" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Select Start Point"></multiselect>
                                </div>
                                <div class="input-required  bottom-30">
                                    <span class="color-white">Where You Dey Go?</span>
                                    <em><i class="fa fa-angle-down"></i></em>
                                   <multiselect v-model="end_point" :options="options" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Select Destination"></multiselect>
                                </div>  
                                <div class="clear"></div>
                                <a @click= "result" class="button button-full button-m shadow-large button-round-small bg-highlight top-30 bottom-0">Check Traffic</a>              
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
import Multiselect from 'vue-multiselect'
export default {
  data () {
    return {
      phone_no: '',
      password: '',
      start_point: '',
      end_point: '',
    //   options: ['Select option', 'options', 'selected', 'mulitple', 'label', 'searchable', 'clearOnSelect', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched']
      options: ['Iyana-Ipaja','Dopemu','Cement', 'Mangoro', 'Ikeja',  'Airport', 'PWD', 'Shogunle', 'Ladipo', 'Bolade','Oshodi']                                 
    }
  },
  components: {
    // sideBar: sideBar,
    appHeader: appheader,
    Multiselect
  },
  mounted(){
      console.log('traffic status')
  },
  methods: {
    toggleFold () {
        //   console.log('closed sidebar')
        document.getElementById('menu-1').classList.remove('menu-active')
    },
    result() {
    // this.$router.push('/select-status')
        this.$router.push({path: '/traffic-result', query: {start_point: this.start_point, end_point: this.end_point}})
        location.reload()
    }
    
    //   report() {
    //       this.$router.push('/select-status')
    //     //   location.reload()
    //   }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
