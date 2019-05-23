<template>
    <div>
        <div class="card tarjeta">
            <img v-if="!userImage" src="@/assets/defaultPhoto.png" class="card-img-top artistImage" v-bind:alt="this.gtrans.translate('image')">
            <img v-else class="card-img-top artistImage" :src="userImage" v-bind:alt="this.gtrans.translate('image_alt')">
            <div class="card-body cuerpoTarjeta">
                <div class="leftContent" style="width:100%">
                    <h5 class="card-title artistName">{{ userName }}</h5>
                </div>                
                <div class="rightContent">
                    <button v-if="userIsActive == true" class="btn btn-primary banButton" @click="banUser"><span class="hireText">{{gtrans.translate('ban')}}</span></button>
                    <button v-if="userIsActive == false" class="btn btn-primary unbanButton" @click="banUser"><span class="hireText">{{gtrans.translate('unban')}}</span></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GSecurity from '@/security/GSecurity.js';
import endpoints from '@/utils/endpoints.js';
import GAxios from '@/utils/GAxios.js';
import GTrans from "@/utils/GTrans.js"

export default {
    name: "UserCard",

    data: function(){
        return{
            gsecurity: GSecurity,
            gtrans: undefined,
        }
    },

    props: {
        userImage: {
            type: String,
            default: 'https://img.europapress.es/fotoweb/fotonoticia_20181107115306_1920.jpg',
        },
        userName: {
            type: String,
            default: 'ROSALÍA'
        },
        userId:{
            type: Number,
            default: 0
        },
        userIsActive:{
            type: Boolean,
            default: true,
        }
    },

    methods: {
        banUser() {
            NProgress.start();
            var GAxiosToken = this.gsecurity.getToken();
            var authorizedGAxios = GAxios;
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token '+ GAxiosToken;
            authorizedGAxios.put(endpoints.user, {
                    "id": this.userId,
                }).then(response => {
                    console.log(response);
                    this.$router.push({name: "usersList"});
                    window.location.reload();
                }).catch(ex => {
                    console.log(ex);
                    console.log(ex.response.data.error);
                    this.errors = ex.response.data.error;
                    this.$emit('haveError', this.errors)
                    window.scrollTo(0,0);
                }).then( () => {
                    NProgress.done();
                })
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
}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

    .artistGenres {
        color: #187FE6;
        font-size: 18px;
    }

    .artistImage {
        object-fit: cover;
        height: 20rem;
        width: 100%;

        border-radius: 20px 20px 0px 0px;
    }

    .artistName {
        font-weight: bold;
        font-size: 2rem;
        word-break: break-word;
    }

    .cuerpoTarjeta {
        display: flex;
        align-items: center; 
    }

    .unbanButton {
        font-size: 24px;
        font-weight:bold;
        
        border: none;
        border-radius: 30px;

        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .banButton {        
        font-size: 24px;
        font-weight:bold;
        
        border: none;
        border-radius: 30px;

        background-image: linear-gradient(to right, #FB8600, #FF0000);
    }

    .unbanButton:hover{
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.7) !important;
        background-image: linear-gradient(to right, #14ca9f, #1648d0) !important;
    }

    .banButton:hover {
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.7) !important;
        background-image: linear-gradient(to right, #ED7F00, #A20101) !important;
    }

    .hireText {
        padding: 0px 10px 0px 10px;
    }

    .leftContent {
        float: left;
        text-align: left;
        width: 65%;
    }

    .rightContent {
        float: right;
        text-align: center;
        padding-left: 20px;
    }

    .tarjeta {
        max-width: 400px;
        width: 95%;
        min-width: 290px;
        margin: 0 auto !important;
        border-radius: 20px;
        box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
    }

</style>
