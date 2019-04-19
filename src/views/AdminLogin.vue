<template>
    <div id="wholePage">
        <div class="title"><p>Administrator Site</p></div>
        <div class="bothCards">
            <div id="signin" class="tarjeta">
                <b-form>
                    <b-form-group>
                        <b-form-input v-model="input.username" size="lg" placeholder="Username" id="ddown-form-email"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input v-on:keydown.enter="login()" v-model="input.password" type="password" size="lg" placeholder="Password" id="ddown-form-passwd"></b-form-input>
                        <p v-if="error" class="err">Wrong username or password!</p>
                    </b-form-group>
                    <b-button class="continueButton singin" variant="primary" size="sm" v-on:click="login()">SIGN IN</b-button>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
    import GSecurity from "@/security/GSecurity.js";

    export default {
        name: 'AdminLogin',

        components: {
        },

        data: function() {
            return {
                gsecurity: GSecurity,
                input: {
                    username: "",
                    password: ""
                },
            };
        },

        methods: {

            login: async function() {

                var log_result = await this.gsecurity.sudoAuthenticate(this.input.username, this.input.password)

                if (log_result) {
                    this.$router.push({ path: "/" });
                } else {
                    $('#ddown-form-email, #ddown-form-passwd').css('border-color', 'red');
                    this.error = true;
                }
            },
        },

        props: {
            error: false,
        },
        
        created() {
            this.gsecurity = GSecurity;
            this.gsecurity.obtainSavedCredentials();
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
        margin-left: 10%;
        margin-right: 10%;
        padding: 15px;
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

    .err {
        color:red;
        margin-top: 15px;
        text-align: center;
        margin-bottom: 0px;
    }

    .infoText {
        font-size: 25px;
        padding-bottom: 10px;
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

    .singin {
        margin-top: 10px
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
    }
</style>
