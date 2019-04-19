<template>
    <div  id="wholePage" class="col-12 content">
        
        <div id="errorsDiv" class="validationErrors vertical-center">
            <p tyle="margin: 0px;">{{errors}}</p>
        </div>
        <div id="okDiv" class="validationOK vertical-center">
            <p tyle="margin: 0px;">{{ok}}</p>
        </div>
        
        <div class="title"><p>Breach Notification</p></div>
        <div class="subtitle"><p>This message will be sent to all the users of the system</p></div>
        <div class="bothCards">
            <form v-on:submit="createNotification">
                <div class="form-group">
                    <small for="exampleInputEmail1">SUBJECT</small>
                    <input v-model="subject" style="font-weight: bold;" type="text" class="form-control" id="notificationSubject" placeholder="Subject">
                </div>
                <div class="form-group">
                    <small for="exampleInputPassword1">BODY</small>
                    <textarea v-model="body" class="form-control" id="notificationBody" placeholder="Enter the body of the message..."/>
                </div>
                <button type="submit" class="continueButton">SEND</button>
            </form>
        </div>
    </div>
</template>

<script>
    import GSecurity from "@/security/GSecurity.js";
    import endpoints from '@/utils/endpoints.js';
    import GAxios from '@/utils/GAxios.js';

    export default {
        name: 'BreachNotification',

        components: {
        },

        data: function() {
            return {
                gsecurity: GSecurity,
                subject: "",
                body: "",
                errors: "",
                ok: "The notification was created succesfully.",
            };
        },

        methods: {
            createNotification(){
                NProgress.start();

                var GAxiosToken = this.gsecurity.getToken();
                var authorizedGAxios = GAxios;
                authorizedGAxios.defaults.headers.common['Authorization'] = 'Token '+ GAxiosToken;
                
                GAxios.post(endpoints.breachNotification, {
                    "subject": this.subject,
                    "body": this.body
                }).then(response => {
                    console.log(response);
                    document.getElementById("errorsDiv").style.display = "none";
                    document.getElementById("okDiv").style.display = "block";
                    this.subject="";
                    this.body="";
                    this.$router.push({name: "breachNotification"});
                }).catch(ex => {
                    console.log(ex);
                    console.log(ex.response.data.error);
                    this.errors = ex.response.data.error;
                    document.getElementById("errorsDiv").style.display = "block";
                    document.getElementById("okDiv").style.display = "none";
                }).then( () => {
                    NProgress.done();
                })

            }
        },

        props: {
            error: false,
        },
        
        created() {
            this.gsecurity = GSecurity;
            this.gsecurity.obtainSavedCredentials();

            if(!this.gsecurity.hasRole('ADMIN')) {
                console.log("Error: You are not an administrator so you can't create breach notifications");
                location.replace("/#/*")
            }
        },

        beforeMount: function() {
            if (!this.gsecurity.isAuthenticated()) {
                this.$router.push({name: "error"});
            }
        },
    }
</script>

<style scoped>

    .content{
        padding: 0px !important;
    }

    .validationErrors{
        background-color:#f50057;
        box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);      
        color:white;
        font-weight: bold;
        display: none;
        margin-bottom: 14px;
        padding-top: 10px;
        padding-bottom: 0.03px;
    }

    .validationOK{
        background-color:hsl(155, 100%, 38%);
        box-shadow: 0px 2px 8px 2px rgba(0, 110, 255, 0.3);      
        color:white;
        font-weight: bold;
        display: none;
        margin-bottom: 14px;
        padding-top: 10px;
        padding-bottom: 0.03px;
    }

    * {
        font-family: "Archivo"
    }
    label{
        text-align: left;
    }
      
    .bothCards {
        margin-left: 20%;
        margin-right: 20%;
        padding: 15px;
    }

    .continueButton {
        background-image: linear-gradient(to right, #00fb82, #187fe6);
        border: none;
        border-radius: 30px;
        color: white;
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

    textarea{
        height: 130px;
        resize: none;
    }

    textarea:focus{
        border-color: #00fb82;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;  
        color:black;
        font-weight: semibold; 
    }

    textarea:hover{
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
        .title {
            display: inline-block;
            font-size: 30px;
            
            font-weight: bold;
            margin-top: 5%;
        }

        
    }
</style>
