<template>
    <div id="wholePage" class="col-12">
        <div class="title"><p>Breach Notification</p></div>
        <div class="subtitle"><p>This message will be sent to all the users of the system</p></div>
        <div class="bothCards">
            <form>
                <div class="form-group">
                    <small for="exampleInputEmail1">SUBJECT</small>
                    <input style="font-weight: bold;" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Subject">
                </div>
                <div class="form-group">
                    <small for="exampleInputPassword1">BODY</small>
                    <textarea class="form-control" id="exampleInputPassword1" placeholder="Enter the body of the message..."/>
                </div>
                <button type="submit" class="continueButton">SUBMIT</button>
            </form>
        </div>
    </div>
</template>

<script>
    import GSecurity from "@/security/GSecurity.js";

    export default {
        name: 'BreachNotification',

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
        },

        props: {
            error: false,
        },
        
        created() {
            this.gsecurity = GSecurity;
            this.gsecurity.obtainSavedCredentials();
        },

        beforeMount: function() {
            if (!this.gsecurity.isAuthenticated()) {
                this.$router.push({name: "error"});
            }
        },
    }
</script>

<style scoped>
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
