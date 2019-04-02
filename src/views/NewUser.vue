<template>
    <div id="wholePage">
        <div class="title"><p>Log In</p></div>
        <div class="bothCards">
            <div id="signin" class="tarjeta">
                <b-form>
                    <b-form-group>
                        <b-form-input v-model="input.username" size="lg" placeholder="Username"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input v-on:keydown.enter="login()" v-model="input.password" type="password" size="lg" placeholder="Password"></b-form-input>
                    </b-form-group>
                    <b-button class="continueButton" variant="primary" size="sm" v-on:click="login()">SIGN IN</b-button>
                </b-form>
            </div>
            <div id="signup" class="tarjeta border-top">
                <b-form>
                    <div id="textCustomer" class="infoText"><span>New to Grooving?</span></div>
                    <router-link to="customerRegister">
                        <b-button class="continueButton" variant="primary" size="sm">SIGN UP!</b-button>
                    </router-link>
                    <hr/>
                    <div id="textCustomer" class="infoText"><span>Are you an artist?</span></div>
                    <router-link to="artistRegister">
                        <b-button class="continueButton" variant="primary" size="sm" v-on:click="login()">JOIN US!</b-button>
                    </router-link>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
    import GSecurity from "@/security/GSecurity.js";

    export default {
        name: 'NewUser',

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
            login() {
                if (this.gsecurity.authenticate(this.input.username, this.input.password)) {
                    this.$router.push({ path: "/" });
                }
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
        }

        .bothCards {
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

    }
</style>
