<template>
    <div class="content">
        <form action="/#/personalInfo">
            <div class="form-row">
                <div class="form-group col-12">
                    
                    <span style="font-weight:bold;font-size:30px;">Profile </span>
                    <router-link v-bind:to="{name: 'personalInfo', params: {}}" style="height: 28px; width: 28px">
                        <i class="material-icons iconOffer">clear</i>
                    </router-link>
                    <h6 class="card-subtitle mb-2 text-muted">Basic info of your Grooving account, like your name and email.</h6>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">FIRST NAME</p>
                        <b-form-group>
                            <b-form-input v-model="name" v-bind:value="name" style="text-align: right"></b-form-input>
                        </b-form-group>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">LAST NAME</p>
                        <b-form-group>
                            <b-form-input v-model="surnames" v-bind:value="surnames" style="text-align: right"></b-form-input>
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
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">PHONE</p>
                        <b-form-group>
                            <b-form-input v-model="phoneNumber" v-bind:value="phoneNumber" style="text-align: right"></b-form-input>
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
export default {
    name: "EditProfileInfo",
    props: {
        name: {
            type: String,
            //default: 'John'
        },
        surnames: {
            type: String,
            //default: 'Pug Retriever'
        },
        email: {
            type: String,
            //default: 'johnpug@pugsftw.com'
        },
        phoneNumber: {
            type: String,
            //default: '633017787'
        },
        username: {
            type: String,
            default: 'josembell'
        }
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