<template>
    <div class="content">
        <form v-on:submit.prevent="createFare">
            <div class="form-row">
                <div class="form-group col-12">
                    <span style="font-weight:bold;font-size:30px;">{{gtrans.translate('fare_title')}} </span>
                    <router-link to="hiringSettings" style="height: 28px; width: 28px">
                        <i class="material-icons iconOffer">clear</i>
                    </router-link>
                    <h6 class="card-subtitle mb-2 text-muted">{{gtrans.translate('fare_subtitle')}} </h6>
                    <div id="errorsDiv" class="validationErrors vertical-center">
                        <p style="margin: 0px;">{{errors}}</p>
                    </div>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('fare_fixedPrice')}}</p>
                        <div class="input-group">
                            <input v-model="fixedPrice" type="number" class="form-control" min="0.01" step="0.01" required>
                            <div class="input-group-append">
                                <span class="input-group-text">€/h</span>
                            </div>
                        </div>
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
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js"

export default {
    name: "CreateFareHiring",

    data: function() {
        return {
            fixedPrice:{},
            errors: "",
            gsecurity: GSecurity,
            gtrans: undefined,
        }
    },

    methods: {
        createFare() {
            NProgress.start();
            GAxios.post(endpoints.fare, {
                "priceHour": this.fixedPrice,
            }).then(response => {
                console.log(response);
                this.$router.push({name: "hiringSettings"});
            }).catch(ex => {
                console.log(ex);
                console.log(ex.response.data.error);
                this.errors = ex.response.data.error;
                document.getElementById("errorsDiv").style.display = "block";
            }).then( () => {
                NProgress.done();
            })
        },
    },

    created() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
        
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')
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