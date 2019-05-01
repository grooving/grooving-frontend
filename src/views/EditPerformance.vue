<template>
<div class="prueba">
    <div class="everything">
        <div class="paymentSelect">
          <div class="paymentOptions"><EditPerformanceHiring :description="description" :duration="duration" :fixedPrice="fixedPrice" :packageId="packageId" :performanceId="performanceId"/></div>
        </div>
    </div>
</div>
</template>

<script>
import EditPerformanceHiring from '@/components/EditPerformanceHiring.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';

export default {
    name: 'EditPeformance',

    components: {
        EditPerformanceHiring
    },
    
    data: function() {
        return {
            gsecurity: GSecurity,
        }
    },

    props: {
        description: {},
        duration: {},
        fixedPrice: {},
        packageId: {},
        performanceId: {},
    },

    beforeMount: function(){

        if (!this.gsecurity.hasRole('ARTIST')) {
            this.$router.push({name: "error"});
        }
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
