<template>
<div class="prueba">
    <div class="everything">
        <div class="paymentSelect">
          <div class="paymentOptions"><CustomHiring :minimumPrice="minimumPrice"/></div>
        </div>
    </div>
</div>
</template>

<script>
import CustomHiring from '@/components/CustomHiring.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';

export default {
    name: 'HiringSettings',

    components: {
        CustomHiring
    },
    
    data: function() {
        return {
            gsecurity: GSecurity,
        }
    },

    props: {
        minimumPrice: {
            type: Number,
        },
    },

    beforeMount: function() {

        if (!this.gsecurity.hasRole('ARTIST')) {
            this.$router.push({name: "error"});
        }
    }
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
