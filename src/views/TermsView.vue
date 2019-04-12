<template>
    <div class="hell">
        <div class="title"><p>Terms and Conditions</p></div>

    <div class="everything">
        <div class="addDiv">
          <div class="termsText"><TermsText :termAndCond="this.termsAndCond" /></div>
        </div>
    </div>
    </div>
</template>

<script>
import TermsText from '@/components/TermsText.vue'
import GSecurity from '@/security/GSecurity.js';
import GAxios from '@/utils/GAxios.js';

export default {

    name: 'AddressInput',
    components: {
        TermsText, 
    },
    data() {
        return {

            //Hiring Process...
            gsecurity: GSecurity,
            termsAndCond: undefined,
        }
    },

    mounted() {

        NProgress.start();

        GAxios.get('/terms')
        .then(response => {

        this.termsAndCond = response.data;
        
        }).then( () => {NProgress.done()});

    },
    
}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

    .title {
        display: none;
    }

    @media (min-width:768px)  {
      
        .everything {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5%;
            text-align: center;
            padding: 15px;
            margin-left: 35%;
            margin-right: 35%;
            margin-top:0%;
        }
        .title {
            display: inline-block;
            margin-right: 12%;
            margin-left: 10%;
            text-align: left;
            font-size: 50px;
            margin-top: 5%;
            font-weight: bold;
        }
        
    }

</style>
