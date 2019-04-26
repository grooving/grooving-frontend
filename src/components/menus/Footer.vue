<template>
    <div>
        <footer class="bg-light">
            <div class="info">
                
                <span class="link" @click="goTo(aboutUsURI)">{{gtrans.translate('aboutUs')}} | </span>
                <span class="link" @click="goTo(termsURI)">{{gtrans.translate('termsAndConditions')}} | </span>
                <span class="link">{{gtrans.translate('contactUs')}}: grupogrooving@gmail.com | </span>
                <span class="link" @click="changeLanguage('en')"><img class="lenFlag" src="@/assets/img/en.png"></span>
                <span>⠀</span>
                <span class="link" @click="changeLanguage('es')"><img class="lenFlag" src="@/assets/img/es.jpg"></span>
            </div>

            <div style="float:clear;">Copyright © 2019:
                <a v-bind:href="groovingURI">Grooving</a>
            </div>
        </footer>
    </div>
</template>

<script>
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js";
import GAxios from '@/utils/GAxios.js';
import {mapActions} from 'vuex';
import endpoints from '@/utils/endpoints.js';
import { async } from 'q';

export default {
    name: "Footer",
    data() {
        return {
            url: undefined,
            refresher: undefined,
            gsecurity: GSecurity,
            gtrans: undefined,
        }
    },
    props: {
        aboutUsURI: {
            type: String,
            default: '/about'
        },

        /*FAQsURI: {
            type: String,
            default: 'FAQs'
        },*/

        termsURI: {
            type: String,
            default: '/terms'
        },

        groovingURI: {
            type: String,
            default: '/'
        }
    },
    methods: {
        
        ...mapActions(['clearStore', 'setURL']),

        changeLanguage(language) {

            var authorizedGAxios = GAxios;

            authorizedGAxios.get(endpoints.changeLang + language).then(response =>{
                console.log('Changing Language to: ', language)
                this.gsecurity.setLanguage(language)
                this.$router.go(0);
            });
        },

        goTo(path) {
            this.$emit('refreshRightMenu');
            this.url = this.$store.getters.sideMenus.url;
            if(this.url !== path) {
                this.setURL(path);
                this.clearStore().then(() => this.$router.push(path));  
            } else {
                this.$emit('samePage');
            }
        },

    },

    created() {
        // Retreive stored credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
            
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')
    },
}
</script>

<style scoped>

    .lenFlag{
        width: 25px;
    }
    * {
        font-family: "Archivo"
    }

    .goTo {
        cursor: pointer;
        background-color: transparent;
        color: #007bff;
    }

    .goTo:hover {
        color: #0056b3;
    }

    footer {
        padding: 15px; 
        box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, .3) !important;
    }

    .info {
        padding: 10px;
        color: #606060;
    }

    .link {
        color: #606060;
        cursor: pointer;
    }

    

    @media (max-width: 768px) {
        footer {
            padding-top: 5px;  
        }
    }

</style>
