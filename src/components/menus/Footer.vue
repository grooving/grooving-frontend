<template>
    <div>
        <footer class="bg-light">
            <div class="info">
                
                <router-link v-bind:to="aboutUsURI" class="link">About Us</router-link> | 
                <!-- <router-link v-bind:to="FAQsURI" class="link">FAQs</router-link> | -->
                <div class="link" @click="goTo(termsURI)">Terms of Use</div> | 
                <span>Contact Us:</span> grupogrooving@gmail.com 
            </div>

            <div>Copyright © 2019:
                <a v-bind:href="groovingURI">Grooving</a>
            </div>
        </footer>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: "Footer",
    data() {
        return {
            url: undefined,
            refresher: undefined,
        }
    },
    props: {
        aboutUsURI: {
            type: String,
            default: 'aboutUs'
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
}
</script>

<style scoped>
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

    span {         
        font-weight: bold;
    }

    @media (max-width: 768px) {
        footer {
            padding-top: 5px;  
        }
    }

</style>
