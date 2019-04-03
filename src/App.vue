<template>
  <div id="app">
    <div class="content">
    <div class="Header">
      <Header @toBlur='blurred'/>
    </div>
    <div class="RightMenu">
      <RightMenu />
    </div>
    <div class="LeftMenu">
      <LeftMenu />
    </div>
    <router-view id='test' class="test"/>
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

export default {

  components:{
    Header, RightMenu, LeftMenu, Footer
  },

  data: function(){
    return{
      gsecurity: GSecurity,
    }
  },
  methods: {
    blurred(a){
      if(a) {
        $((document.getElementById('test'))).css("filter", "blur(12px)");
        $((document.getElementById('test'))).css("pointer-events", "none");

      } else {
        $((document.getElementById('test'))).css("filter", "blur(0px)");
        $((document.getElementById('test'))).css("pointer-events", "auto");
      }
    }
  },

  beforeCreate() {
    // Retreive store credentials
    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();
  },
}

</script>

<style>

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
