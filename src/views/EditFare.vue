<template>
<div class="prueba">
    <div class="everything">
        <div class="paymentSelect">
          <div class="paymentOptions"><EditFareHiring :fixedPrice="fixedPrice" :packageId="packageId" :fareId="fareId"/></div>
        </div>
    </div>
</div>
</template>

<script>
import EditFareHiring from '@/components/EditFareHiring.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';

export default {
    name: 'EditFare',

    components: {
        EditFareHiring
    },
    
    data: function() {
        return {
            gsecurity: GSecurity,
        }
    },

    props: {
        fixedPrice: {},
        packageId: {},
        fareId: {},
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
