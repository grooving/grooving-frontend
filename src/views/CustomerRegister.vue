<template>
    <div id="wholePage">
        <div class="title"><p>Create your customer account!</p></div>
        <div class="bothCards">
            <div id="signup" class="tarjeta">
                <b-form>
                    <div id="errorsDiv" class="validationErrors vertical-center">
                        <p style="margin: 0px;">{{errors}}</p>
                    </div>
                    <label for="" class="subtitle">Account Information</label>
                    <b-form-group>
                        <b-form-input v-model="input.username" placeholder="Username" required></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input v-model="input.password" type="password" placeholder="Password" minlength="8" required></b-form-input>
                    </b-form-group>
                    <small class="form-text text-muted" style="margin-bottom:14px">
                        Your password must be at least 8 characters long, and can't be contained in the username, first name, last name or e-mail address.</small>
                    <b-form-group>
                        <b-form-input v-model="input.confirmPassword" type="password" placeholder="Confirm password" minlength="8" required></b-form-input>
                    </b-form-group>
                    <hr/>
                    <label for="" class="subtitle">Personal Information</label>
                    <!-- <div v-if="!image">
                    </div>
                    <div v-else>
                        <img :src="image" class="profileImage"/>
                    </div> -->
                    <img v-if="input.photo" :src="input.photo" class="profileImage"/>
                    <!-- <div class="custom-file">
                        <input type="file" class="custom-file-input" id="customFile" @change="onFileChange">
                        <label class="custom-file-label" for="customFile">Upload a Photo</label>
                    </div> -->
                    <b-form-group>
                        <b-form-input type="url" v-model="input.photo" placeholder="Profile Photo URL"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input v-model="input.firstName" placeholder="First Name" required></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input v-model="input.lastName" placeholder="Last Name" required></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input v-model="input.email" type="email" placeholder="E-mail" required></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input type="number" v-model="input.phoneNumber" placeholder="Phone Number" min="0"></b-form-input>
                    </b-form-group>
                    <div class="form-check">
                        <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted" unchecked-value="not_accepted" required>
                            <p>By creating an account you agree to <a href="/">Grooving's Terms and Conditions</a>.</p>
                        </b-form-checkbox>
                    </div>
                    <b-button class="continueButton" variant="primary" size="sm" type="submit" v-on:click="createCustomer">SIGN IN</b-button>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
    import endpoints from '@/utils/endpoints.js';
    import GAxios from '../utils/GAxios.js'
    import GSecurity from "@/security/GSecurity.js";

    export default {
        name: 'CustomerRegister',

        components: {
        },

        data: function() {
            return {
                gaxios: GAxios,
                gsecurity: GSecurity,
                //image: "",
                input: {
                    username: "",
                    password: "",
                    confirmPassword: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    photo: "",
                },
                errors: "",
                status: 'not_accepted',
            };
        },

        methods: {
            /*createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
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
                $('.custom-file-label').html(fileName);
            },*/
            createCustomer() {
                GAxios.post(endpoints.registerCustomer, {
                    "first_name": this.input.firstName,
                    "last_name": this.input.lastName,
                    "password": this.input.password,
                    "confirm_password": this.input.confirmPassword,
                    "username": this.input.username,
                    "email": this.input.email,
                    "photo": this.input.photo,
                    "phone": this.input.phoneNumber,
                }).then(response => {
                    console.log(response);
                    this.$router.push({name: "registerConfirmation"});
                }).catch(ex => {
                    console.log(ex.response.data);
                    this.errors = ex.response.data[0];
                    document.getElementById("errorsDiv").style.display = "block";
                    this.status = 'not_accepted';
                }) 

            },
        },

        props: {
        },

        beforeMount: function() {
            if (this.gsecurity.isAuthenticated()) {
                this.$router.push({name: "error"});
            }
        },
    }
        
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }
      
    .bothCards {
        display: flex;
        justify-content: center;
        padding: 15px;
        margin-left: 10%;
        margin-right: 10%;
    }

    .continueButton {
        background-image: linear-gradient(to right, #00fb82, #187fe6);
        border: none;
        border-radius: 30px;
        font-size: 25px;
        font-weight: bold;
        padding-left: 6%;
        padding-right: 6%;
        width: fit-content;
    }
    
    .continueButton:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
    }

    .custom-file {
        margin-bottom: 16px;
    }

    .custom-file-label {
        color: #6c757d;
        font-weight: semibold;
        text-align: left;
    }
    
    .form-check {
        padding-left: 0.7rem;
    }

    input:focus{
        border-color: #00fb82;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;   
        color:black;
        font-weight: semibold;
    }

    input:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .3) !important;
    }

    .p {
        padding-left: 0.7rem;
    }

    .profileImage {
        border-radius: 25px;
        display: block;
        height: 45px;
        margin: auto;
        margin-bottom: 16px !important;
        object-fit: cover;
        width: 45px;
    }

    select:focus{
        border-color: #00fb82;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        color:black;   
        font-weight: semibold;
    }

    select:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .5) !important;
    }
    
    .subtitle {
        font-size: 24px;
    }

    .tarjeta {
        align-items: center;
        border-radius: 10px;
        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
        display: flex;
        justify-content: center;
        margin-left: 10px;
        margin-right: 10px;
        min-height: 335px;
        min-width: 335px;
        padding: 25px;
        width: 25%;
    }

    .title {
        display: inline-block;
        font-size: 50px;
        font-weight: bold;
        margin-top: 5%;
    }

    .validationErrors{
        background-color:#f50057;
        border-radius: 5px;
        box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);      
        color:white;
        display: none;
        font-weight: bold;
        height: 100%;
        margin-bottom: 14px;
        padding: 10px;
        padding-top: 12px;
    }

    @media (max-width:767px)  {
        .bothCards {
            display: block;
            margin: 0px;
            padding: 0px;
            width: 100%;
        }

        .tarjeta {
            border-radius: 0px;
            box-shadow: none;
            margin: 0px;
            min-width: 320px;
            min-height: 200px;
            width: 100%;
        }

        .title {
            font-size: 40px;
        }
    }
</style>
