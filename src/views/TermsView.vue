<template>
    <div class="hell">
        <div class="title"><p style="text-align: center">{{gtrans.translate('terms_title')}}</p></div>

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
import GTrans from "@/utils/GTrans.js";

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
            gtrans: GTrans,
        }
    },

    mounted() {

        NProgress.start();

        GAxios.get('/terms')
        .then(response => {

        this.termsAndCond = response.data;
        
        }).then( () => {NProgress.done()});

    },

    created() {

        // Retrieve store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
    }
    
}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

    .title {
        display: inline-block;
        margin-right: 12%;
        margin-left: 10%;
        text-align: left;
        font-size: 2em;
        margin-top: 5%;
        font-weight: bold;
    }

    .everything {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 5%;
        text-align: center;
        margin-left: 5%;
        margin-right: 5%;
        margin-top:0%;
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
