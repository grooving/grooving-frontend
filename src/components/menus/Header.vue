<template>
  <div id="test1">
    <nav id="mainNavBar" class="navbar navbar-light bg-light">
      <div id="navBarLeft" class="vertical-center" >
        <div id="navBarLogo" class="navbar-brand vertical-center">
          <button class="d-inline d-md-none navbar-toggler no-border pt-0 collapsL" @click="sideMenusB(1)" id="collapsL" role="button" data-toggle="collapse"
          data-target="#sidebarleft" >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="ml-2 vertical-center goTo" @click="goTo('/')">
            <img src="@/assets/logos/logo_name.png" width="100px">
          </div>
        </div>
      </div>
      <div id="navBarDesktopLinks" class="d-none d-md-block mr-auto">
        <ul class="navbar-nav row-alignment right-float">
          <li v-for="item in userVisibleLinks" :key="item.text" class="nav-item mx-2 goTo" v-bind:class="{active: item.selected}">
            <div class="nav-link font" @click="goTo(item.link)">{{item.text}}</div>
          </li>
        </ul>
      </div>
      <div id="navBarRightWrapper" class="ml-auto align-middle">
        <ul id="navBarRight" class="navbar-nav row-alignment">
          <li id="navBarSearchComponent" class="nav-item active mx-2 right-float vertical-center">
            <div class="d-md-none">
              <a class="nav-link" href="#" @click="toggleSearchPanel()">
                <i class="material-icons align-middle">search</i>
              </a>
            </div>
            <div class="d-none d-md-inline nav-item">
              <form class="form-inline">
                <input id="searchFormDesktop" v-model="searchQuery" class="form-control mr-sm-2" style="border-radius:100px;"
                type="search" placeholder="Search" aria-label="Search" @keypress.enter="search()">
                <button class="btn" type="button" @click="search()">
                  <i class="material-icons align-middle">search</i>
                </button>
              </form>
            </div>
          </li>
          <div id="navBarUserComponent" >
            <li v-if="gsecurity.isAuthenticated()" class="nav-item mx-2 right-float vertical-center ">
              <button role="button" class="collaps" id="collaps" @click="sideMenusB(2)" data-toggle="collapse" data-target="#sidebar" >
                <a class="nav-link vertical-center" href="#">
                  <img v-if="userPhoto == null || userPhoto == '' || userPhoto == 'null'" src="@/assets/defaultPhoto.png"
                  class="profileImage" alt="Profile Image">
                  <img v-else v-bind:src="userPhoto" :key="userPhoto" class="profileImage" alt="Profile Image">
                </a>
              </button>
            </li>
            <li v-else>
              <b-dropdown :disabled="loginDisabled" id="ddown-form" ref="ddown" class="m-2" right>
                <template slot="button-content">
                  <i class="material-icons align-middle">account_circle</i>
                </template>
                <b-dropdown-form class="loginDropdown">
                  <b-form-group class="loginLabel" label="Log In" label-for="ddown-form-email">
                    <b-form-input
                      class="loginInput"
                      v-model="input.username"
                      size="sm"
                      placeholder="Username"
                      id="ddown-form-email"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <b-form-input id="ddown-form-passwd" class="loginInput" v-on:keydown.enter="login()" v-model="input.password"
                    type="password" size="sm" placeholder="Password"></b-form-input>
                  </b-form-group>
                  <b-button class="continueButton" variant="primary" size="sm" v-on:click="login()">SIGN IN</b-button>
                </b-dropdown-form>
                <b-dropdown-divider/>
                <router-link to="newUser">
                <b-dropdown-item-button class="dropdownButton">
                  <span>New around here? </span>
                  <span class="signUp">Sign up</span>
                </b-dropdown-item-button>
                </router-link>
              </b-dropdown>
            </li>
          </div>
        </ul>
      </div>
    </nav>
    <Search v-if="showSearchMenu" @changeQuery="changeQueryMobile" @closeSearch="toggleSearchPanel()" />
  </div>
