<template>
  <div class="LeftMenu">
   
     <div class="collapse navbar-collapse width px-2 bg-light" id="sidebarleft">
         <p>
         <div class="navContent">
         <h2 class="title">{{gtrans.translate('menu')}}</h2>
            <ul class="navbar-nav mr-auto p-2 col align-self-center justify-content-center">
                <li v-if="!gsecurity.hasRole('ADMIN')" class="nav-item section">
                    <div class="nav-link goTo" @click="goTo('/topArtists')" data-toggle="collapse" data-target="#sidebarleft" >{{gtrans.translate('topArtists')}}</div> 
                    <b-dropdown-divider v-if="!gsecurity.hasRole('ADMIN')" class="divider"/>
                </li>
                <li v-if="!gsecurity.hasRole('ADMIN') && gsecurity.isAuthenticated()" class="nav-item section">
                    <div class="nav-link goTo" @click="goTo('/offers')" data-toggle="collapse" 
                    data-target="#sidebarleft" >{{gtrans.translate('myOffers')}}</div>
                    <b-dropdown-divider v-if="gsecurity.isAuthenticated()" class="divider"/>
                </li>
                
                <li v-if="gsecurity.hasRole('ARTIST')" class="nav-item section">
                    <div class="nav-link goTo" @click="goTo('/receivePayment')" data-toggle="collapse" data-target="#sidebarleft">{{gtrans.translate('checkIn')}}</div>
                    <b-dropdown-divider v-if="gsecurity.hasRole('ARTIST')" class="divider"/>
                </li>
                <li class="nav-item section">
                    <div class="nav-link goTo" @click="goTo('/terms')" data-toggle="collapse" data-target="#sidebarleft" >{{gtrans.translate('termsAndConditions')}}</div> 
                    <b-dropdown-divider class="divider"/>
                </li>
                <li class="nav-item section">
                    <div class="nav-link goTo" @click="goTo('/about')" data-toggle="collapse" data-target="#sidebarleft" >{{gtrans.translate('aboutUs')}}</div> 
                    <b-dropdown-divider class="divider"/>
                </li>

                <li class="nav-item section">
                    <div class="nav-link goTo" data-toggle="collapse" data-target="#sidebarleft" ><span class="link" @click="changeLanguage('en')">EN |</span><span></span><span class="link" @click="changeLanguage('es')"> ES</span></div>
                </li>
                
                <!-- <li class="nav-item section">
                    <a class="nav-link" href="#" data-toggle="collapse" data-target="#sidebarleft">FAQ</a>
                </li> -->
            </ul>
        </div>
        </div>
  </div>
</template>


<!-- Script -->
 
<script>
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js"
import {mapActions} from 'vuex';
import endpoints from '@/utils/endpoints.js';
import GAxios from '@/utils/GAxios.js';


export default {
  name: 'LeftMenu',
    props: {
        blur: {
            type: Boolean,
        }  
    },
    data: function(){
        return{
            gsecurity: GSecurity,
            url: undefined,
            gtrans: undefined,
        }
    },
    methods: {
        ...mapActions(['clearStore', 'setURL']),

        changeLanguage(language) {

            // Si el usuario está logeado, tenemos que guardar sus preferencias
            // en su perfil

            if(this.gsecurity.isAuthenticated()){
                
                var authorizedGAxios = GAxios;

                authorizedGAxios.get(endpoints.changeLang + language).then(response =>{
                    console.log('Changing Language in Backend to: ', language)
                }).catch( e => {
                    console.error('Error while processing the request... ', e);
                }).then( () => {
                    //Debemos esperar a obtener una respuesta de la petición para 
                    // que la request no sea cancelada...

                    // En FrontEnd siempre reflejamos los cambios
                    this.gsecurity.setLanguage(language)
                    this.$router.go(0);
                    
                });

            }else{
                // En FrontEnd siempre reflejamos los cambios
                this.gsecurity.setLanguage(language)
                this.$router.go(0);
            }

            this.$emit('refreshRightMenu');
        },

        goTo(path) {
            this.url = this.$store.getters.sideMenus.url;
            if(this.url !== path) {
                this.setURL(path);
                this.clearStore().then(() => this.$router.push(path));  
            } else {
                this.$emit('samePage');
            }
        },
    },

    created: function(){
        this.gtrans = new GTrans(this.gsecurity.getLanguage());
        
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')

    }
}

$(window).bind('scroll', function () {
    if ($(window).scrollTop() > 60) {
        $('#sidebarleft').addClass('fixed');
    } else {
        $('#sidebarleft').removeClass('fixed');
    }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.lenFlag{
        width: 25px;
    }

* {
    font-family: "Archivo"
}

.title {
    font-weight: bold;
    margin-left: 5px;
}

.goTo {
    cursor: pointer;
    background-color: transparent;
    color: #007bff;
}

.goTo:hover {
    color: #0056b3;
}

.navContent {
    margin-left: 15px;
}

.section {
    font-size: 18px;
}

#sidebarleft.collapse {
    text-align: left;
    position: fixed;
    z-index: 2001;
    transition: all .3s ease;
    left: -130%; /* -width of sidebar */
    width: 100%;
    height: fit-content !important;
    display: block;
    overflow: auto
}

#sidebarleft.collapsing {
    text-align: left;
    transition: all .18s ease-in;
    position: fixed;
    z-index: 2001;
    left: -130%;  /* -width of sidebar */
    width: 100%;  /* width of sidebar */
    height: fit-content !important;
    display: block;
    overflow: auto
}

#sidebarleft.collapse.show {
    text-align: left;
    left: 0;
    width: 100%;  /* width of sidebar */
}
#sidebarleft {
    width: auto;
    position: relative;
    left: 0;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .3);
}


@media (min-width: 768px) {
    
    .title {
        font-weight: bold;
        margin-left: 5px;
    }

    .navContent {
        margin-left: 20px;
    }

    .section {
        font-size: 18px;
    }

    #sidebarleft.collapse {
        display: none;
        z-index: 2001;
    }

    #sidebarleft.collapsing {
        display: none;
        z-index: 2001;
    }

    #sidebarleft.collapse.show {
        display: none;
    }
    #sidesidebarleftbar {
        display: none;

    }
   
}

</style>
