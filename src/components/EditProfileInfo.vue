<template>
    <div class="content">
        <form @submit="saveInfo">
            <div class="form-row">
                <div class="form-group col-12">
                    
                    <span style="font-weight:bold;font-size:30px;">Profile </span>
                    <router-link v-bind:to="{name: 'personalInfo', params: {}}" style="height: 28px; width: 28px">
                        <i class="material-icons iconOffer">clear</i>
                    </router-link>
                    <h6 class="card-subtitle mb-2 text-muted">Basic info of your Grooving account, like your name and email.</h6>
                    <div id="errorsDiv" class="validationErrors vertical-center">
                        <p style="margin: 0px;">{{errors}}</p>
                    </div>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">FIRST NAME</p>
                        <b-form-group>
                            <b-form-input v-model="name" v-bind:value="name" style="text-align: right" required></b-form-input>
                        </b-form-group>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">LAST NAME</p>
                        <b-form-group>
                            <b-form-input v-model="surnames" v-bind:value="surnames" style="text-align: right" required></b-form-input>
                        </b-form-group>
                    </div>
                    <hr v-if="this.gsecurity.hasRole('ARTIST')" style="margin-top:0px;margin-bottom:0px;"/>
                    <div v-if="this.gsecurity.hasRole('ARTIST')" style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">ARTISTIC NAME</p>
                        <b-form-group>
                            <b-form-input v-model="artisticName" v-bind:value="artisticName" style="text-align: right" type="text"></b-form-input>
                        </b-form-group>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">USERNAME</p>
                        <p class="card-text" style="float:right;">{{username}}</p>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">PASSWORD</p>
                        <p class="card-text" style="float:right;">&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;</p>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">EMAIL</p>
                        <p class="card-text" style="float:right;">{{email}}</p>
                    </div>
                    <hr v-if="this.gsecurity.hasRole('ARTIST')" style="margin-top:0px;margin-bottom:0px;"/>
                    <div v-if="this.gsecurity.hasRole('ARTIST')" style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">PAYPAL</p>
                        <b-form-group>
                            <b-form-input v-model="paypal" v-bind:value="paypal" style="text-align: right" type="email"></b-form-input>
                        </b-form-group>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">PHONE</p>
                        <b-form-group>
                            <b-form-input v-model="phoneNumber" min="600000000" max="900000000" v-bind:value="phoneNumber" style="text-align: right" type="number"></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="continueButtonDiv">
                        <b-button class="continueButton" variant="primary" size="sm" type="submit">SAVE</b-button>
                    </div>
                </div>  
            </div>
        </form>
    </div>
</template>

<script>
import endpoints from '@/utils/endpoints.js';
import GAxios from '../utils/GAxios.js'
import GSecurity from "@/security/GSecurity.js";

