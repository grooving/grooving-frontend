<template>
<div class="prueba">
    <div id="errorsDiv" class="validationErrors vertical-center">
        <p style="margin: 0px;">{{errors}}</p>
    </div>
    <div class="everything">
        <div class="paymentSelect">
          <div class="paymentOptions"><EditPerformanceHiring :description="description" :duration="duration" :fixedPrice="fixedPrice" :packageId="packageId" :performanceId="performanceId" @error="error"/></div>
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
            errors: '',
        }
    },

    props: {
        description: {},
        duration: {},
        fixedPrice: {},
        packageId: {},
        performanceId: {},
    },

    methods:{
        
        error(error) {
            //console.log(error)
            this.errors = error;

            document.getElementById("errorsDiv").style.display = "block";
            window.scrollTo(0,0);
        }
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
