<template>
    <div>
         <!--<sideBar></sideBar>-->
        <!--<myHeader></myHeader>    -->
        <!--<notifications group="foo" class = "my-style"/>-->
        
         <router-view ></router-view>
         <vue-progress-bar></vue-progress-bar>
        <!--<myfooter></myfooter>-->
           
    </div>
</template>

<script>
    // import sideBar from './components/modules/navigation.vue'
    import myheader from './components/modules/header.vue'
    import footer from './components/modules/footer.vue'
    // import home from './components/home.vue'
    export default {
      name: 'app',
      data () {
        return {
          msg: 'Welcome to Your Vue.js App',
          max: '1'
        }
      },
      components: {
        // sideBar: sideBar,
        myHeader: myheader,
        myfooter: footer
        // 'home':home,
      }
    }
</script>
<style>
.my-style {
  opacity: 0.9;
}
.notification-title {
  font-size: 1.5em;
}
.notification-content {
  font-size: 1.3em;
}
</style>