export default {
    name: "EditProfileInfo",

    components: {
    },

    data: function() {
        return {
            name: '',
            surnames: '',
            username: '',
            email: '',
            paypal: '',
            phoneNumber: '',
            artisticName: '',
            errors: "",
        };
    },

    methods: {
        saveInfo() {
            NProgress.start();
            var uri = '';
            if (this.gsecurity.hasRole('ARTIST')) {
                uri = endpoints.artist;
            } else if (this.gsecurity.hasRole('CUSTOMER')) {
                uri = endpoints.customer;
            }

            if (this.gsecurity.getRole() == 'ARTIST') {
                GAxios.put(uri + this.gsecurity.getId() + '/', {
                    "first_name": this.name,
                    "last_name": this.surnames,
                    "phone": this.phoneNumber,
                    "photo": this.gsecurity.getPhoto(),
                    "paypalAccount": this.paypal,
                    "artisticName": this.artisticName,
                }).then(response => {
                    console.log(response);
                    this.gsecurity.setFirstName(this.name);
                    window.localStorage.setItem("firstName", this.name);
                    this.$router.push({name: "personalInfo"});
                    window.location.reload();
                }).catch(ex => {
                    console.log(ex);
                    console.log(ex.response.data.error);
                    this.errors = ex.response.data.error;
                    document.getElementById("errorsDiv").style.display = "block";
                    window.scrollTo(0,0);
                }).then( () => {
                    NProgress.done();
                })
            } else if (this.gsecurity.getRole() == 'CUSTOMER') {
                GAxios.put(uri + this.gsecurity.getId() + '/', {
                    "first_name": this.name,
                    "last_name": this.surnames,
                    "phone": this.phoneNumber,
                    "photo": this.gsecurity.getPhoto(),
                }).then(response => {
                    console.log(response);
                    this.gsecurity.setFirstName(this.name);
                    window.localStorage.setItem("firstName", this.name);
                    this.$router.push({name: "personalInfo"});
                    window.location.reload();
                }).catch(ex => {
                    console.log(ex);
                    console.log(ex.response.data.error);
                    this.errors = ex.response.data.error;
                    document.getElementById("errorsDiv").style.display = "block";
                    window.scrollTo(0,0);
                }).then( () => {
                    NProgress.done();
                })
            }
        },
    },

    beforeMount: function(){
        if (!this.gsecurity.isAuthenticated()) {
            this.$router.push({name: "error"});

        } else {
            NProgress.start();
            var GAxiosToken = this.gsecurity.getToken();
            var authorizedGAxios = GAxios;
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token '+ GAxiosToken;
            var role = this.gsecurity.getRole();
            var uri = '';

            if (role == 'CUSTOMER') {
                uri = endpoints.customerPersonalInformation;
            } else if (role == 'ARTIST') {
                uri = endpoints.artistPersonalInformation;
            }
            
            authorizedGAxios.get(uri)
                .then(response => {
                    var personalInformation = response.data.user;
                    console.log(personalInformation);
                    console.log(response);
                    
                    this.name = personalInformation['first_name']
                    this.surnames = personalInformation['last_name'];
                    this.email = personalInformation['email'];
                    this.phoneNumber = response.data.phone;
                    this.username = personalInformation['username'];                    

                    if (role == 'ARTIST') {
                        this.paypal = response.data.paypalAccount;
                        this.artisticName = response.data.artisticName['artisticName'];
                    }
                }).then( () => {
                    NProgress.done();
                })          
        }
    },

    created() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();
    },
}
</script>

<style scoped>

    .content {
        padding: 10px;
    }

    .continueButton {
        font-size: 22px;
        font-weight: bold;
        border: none;
        border-radius: 30px;
        width: 45%;
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .continueButton:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .continueButtonDiv {
        margin-top: 30px;
        margin-bottom: 5%;
        display: flex;
        justify-content: center;
    }

    .iconOffer  {
         font-size: 28px;
         float: right;
    }

    input:focus{
        border-color: #00fb82;
        font-weight: semibold;
        color:black;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;   
    }

    input:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .3) !important;
    }

    select:focus{
        border-color: #00fb82;
        font-weight: semibold;
        color:black;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;   
    }

    select:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .5) !important;
    }

    .validationErrors{
        background-color:#f50057;
        border-radius: 5px;
        box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);      
        color:white;
        display: none;
        font-weight: bold;
        margin-bottom: 14px;
        padding: 10px;
        padding-top: 12px;
    }

    @media (max-width:767px)  {
        .content{
            padding-top: 5%;
            margin-right: 3%;
            margin-left: 3%;
        }

        .iconOffer  {
            font-size: 50px;
            float: right;
        }
    }

    @media (min-width:768px)  {
        form{
            margin-top:5px;
            width: 320px;
            margin-right: 4%;
            margin-left: 4%;
            margin-bottom: 0;
        }

        .content{
            margin-top: 10% !important;
            margin-left: 3%;
            border-radius: 10px;
            display: flex;
            align-items: center;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
        }
    }

</style>