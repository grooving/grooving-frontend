<template>
    <div class="content">
        <form @submit.prevent="saveInfo">
            <div class="form-row">
                <div class="form-group col-12">
                    
                    <span style="font-weight:bold;font-size:30px;">{{gtrans.translate('profile_title')}} </span>
                    <router-link v-bind:to="{name: 'personalInfo', params: {}}" style="height: 28px; width: 28px">
                        <i class="material-icons iconOffer">clear</i>
                    </router-link>
                    <h6 class="card-subtitle mb-2 text-muted">{{gtrans.translate('profile_subtitle')}}</h6>
                    <div id="errorsDiv" class="validationErrors vertical-center">
                        <p style="margin: 0px;">{{errors}}</p>
                    </div>
                    
                    <!--<img v-if="photo" :src="photo" class="profileImage"/>
                    <div style="width:100%;margin-top:10px;">
                        <b-form-group>
                            <img v-if="photo" :src="photo" class="profileImage"/>
                           <input type="file" class="custom-file-input"  id="customFile" @change="onFileChange">
                        </b-form-group>
                        -->

                    <img v-if="photo" :src="photo" class="profileImage"/>
                    <div class="custom-file">
                        <input type="file" accept="image/*" class="custom-file-input"  id="customFile" @change="onFileChange">
                        <label v-if="this.gtrans.getLanguage() == 'es'" class="custom-file-label labelES" for="customFile"></label>
                        <label v-else class="custom-file-label labelEN" for="customFile"></label>
                        <small class="form-text text-muted">
                            {{gtrans.translate('image_help')}}
                        </small>
                    </div> 
         
                    <hr style="margin-top:5px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('user_firstName')}}</p>
                        <b-form-group>
                            <b-form-input v-model="name" v-bind:value="name" maxlength="30" style="text-align: right" required></b-form-input>
                        </b-form-group>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('user_lastName')}}</p>
                        <b-form-group>
                            <b-form-input v-model="surnames" v-bind:value="surnames" maxlength="150" style="text-align: right" required></b-form-input>
                        </b-form-group>
                    </div>
                    <hr v-if="this.gsecurity.hasRole('ARTIST')" style="margin-top:0px;margin-bottom:0px;"/>
                    <div v-if="this.gsecurity.hasRole('ARTIST')" style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('user_artisticName')}}</p>
                        <b-form-group>
                            <b-form-input v-model="artisticName" v-bind:value="artisticName" style="text-align: right" maxlength="140" type="text"></b-form-input>
                        </b-form-group>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('user_username')}}</p>
                        <p class="card-text" style="float:right;">{{username}}</p>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('user_newPassword')}}</p>
                        <b-form-group>
                            <b-form-input v-model="password" type="password" maxlength="30" v-bind:placeholder="gtrans.translate('user_newPassword_placeholder')" minlength="8"></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input v-model="confirmPassword" type="password" maxlength="30" v-bind:placeholder="gtrans.translate('user_confirmPassword_placeholder')" minlength="8"></b-form-input>
                        </b-form-group>
                        <small class="form-text text-muted" style="margin-bottom:14px">
                        {{gtrans.translate('customerRegister_passwordReq')}}</small>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('user_email')}}</p>
                        <b-form-group>
                            <b-form-input v-model="email" v-bind:value="email" maxlength="100" style="text-align: right" type="email"></b-form-input>
                        </b-form-group>
                    </div>
                    <hr v-if="this.gsecurity.hasRole('ARTIST')" style="margin-top:0px;margin-bottom:0px;"/>
                    <div v-if="this.gsecurity.hasRole('ARTIST')" style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('paypal')}}</p>
                        <b-form-group>
                            <b-form-input v-model="paypal" v-bind:value="paypal" maxlength="100" style="text-align: right" type="email"></b-form-input>
                        </b-form-group>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('user_phone')}}</p>
                        <b-form-group>
                            <b-form-input v-model="phoneNumber" min="600000000" max="999999999" v-bind:value="phoneNumber" style="text-align: right" type="number"></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="continueButtonDiv">
                        <b-button class="continueButton" variant="primary" size="sm" type="submit">{{gtrans.translate('save')}}</b-button>
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
import GTrans from "@/utils/GTrans.js"

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
            photo: '',
            image64: '',
            ext:'',
            password: '',
            confirmPassword: '',
            errors: "",
            gsecurity: GSecurity,
            gtrans: undefined,
        };
    },

    methods: {

        createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                
                reader.onload = (e) => {
                    this.photo = e.target.result
                    this.image64 = this.photo.split("base64,")[1];

                };
                reader.readAsDataURL(file);
            
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) {
                    return;
                }
                this.createImage(files[0]);
          
                var fileName = files[0].name;
                
                this.ext= fileName.split(".")[1];
            
                $('.custom-file-label').html(fileName);
            },
        saveInfo() {
            NProgress.start();
            var uri = '';


            if (this.gsecurity.hasRole('ARTIST')) {
                uri = endpoints.artist;
            } else if (this.gsecurity.hasRole('CUSTOMER')) {
                uri = endpoints.customer;
            }

            if (this.gsecurity.getRole() == 'ARTIST') {
                
                if(this.image64.length>=1995000){
                    
                    this.errors = this.gtrans.translate('customerRegister_photoMaxSize');
                    document.getElementById("errorsDiv").style.display = "block";
                    
                    window.scrollTo(0,0);
                    NProgress.done();
            
                }
                else{
                GAxios.put(uri + this.gsecurity.getId() + '/', {
                    "first_name": this.name,
                    "last_name": this.surnames,
                    "phone": this.phoneNumber,
                    "image64": this.image64,
                    "ext": this.ext,
                    "paypalAccount": this.paypal,
                    "artisticName": this.artisticName,
                    "username": this.gsecurity.getUsername(),
                    "password": this.password,
                    "confirm_password": this.confirmPassword,
                    "email": this.email,
                }).then(response => {
                    //console.log(response);
                    this.gsecurity.setFirstName(this.name);
                    window.localStorage.setItem("firstName", this.name);
                    this.gsecurity.setPhoto(this.photo);
                    window.localStorage.setItem("photo", this.photo);
                    this.$router.push({name: "personalInfo"});
                    window.location.reload();
                }).catch(ex => {
                    //console.log(ex);
                    //console.log(ex.response.data.error);
                    this.errors = ex.response.data.error;
                    document.getElementById("errorsDiv").style.display = "block";
                    window.scrollTo(0,0);
                }).then( () => {
                    NProgress.done();
                })
                }
            } else if (this.gsecurity.getRole() == 'CUSTOMER') {
                if(this.image64.length>=1995000){
                    this.errors = this.gtrans.translate('customerRegister_photoMaxSize');
                    document.getElementById("errorsDiv").style.display = "block";
                    
                    window.scrollTo(0,0);
                    NProgress.done();
                }
                else{
                GAxios.put(uri + this.gsecurity.getId() + '/', {
                    "first_name": this.name,
                    "last_name": this.surnames,
                    "phone": this.phoneNumber,
                    "image64": this.image64,
                    "ext": this.ext,
                    "username": this.gsecurity.getUsername(),
                    "password": this.password,
                    "confirm_password": this.confirmPassword,
                    "email": this.email,
                }).then(response => {
                    //console.log(response);
                    this.gsecurity.setFirstName(this.name);
                    window.localStorage.setItem("firstName", this.name);
                    this.gsecurity.setPhoto(this.photo);
                    window.localStorage.setItem("photo", this.photo);
                    this.$router.push({name: "personalInfo"});
                    window.location.reload();
                }).catch(ex => {
                    //console.log(ex);
                    //console.log(ex.response.data.error);
                    this.errors = ex.response.data.error;
                    document.getElementById("errorsDiv").style.display = "block";
                    window.scrollTo(0,0);
                }).then( () => {
                    NProgress.done();
                })
            }
            }
        },
    },

    beforeMount: function(){
        if (!this.gsecurity.isAuthenticated() || this.gsecurity.hasRole('ADMIN')) {
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
                    //console.log(personalInformation);
                    //console.log(response);
                    
                    this.name = personalInformation['first_name']
                    this.surnames = personalInformation['last_name'];
                    this.email = personalInformation['email'];
                    this.phoneNumber = response.data.phone;
                    this.username = personalInformation['username'];
                    this.photo = response.data.photo;
                    
                    if (role == 'ARTIST') {
                        this.paypal = response.data.paypalAccount;
                        this.artisticName = response.data.artisticName['artisticName'];
                    }
                }).then( () => {
                    NProgress.done();
                })          
        }
    },

    created: function() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
        
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')
    }
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

    .custom-file {
        margin-bottom: 16px;
    }

    .custom-file-label {
        color: #6c757d;
        font-weight: semibold;
        text-align: left;
        min-width: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        white-space: nowrap;
    }

    .custom-file-input ~ .custom-file-label.labelES::after {
        content: "Buscar" !important;
    }

    .custom-file-input ~ .custom-file-label.labelEN::after {
        content: "Browse" !important;
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

    .profileImage {
        border-radius: 25px;
        display: block;
        height: 45px;
        margin: auto;
        margin-bottom: .5rem !important;
        object-fit: cover;
        width: 45px;
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