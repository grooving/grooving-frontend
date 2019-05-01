<template>
<div class="container-fluid my-5">
    <div class="container">
        <div class="row">
            <div id="fareHiringCards" class="col-12 col-md-6 col-lg-4 hiringSection">
                <div v-if="farePackages.length != 0" class="paymentSelect">
                    <div v-for="p in farePackages" :key="p.package_id">
                        <div class="paymentOptions"><FareHiring :fixedPrice="p.fare.priceHour" :packageId="p.package_id" :fareId="p.fare_id"/></div>
                    </div>
                    <hr>
                </div>
                <div v-else class="paymentSelect">
                    <div class="paymentOptions"><FareHiring :empty="true"/></div>
                    <hr>
                </div>
            </div>
            <div id="customHiringCards" class="col-12 col-md-6 col-lg-4 hiringSection">
                <div v-if="customPackages.length != 0" class="paymentSelect">
                    <div v-for="p in customPackages" :key="p.package_id">
                        <div class="paymentOptions"><CustomHiring :minimumPrice="p.custom.minimumPrice" :packageId="p.package_id" :customId="p.custom_id"/></div>
                    </div>
                    <hr>
                </div>
                <div v-else class="paymentSelect">
                    <div class="paymentOptions"><CustomHiring :empty="true"/></div>
                    <hr>
                </div>
            </div>
            <div id="PerformanceHiringCards" class="col-12 col-md-6 col-lg-4 hiringSection">
                <div class="paymentSelect">
                    <div v-for="p in performancePackages" :key="p.package_id">
                        <div class="paymentOptions"><PerformanceHiring :duration="p.performance.hours" :description="p.performance.info" :fixedPrice="p.performance.price" :packageId="p.package_id" :performanceId="p.performance_id"/></div>
                    </div>
                    <div v-if="performancePackages.length == 0" class="content">
                        <form>
                            <div class="form-row">
                                <div class="form-group col-12">
                                    <span class="card-title" style="font-weight:bold;font-size:30px;margin-bottom:12px">{{gtrans.translate('hiringSettings_performanceHiring')}}</span>
                                    <h6 class="card-subtitle mb-2 text-muted">{{gtrans.translate('hiringSettings_performanceDescription')}}</h6>
                                    <router-link to="createPerformance">
                                        <div class="continueButtonDiv">
                                            <b-button class="continueButton" variant="primary" size="sm" type="submit">{{gtrans.translate('hiringSettings_addNew')}}</b-button>
                                        </div>
                                    </router-link>
                                </div>  
                            </div>
                        </form>
                    </div>
                    <div v-else>
                        <router-link to="createPerformance">
                            <div class="continueButtonDiv">
                                <b-button class="continueButton" variant="primary" size="sm" type="submit">{{gtrans.translate('hiringSettings_addNew')}}</b-button>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import CustomHiring from '@/components/CustomHiring.vue';
import FareHiring from '@/components/FareHiring.vue';
import PerformanceHiring from '@/components/PerformanceHiring.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js";

export default {
    name: 'HiringSettings',

    components: {
        CustomHiring,
        FareHiring,
        PerformanceHiring,
    },
    
    data: function() {
        return {
            gsecurity: GSecurity,
            packages: Array(),
            gtrans: GTrans,
        }
    },

    computed: {
        customPackages: function() {
            return this.packages.filter(item => item.custom != null);
        },
        farePackages: function() {
            return this.packages.filter(item => item.fare != null);
        },
        performancePackages: function() {
            return this.packages.filter(item => item.performance != null);
        }
    },

    beforeMount: function(){
        if (!this.gsecurity.hasRole('ARTIST')) {
            this.$router.push({name: "error"});
        } else {
            NProgress.start();
            var GAxiosToken = this.gsecurity.getToken();
            var authorizedGAxios = GAxios;
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token '+ GAxiosToken;
            
            authorizedGAxios.get(endpoints.paymentPackages + this.gsecurity.getId() + '/')
                .then(response => {
                    console.log(response.data);
                    var packages = response.data;

                    for (var i = 0; i < packages.length; i++) {
                        this.packages.push({
                            custom: packages[i].custom,
                            custom_id: packages[i].custom_id,
                            description: packages[i].description,
                            fare: packages[i].fare,
                            fare_id: packages[i].fare_id,
                            package_id: packages[i].id,
                            performance: packages[i].performance,
                            performance_id: packages[i].performance_id,
                        });
                    }
                    
                }).catch(ex => {
                    console.log(ex);
                }).then(() => {
                    NProgress.done()
                });
        }
    },

    created() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();
        this.gtrans = new GTrans(this.gsecurity.getLanguage());
    },
}
</script>

<style scoped>

    * {
        font-family: "Archivo"
    }

    hr{
        background-color: white;
        height: 5px;
        margin: 0 auto;
        border-width: 2px;
    }

    .addPerformancePackage{
        margin-top: 25px;
        background-color: #bdbdbd;
        color: #424242;
        height: 50px;
        border-radius: 10px;
        justify-content: center;
        vertical-align: middle;
        cursor: pointer;
    }

    .addPerformancePackage p{
        position: relative;
        top: 50%;
        transform: perspective(1px) translateY(-50%);
        font-weight: bold;
        font-size: 18px;
    }

    .addPerformancePackage:hover{
        background-color: #9e9e9e;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .5) !important;
    }

    @media (min-width:768px)  {
        hr{
            display:none;
        }
        .everything {
            display: flex;
            justify-content: center;
            margin-top: 5%;
            text-align: center;
            padding: 15px;
            margin-left: 10%;
            margin-right: 10%;
            margin-top:0%;
            vertical-align: top;
        }
    }

    .hiringSection{
        padding-right: 0px;
        padding-left: 0px;
    }

    a.router-link-active {
        color: #187fe6 !important;
    }

    .content {
        padding: 10px;
    }

    .contentAdd{
        padding: 10px;
        
    }

    .contentAdd p {
        position: relative !important;
        top: 50% !important;
        transform: perspective(1px) translateY(-50%) !important;
    }

    .continueButton {
        font-size: 22px;
        font-weight: bold;
        border: none;
        border-radius: 30px;
        width: 45%;
        min-width: 127px;
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .continueButton:hover{
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.7) !important;
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .continueButtonDiv {
        margin-top: 30px;
        margin-bottom: 5%;
        display: flex;
        justify-content: center;
    }


    .form-group.col-12 {
        margin-bottom: 0px;
        min-height: 170px;
    }

    .iconOffer  {
         font-size: 28px;
         float: right;
    }

    @media (max-width:767px)  {
        .content{
            padding-top: 5%;
            margin-right: 3%;
            margin-left: 3%;
        }

        .contentAdd{
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

        .contentAdd{
            margin-top: 10% !important;
            margin-left: 3%;
            border-radius: 10px;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
        }
    }

</style>
