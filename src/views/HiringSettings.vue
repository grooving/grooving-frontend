<template>
<div class="prueba">
    <div class="everything">
        <div class="paymentSelect">
            <div v-for="p in farePackages" :key="p.package_id">
                <div class="paymentOptions"><FareHiring :fixedPrice="p.fare.priceHour"/></div>
            </div>
        </div>
        <div v-if="customPackages.length != 0" class="paymentSelect">
            <div v-for="p in customPackages" :key="p.package_id">
                <div class="paymentOptions"><CustomHiring :minimumPrice="p.custom.minimumPrice" :packageId="p.package_id" :customId="p.custom_id"/></div>
            </div>
        </div>
        <div v-else class="paymentSelect">
            <div class="paymentOptions"><CustomHiring :empty="true"/></div>
        </div>
        <div class="paymentSelect">
            <div v-for="p in performancePackages" :key="p.package_id">
                <div class="paymentOptions"><PerformanceHiring :duration="p.performance.hours" :description="p.performance.info" :fixedPrice="p.performance.price"/></div>
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
                })            
        }
    },

    created() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();
    },
}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

    @media (min-width:768px)  {
      
        .everything {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5%;
            text-align: center;
            padding: 15px;
            margin-left: 10%;
            margin-right: 10%;
            margin-top:0%;
        }
    }

</style>
