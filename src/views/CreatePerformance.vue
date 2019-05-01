<template>
<div class="prueba">
    <div class="everything">
        <div class="paymentSelect">
          <div class="paymentOptions"><CreatePerformanceHiring/></div>
        </div>
    </div>
</div>
</template>

<script>
import CreatePerformanceHiring from '@/components/CreatePerformanceHiring.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';

export default {
    name: 'CreatePerformance',

    components: {
        CreatePerformanceHiring,
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
