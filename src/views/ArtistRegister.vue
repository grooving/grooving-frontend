<template>
    <div id="wholePage">
        <div class="title"><p>Create your customer account!</p></div>
        <div class="bothCards">
            <div id="signin" class="tarjeta">
                <b-form>
                    <label for="" class="subtitle">Account Information</label>
                    <b-form-group>
                        <b-form-input v-model="input.artisticName" placeholder="Artistic Name"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input v-model="input.username" placeholder="Username"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input v-model="input.password" type="password" placeholder="Password"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input v-model="input.confirmPassword" type="password" placeholder="Confirm password"></b-form-input>
                    </b-form-group>
                    <hr/>
                    <label for="" class="subtitle">Personal Information</label>
                    <div v-if="!image">
                    </div>
                    <div v-else>
                        <img :src="image" class="profileImage"/>
                    </div>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="customFile" @change="onFileChange">
                        <label class="custom-file-label" for="customFile">Upload a Photo</label>
                    </div>
                    <b-form-group>
                        <b-form-input v-model="input.firstName" placeholder="First Name"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input v-model="input.lastName" placeholder="Last Name"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input v-model="input.email" type="email" placeholder="E-mail"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input v-model="input.username" placeholder="Phone Number"></b-form-input>
                    </b-form-group>
                    <h6 class="card-subtitle mb-2 text-muted">By creating an account you agree to <a href="/">Grooving's Terms and Conditions</a>.</h6>
                    <b-button class="continueButton" variant="primary" size="sm" type="submit">SIGN IN</b-button>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
    import GSecurity from "@/security/GSecurity.js";

    export default {
        name: 'ArtistRegister',

        components: {
        },

        data: function() {
            return {
                gsecurity: GSecurity,
                input: {
                    artisticName: "",
                    username: "",
                    password: "",
                    confirmPassword: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                },
                image: "",
            };
        },

        methods: {
            login() {
                if (this.gsecurity.authenticate(this.input.username, this.input.password)) {
                    this.$router.push({ path: "/" });
                }
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) {
                    return;
                }
                this.createImage(files[0]);
            },
            createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
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
        font-size: 25px;
        padding-left: 6%;
        padding-right: 6%;
        border: none;
        border-radius: 30px;
        width: fit-content;
        font-weight: bold;
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }
    
    .continueButton:hover{
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .custom-file {
        margin-bottom: 16px;
    }

    .custom-file-label {
        color: #6c757d;
        font-weight: semibold;
        text-align: left;
    }

    .infoText {
        font-size: 25px;
        padding-bottom: 10px;
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
        width: 45px;
        height: 45px;
        object-fit: cover;
        border-radius: 25px;
        margin-bottom: 16px !important;
        display: block;
        margin: auto;
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
    
    .subtitle {
        font-size: 24px;
    }

    .tarjeta {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 25px;
        min-height: 335px;
        min-width: 335px;
        width: 25%;
        border-radius: 10px;
        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
        margin-right: 10px;
        margin-left: 10px;
    }

    .title {
        display: inline-block;
        font-size: 50px;
        margin-top: 5%;
        font-weight: bold;
    }

     @media (max-width:767px)  {
        .bothCards {
            width: 100%;
            margin: 0px;
            display: block;
            padding: 0px;
        }

        .tarjeta {
            min-width: 320px;
            min-height: 200px;
            width: 100%;
            margin: 0px;
            box-shadow: none;
            border-radius: 0px;
        }

        .title {
            font-size: 40px;
        }
    }
</style>
