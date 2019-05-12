<template>
    <div>
        <div id="page">
            <appHeader></appHeader>
    
            <div class="page-content" @click= "toggleFold">	        
                <!--<div class="cover-wrapper cover-no-buttons">-->
                    <div >
                        <div>

                            <div class="top-50 bottom-50">
                                
                                <div class="content">
                                    <h3 class=" uppercase pt40 bottom-20">Report Traffic</h3>
                                    <p class="color-highlight  font-12 under-heading bottom-30">
                                        Report Traffic status in your current location
                                    </p>
                                  <template>
                                    <div>
                                        <div>
                                        <h5>Select From Map</h5>
                                        <label>
                                            <gmap-autocomplete
                                            @place_changed="setPlace">
                                            </gmap-autocomplete>
                                            <button @click="addMarker" class="btn bg-blue2-dark">Add</button>
                                        </label>
                                        <br/>

                                        </div>
                                        <br>
                                        <gmap-map
                                        :center="center"
                                        :zoom="12"
                                        style="width:100%;  height: 400px;"
                                        >
                                        <gmap-marker
                                            :key="index"
                                            v-for="(m, index) in markers"
                                            :position="m.position"
                                            @click="center=m.position"
                                        ></gmap-marker>
                                        </gmap-map>
                                    </div>
                                    </template>   
                                </div>
                                <div class="content mb48 pb40">
                                    <div class="divider-icon bg-highlight">
                                        <i class="fa font-17 color-blue2-dark ">Or</i>
                                    </div>
                                    <h5 class="bottom-30">Select Location</h5>
                                    <div class=" input-required bottom-30">
                                        <h6 class="text-dark" >Traffic From:</h6>
                                         <multiselect v-model="start_point" :options="options" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Select Start Point"></multiselect>
                                    </div>
                                    <div class=" input-required bottom-30">
                                        <h6 class="text-dark">To:</h6>
                                        <multiselect v-model="end_point" :options="options" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Select Destination"></multiselect>
                                    </div>  
                                    
                                    
                                    <a @click= "report" class="button button-full button-m shadow-large button-round-small bg-highlight top-30">Report Traffic</a>           
                                </div>   
                                <!--<a href="#" class="back-button button button-full button-m shadow-large button-round-small bg-highlight top-30 bottom-0">Check Traffic/a>-->
                            </div>

                        </div>
                    </div>   
                    <!--<div class="caption-overlay bg-black opacity-60"></div>-->
                    <!--<div class="caption-bg" style="background-image:url(static/assets/img/pictures/34u.jpg)"></div>-->
                </div>                                  
            </div>
        </div>
    </div>
</template>
<script>
import appheader from '../modules/header.vue'
import * as VueGoogleMaps from "vue2-google-maps";
export default {
  data () {
    return {
      phone_no: '',
      name: "GoogleMap",
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      password: '',
      start_point: '',
      end_point: '',
      options: ['Iyana-Ipaja','Dopemu','Cement', 'Mangoro', 'Ikeja',  'Airport', 'PWD', 'Shogunle', 'Ladipo', 'Bolade','Oshodi']                                 
    }
  },
  components: {
    // sideBar: sideBar,
    appHeader: appheader,
  },
  mounted(){
      console.log('traffic report')
      this.geolocate()
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
    },
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log('cordinates ', this.center)
      });
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>