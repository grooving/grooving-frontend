<template>
<div class="prueba">
    <div class="everything">
        <div class="paymentSelect">
          <div class="paymentOptions"><CreateFareHiring/></div>
        </div>
    </div>
</div>
</template>

<script>
import CreateFareHiring from '@/components/CreateFareHiring.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';

export default {
    name: 'CreateFare',

    components: {
        CreateFareHiring,
    },
    
    data: function() {
        return {
            gsecurity: GSecurity,
            packages: Array(),
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
                        if (packages[i].fare != null){
                            this.packages.push({
                                fare: packages[i].fare,
                            });
                        }
                    }

                    if (this.packages.slice().length >= 1) {
                         this.$router.push({name: "error"});
                    }
                    
                }).catch(ex => {
                    console.log(ex);
                }).then(() => {
                    NProgress.done()
                });           
        }
    },

    mounted: function() {
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
