<template>
    <div id="wholePage">
        <div class="title"><p>Create your customer account!</p></div>
        <div class="bothCards">
            <div id="signup" class="tarjeta">
                <b-form action="/#/registerConfirmation/">
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
            createImage(file) {
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
