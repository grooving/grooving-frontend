<template>
  <div id="app">
    <div class="content">
    <div class="Header">
      <Header @toBlur='blurred' @refreshRightMenu="refreshRightMenu" />
    </div>
    <div class="RightMenu">
      <RightMenu  @samePage='samePage' :key="refreshRM"/>
    </div>
    <div class="LeftMenu">
      <LeftMenu @samePage='samePage' :key="refreshRM"/>
    </div>
    <router-view :key="$route.fullPath" id="mainContent"/>
    </div>
    <footer><Footer @samePage='samePage' @refreshRightMenu="refreshRightMenu"/></footer>
    <cookie-law :key="refreshC" theme="blood-orange--rounded">
      <div slot-scope="props">
        <p>
          {{gtrans.translate('cookies_msg')}}<router-link to="terms">{{gtrans.translate('cookies_link')}}</router-link>.
        </p>
        <button class="acceptButton" @click="props.accept"><span>{{gtrans.translate('accept_cookies')}}</span></button>
      </div>
    </cookie-law>
  </div>
</template>

<script>
import Header from "./components/menus/Header.vue"
import RightMenu from "./components/menus/RightMenu.vue"
import LeftMenu from "./components/menus/LeftMenu.vue"
import Footer from "./components/menus/Footer.vue"
import GSecurity from "./security/GSecurity.js"
import {mapActions} from 'vuex';
import CookieLaw from 'vue-cookie-law';
import GTrans from "@/utils/GTrans.js";

export default {

  components:{
    Header, RightMenu, LeftMenu, Footer, CookieLaw,
  },

  data: function(){
    return{
      gsecurity: GSecurity,
      gtrans: undefined,

      rightMenu: undefined,
      leftMenu: undefined,

      refreshRM: 1,
      refreshC: 1,
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
      $((document.getElementById('mainContent'))).css("filter", "none");
      $((document.getElementById('mainContent'))).css("pointer-events", "auto");
      $(document.body).css("overflow", "");
      this.clearStore();
      this.refreshRM++;
    },
  }, 

  watch:{
    $route (to, from){
        this.refreshC++;
    }
  },

  created: function(){
    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();

    this.gtrans = new GTrans(this.gsecurity.getLanguage());
    
    // Podemos cambiar el lenguaje así para debug...
    //this.gtrans.setLanguage('es')
    //this.gtrans.setLanguage('en')
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

<style scoped>
.Cookie {
  font-size: 18px;
  display: flex;
  justify-content: center;
}

button {
  font-size: 20px;
  font-weight:bold;
  
  border: none;
  border-radius: 30px;
  color: white;
  padding: 5px;
  padding-left:10px;
  padding-right:10px;
  margin-left: 5px;
  margin-right: 5px;
}

.acceptButton {
  background-image: linear-gradient(to right, #00fb82, #187fe6);
}

.acceptButton:hover{
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.7) !important;
  background-image: linear-gradient(to right, #14ca9f, #1648d0) !important;
}

a {
 color: #187fe6; 
}

a:hover {
  color: #1648d0;
}
</style>

