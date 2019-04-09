<template>
    <div class="content">
        
        <form v-on:submit="updatePerformance">
            <div class="form-row">
                <div class="form-group col-12">
                    <span style="font-weight:bold;font-size:30px;">Performance Hiring </span>
                    <router-link to="/hiringSettings" style="height: 28px; width: 28px">
                        <i class="material-icons iconOffer">clear</i>
                    </router-link>
                    <h6 class="card-subtitle mb-2 text-muted">You can define your own shows indicating its description, duration and price. </h6>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">DESCRIPTION</p>
                        <div class="input-group">
                            <input v-model="description" type="text" class="form-control" maxlength="50" required>
                        </div>
                    </div>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">DURATION</p>
                        <div class="input-group">
                            <input v-model="duration" type="number" class="form-control" min="0.01" step="0.01" required>
                            <div class="input-group-append">
                                <span class="input-group-text">h</span>
                            </div>
                        </div>
                    </div>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">FIXED PRICE</p>
                        <div class="input-group">
                            <input v-model="fixedPrice" type="number" class="form-control" min="0.01" step="0.01" required>
                            <div class="input-group-append">
                                <span class="input-group-text">€/h</span>
                            </div>
                        </div>
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
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';

export default {
    name: "EditPerformanceHiring",

    props: {
        description: {},
        duration: {},
        fixedPrice: {},
        packageId: {},
        performanceId: {},
        
    },

    methods: {
        updatePerformance() {
            //alert(this.duration);
            NProgress.start();
            GAxios.post(endpoints.performance + this.performanceId + '/', {
                "info": this.description,
                "hours":this.duration,
                "price":this.fixedPrice,
            }).then(response => {
                console.log(response);
                this.$router.push({name: "hiringSettings"});
            }).catch(ex => {
                console.log(ex);
            }) 
            NProgress.done();
        },
    },

    created() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();
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