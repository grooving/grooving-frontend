<template>
  <div id="app">
    <div class="content">
    <div class="Header">
      <Header @toBlur='blurred' @refreshRightMenu='refreshRightMenu'/>
    </div>
    <div class="RightMenu">
      <RightMenu @samePage='samePage' :key="refreshRM"/>
    </div>
    <div class="LeftMenu">
      <LeftMenu @samePage='samePage'/>
    </div>
    <router-view :key="$route.fullPath" id="mainContent"/>
    </div>
    <footer><Footer/></footer>
  </div>
</template>

<script>
import Header from "./components/menus/Header.vue"
import RightMenu from "./components/menus/RightMenu.vue"
import LeftMenu from "./components/menus/LeftMenu.vue"
import Footer from "./components/menus/Footer.vue"
import GSecurity from "./security/GSecurity.js"
import {mapActions} from 'vuex';

export default {

  components:{
    Header, RightMenu, LeftMenu, Footer
  },

  data: function(){
    return{
      gsecurity: GSecurity,
      rightMenu: undefined,
      leftMenu: undefined,
      refreshRM: 1,
    }
  },
  methods: {
    ...mapActions(['clearStore']),
    blurred(a){
      if(a) {
        $((document.getElementById('mainContent'))).css("filter", "blur(12px)");
        $((document.getElementById('mainContent'))).css("pointer-events", "none");
        $(document.body).css("overflow", "hidden");
      } else {
        $((document.getElementById('mainContent'))).css("filter", "none");
        $((document.getElementById('mainContent'))).css("pointer-events", "auto");
        $(document.body).css("overflow", "");
      }
    },
    samePage(){
        $((document.getElementById('mainContent'))).css("filter", "none");
        $((document.getElementById('mainContent'))).css("pointer-events", "auto");
        $(document.body).css("overflow", "");

        this.clearStore();
    },
    refreshRightMenu() {
      console.log('furula')
      $((document.getElementById('mainContent'))).css("filter", "none");
      $((document.getElementById('mainContent'))).css("pointer-events", "auto");
      $(document.body).css("overflow", "");
      this.clearStore();
      this.refreshRM++;
    },
  },
  beforeCreate() {
    // Retreive store credentials
    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();


  },
  beforeUpdate() {
    this.rightMenu = this.$store.getters.sideMenus.rightMenu;
    this.leftMenu = this.$store.getters.sideMenus.leftMenu;

    if (!this.leftMenu && !this.rightMenu) {
        $(document.body).css("overflow", "");
    }
  },
}
</script>

<style>

* {
    font-family: "Archivo"
}

html{ height:100%; }
body{ min-height:100%; padding:0; margin:0; position:relative; }


body::after {
  content: '';
  display: block;
  height: 100px; /* Set same as footer's height */
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
}

.content{
  height: auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  display: table;
  height: 100%;
  width: 100%;

}

@media (max-width: 768px) {

  body::after {
    content: '';
    display: block;
    height: 10px; /* Set same as footer's height */
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 0px;
    display: none;
  }
}
</style>
