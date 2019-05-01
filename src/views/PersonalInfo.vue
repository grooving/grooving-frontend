<template>
<div class="prueba">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <div class="everything">
        <div class="paymentSelect">
          <div class="paymentOptions"><ProfileInfo :name="name" :surnames="userSurnames" :artisticName="artisticName" :email="userEmail" :paypal="paypal" :phoneNumber="userPhoneNumber" :username="username"/></div>
        </div>
    </div>
    <div class="delete">
        <div >
            <span class="card-title" style="font-weight:bold;font-size:30px;margin-bottom:12px">{{gtrans.translate('management_title')}}</span>
        </div>
        <div>
            <div id="otroButton" class="continueButtonDiv">
                <form>
                    <div class="form-row">
                        <div class="form-group col-12">
                            <div style="width:100%;margin-top:25px;overflow:auto;">
                                <p class="card-text" style="font-weight:bold;display:inline-block;vertical-align:middle;margin-top: 8px;">{{gtrans.translate('download_data')}}</p>
                                <p class="card-text" style="float:right;">
                                    <button type="button" class="addButton" @click="downloadPersonalData" style="float:right">
                                        <i class="material-icons arrowIcon addURLButton">file_download</i>
                                    </button>
                                </p>
                            </div>
                        </div>  
                    </div>
                </form>
                <!--<b-button id="downloadButton" class="continueButton" variant="primary" size="sm" v-on:click="downloadPersonalData">DESCARGAR INFORMACIÓN</b-button>-->
                <p id="downloadMessage" class="downloadMessage">{{gtrans.translate('download_email')}}</p>
            </div>
            <hr style="margin-top:0px;margin-bottom:0px;"/>
        </div>
        <div>
            <form @submit="deleteAccount">
                <div id="otroButton" class="continueButtonDiv">
                    <b-button id="deleteButton" class="cancelButton" variant="primary" size="sm" v-on:click="showButtons">{{gtrans.translate('deleteAccount')}}</b-button>
                </div>
                <div id="myButtons" class="continueButtonDiv" style="display: none;">
                    <h5 class="card-subtitle mb-2 text-muted" style="margin-bottom: 5px;">{{gtrans.translate('confirmation_title')}}</h5>
                    <h6 class="card-subtitle mb-2 text-muted" style="margin-bottom: 5px;">{{gtrans.translate('confirmation_subtitle')}}</h6>
                    <b-button id="cancelButton" class="continueButton" variant="primary" size="sm" v-on:click="hideButtons" style="margin-right:5px">{{gtrans.translate('cancel')}}</b-button>
                    <b-button id="acceptButton" class="cancelButton" variant="primary" size="sm" type="submit" style="margin-left:5px">{{gtrans.translate('accept')}}</b-button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import ProfileInfo from '@/components/ProfileInfo.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';
import Vue from 'vue'
import VueSwal from 'vue-swal'
import GTrans from "@/utils/GTrans.js"
 
Vue.use(VueSwal)