</template>

<script>
import Search from "./Search.vue";
import GSecurity from "@/security/GSecurity.js";
import {mapActions} from 'vuex';

const ARTIST_SEARCH_URI = "#/artist_search?artisticName=";

export default {
  name: "Header",

  components: {
    Search
  },
  watch:{
    $route (to, from){
        this.leftMenu = false;
        this.rightMenu = false;
    }
  }, 

  data: function() {
    return {
      menu_links: [
        {
          text: "Top Artists",
          link: "/topArtists",
          selected: false,
          requiedRoles: []
        },
        {
          text: "My Offers",
          link: "/offers",
          selected: false,
          requiedRoles: ["CUSTOMER", "ARTIST"]
        },
        {
          text: "QR Scan",
          link: "/receivePayment",
          selected: false,
          requiedRoles: ["ARTIST"]
        },
        /*{ text: "FAQs", link: "/#", selected: false, requiedRoles: [] }*/
      ],
      showSearchMenu: false,
      leftMenu: false,
      rightMenu: false,
      searchQuery: "",
      input: {
        username: "",
        password: ""
      },
      gsecurity: GSecurity,
      loginDisabled: false,
      userPhoto: "",
      sameURL: true,
      thisURL: undefined,
    };
  },

  computed: {
    userVisibleLinks: function() {
      return this.menu_links.filter(
        item =>
          item.requiedRoles.length == 0 ||
          item.requiedRoles.includes(this.gsecurity.getRole())
      );
    }
  },

  methods: {
    ...mapActions(['clearStore', 'setURL', 'setRightMenu', 'setLeftMenu']),
    changeQueryMobile: function() {
      this.searchQuery = arguments[0];
      this.search();
    },
    goTo(path) {
        this.$emit('refreshRightMenu');
        this.url = this.$store.getters.sideMenus.url;
        if(this.url !== path) {
            this.setURL(path);
            this.clearStore().then(() => this.$router.push(path));  
        } else {
          this.$emit('samePage')
        }
    },

    login: async function() {

      var log_result = await this.gsecurity.authenticate(this.input.username, this.input.password)

      if (log_result) {
        this.$router.push({ path: "/" });
      } else {
        $('#ddown-form-email, #ddown-form-passwd').css('border-color', 'red');
      }
    },
    refreshGSecurityData: function() {
      this.userPhoto = this.gsecurity.getPhoto();
    },

    search: function() {
      window.location = ARTIST_SEARCH_URI + this.searchQuery;
      window.location.reload();
    },


    sideMenusB(a) {
        this.rightMenu = this.$store.getters.sideMenus.rightMenu;
        this.leftMenu = this.$store.getters.sideMenus.leftMenu;
        if(a == 1) {
          if(this.rightMenu && !this.leftMenu) {
            $('#collaps').click();
            this.setRightMenu(false);
          } 
          this.setLeftMenu(!this.leftMenu);
        } 
        if (a == 2) {
            if(!this.rightMenu && this.leftMenu) {
              $('#collapsL').click();
              this.setLeftMenu(false);
            }
            this.setRightMenu(!this.rightMenu);
        }
        this.loginDisabled = !this.loginDisabled;

        this.rightMenu = this.$store.getters.sideMenus.rightMenu;
        this.leftMenu = this.$store.getters.sideMenus.leftMenu;
        if (this.leftMenu || this.rightMenu) {
          this.$emit('toBlur', true);
        } else {  
          this.$emit('toBlur', false);
        }
      },

    toggleSearchPanel: function() {
      this.showSearchMenu = !this.showSearchMenu;

      if (this.showSearchMenu) {
        $(document.body).css("overflow", "hidden");
      } else {
        $(document.body).css("overflow", "");
      }
    }
  },

  created() {
    // Retreive store credentials
    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();

    // Update data that depends on GSecurity
    this.refreshGSecurityData();
  },

  mounted: function() {
    $("button").removeClass("dropdown-toggle");

    this.userPhoto = this.gsecurity.getPhoto();

    // Update searchbar value
    var queries = this.$route.query;

    // If either artisticName or artisticGender is set, update them
    if (queries["artisticName"] != undefined)
      this.searchQuery = queries["artisticName"];
    else if (queries["artisticGender"] != undefined)
      this.searchQuery = queries["artisticGender"];
  },

  beforeUpdate: function() {
    // Retreive store credentials
    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();

    // Update data that depends on GSecurity
    this.refreshGSecurityData();

  },
  updated() {
    this.leftMenu = false;
    this.rightMenu = false;
  }
};
</script>

<style>

  a:-webkit-any-link {
    text-decoration: none;
  }

  .btn-secondary {
    color: #212529;
    background-color: transparent;
    border-color: transparent;
  }

  .btn-secondary.disabled,
  .btn-secondary:disabled {
    color: #000000;
    background-color: transparent;
    border-color: transparent;
  }

  .btn-secondary:hover {
    color: #212529;
    background-color: transparent;
    border-color: transparent;
  }

  .btn-secondary:not(:disabled):not(.disabled).active,
  .btn-secondary:not(:disabled):not(.disabled):active,
  .show > .btn-secondary.dropdown-toggle {
    color: #000000;
    background-color: transparent;
    border-color: transparent;
  }

  .dropdown-toggle::after {
    display: none;
  }

  .dropdown-menu.show {
    padding-bottom: 0px;
  } 

  .goTo {
      cursor: pointer;
      background-color: transparent;
      color: #007bff;
  }

  .goTo:hover {
      color: #0056b3;
  }

  .navbar {
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.3) !important;
  }
  
</style>


<style scoped>

  .collaps {
    border: 0ch;
    background: transparent;
  }

  .continueButton {
    font-size: 18px;
    padding-left: 4%;
    padding-right: 4%;
    border: none;
    border-radius: 30px;
    width: 80%;
    font-weight: bold;
    background-image: linear-gradient(to right, #00fb82, #187fe6);
  }

  .continueButton:hover {
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.7) !important;
    background-image: linear-gradient(to right, #14ca9f, #1648d0) !important;
  }

  .dropdownButton {
    color: gray;
    text-align: center;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .dropdownButton:hover {
    background-image: linear-gradient(to right, #b5ffdb, #a8c9ea);
  }

  .font {
    font-family: "Archivo";
  }

  input:focus {
    border-color: #00fb82;
    font-weight: semibold;
    color: black;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.7) !important;
  }

  .test {
    border-color: red;
    font-weight: semibold;
    color: black;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.7) !important;
  }

  input:focus {
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
  }

  input:hover {
    border-color: #187fe6;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.3) !important;
  }

  .loginDropdown {
    padding: 20px;
    text-align: center;
  }

  .loginInput {
    border-radius: 25px;
  }

  .loginLabel {
    text-align: center;
    font-weight: bold;
    font-size: 30px;
  }

  .material-icons:hover {
    background: -webkit-linear-gradient(left, #00fb82, #187fe6);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  #mainNavBar {
    box-sizing: content-box;
    padding-top: 0px;
    padding-bottom: 0px;
  }

  nav {
    height: 75px;
  }

  #navBarLogo{
    margin-right: 0px;
  }

  .no-border {
    border: none;
  }

  .profileImage {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 25px;
  }

  .profileImage:hover {
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.5) !important;
  }

  .right-float {
    float: right;
  }

  .row-alignment {
    flex-direction: row;
  }


  select:focus {
    border-color: #00fb82;
    font-weight: semibold;
    color: black;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.7) !important;
  }

  @media (min-width: 900px) {
    .searchBar:focus {
      width: 350px;
      box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
    }
  }

  select:hover {
    border-color: #187fe6;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.5) !important;
  }

  .signUp {
    font-weight: bold;
  }

  .vertical-center {
    display: flex;
    align-items: center; /*Aligns vertically center */
    justify-content: center; /*Aligns horizontally center */
  }

</style>