export default {
    name: 'PersonalInfo',

    components: {
        ProfileInfo
    },

    data: function() {
        return {
            gsecurity: GSecurity,
            gtrans: undefined,

            name: '',
            userSurnames: '',
            username: '',
            userEmail: '',
            userPhoneNumber: '',
            paypal: '',
            artisticName : '',
        };
    },

    methods: {
        deleteAccount() {
            NProgress.start();

            GAxios.delete(endpoints.user , {
            }).then(response => {
                setTimeout(function(){ window.location.reload(); }, 2000);
                this.$swal(this.gtrans.translate('toast_title'), this.gtrans.translate('toast_subtitle'), "success");
                console.log(response);
                this.gsecurity.deauthenticate();
                this.$router.push({path: "/"});
            }).catch(ex => {
                console.log(ex);
            }).then( () => {
                NProgress.done();
            })
        },

        showButtons() {
            document.getElementById("myButtons").style.display='inline-block';
            document.getElementById("otroButton").style.display='none';
            return false;
        },

        hideButtons() {
            document.getElementById("myButtons").style.display='none';
            document.getElementById("otroButton").style.display='inline-block';
            return false;
        },

        downloadPersonalData(){
            NProgress.start();
            GAxios.post(endpoints.downloadPersonalData, {
            }).then(response => {
                console.log(response);
                //document.getElementById("downloadButton").style.display="none";
                document.getElementById("downloadMessage").style.display="block";
            }).catch(ex => {
                console.log(ex);
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

    beforeMount: function(){

        if (!this.gsecurity.isAuthenticated()) {
            this.$router.push({name: "error"});

        } else {

            this.gsecurity = GSecurity
            var GAxiosToken = this.gsecurity.getToken();


            var authorizedGAxios = GAxios;
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token '+GAxiosToken;

            var role = this.gsecurity.getRole();

            if(role=='CUSTOMER'){
                //alert(GAxiosToken)
                NProgress.start();
                authorizedGAxios.get(endpoints.customerPersonalInformation)
                    .then(response => {
                        var personalInformation = response.data.user;
                        console.log(personalInformation);
                        console.log(response);
                        
                        this.name=personalInformation['first_name']
                        this.userSurnames = personalInformation['last_name'];
                        this.userEmail=personalInformation['email'];
                        this.userPhoneNumber = response.data.phone;
                        this.username = personalInformation['username'];
                        
                }).then(() => {
                    NProgress.done()
                });
            }

            if(role=='ARTIST'){
                //alert(GAxiosToken)
                NProgress.start();
                authorizedGAxios.get(endpoints.artistPersonalInformation)
                    .then(response => {
                        var personalInformation = response.data.user;
                        console.log(personalInformation);
                        console.log(response);
                        
                        this.name=personalInformation['first_name']
                        this.userSurnames = personalInformation['last_name'];
                        this.userEmail=personalInformation['email'];
                        this.userPhoneNumber = response.data.phone;
                        this.username = personalInformation['username'];
                        this.paypal = response.data.paypalAccount;
                        this.artisticName = response.data.artisticName['artisticName'];
                        


                }).then(() => {
                    NProgress.done()
                });  
            }
        }
    }
}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

    .addButton{
        background: -webkit-linear-gradient(left, #00fb82, #187fe6);
        border: none;
        border-radius: 100px;
        display:inline-block;
        vertical-align: middle;
        align-items: center;
        padding: 5px;
    }

    .addURLButton{
        background: white;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        border: none;
        margin: 0 auto; 

        display:inline-block;
        vertical-align: middle;
        font-size: 30px;
    }

    .addURLButton:hover{
        background:white;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .addButton:hover{
        background: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .delete {
        padding: 17px;
        padding-left: 25px;
        padding-right: 25px;
        margin-bottom: 5% !important;
        margin-left: 3%;
    }

    .downloadMessage{
        display: none;
    }

    .continueButton {
        font-size: 22px;
        font-weight: bold;
        border: none;
        border-radius: 30px;
        background-image: linear-gradient(to right, #00fb82, #187fe6);
        padding-left: 10px;
        padding-right: 10px;
    }

    .cancelButton {
        font-size: 22px;
        font-weight: bold;
        border: none;
        border-radius: 30px;
        background-image: linear-gradient(to right, #a2a2a2, #474747);
        padding-left: 10px;
        padding-right: 10px;
    }

    .continueButton:hover{
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .cancelButton:hover {
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        background-image: linear-gradient(to right, #515151, #232323) !important;
    }

    .continueButtonDiv {
        margin-top: 30px;
        margin-bottom: 30px;
        justify-content: center;
    }

    @media (max-width:767px)  {
        .delete{
            padding-top: 5%;
            margin-right: 3%;
        }
    }

    @media (min-width:768px)  {
      
        .everything {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5%;
            text-align: center;
            padding: 15px;
            margin-left: 10%;
            margin-right: 10%;
            margin-top:0%;
        }

        .delete{
            margin: 0 auto;
            border-radius: 10px;
            align-items: center;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
            width: 400px;
            justify-content: center;
        }
    }

</style>
