<template>
<div class="prueba">
    <div v-if="errors" id="errorsDiv" class="validationErrors vertical-center">
        <p style="margin: 0px;">{{errors}}</p>
    </div>
    <div class="title"><p>{{gtrans.translate('receivePayment')}}</p></div>
    <div class="everything">
        <div class="paymentSelect">
          <div class="paymentOptions"><PaymentCode @errorPayment="showErrors" @offerDetails="detailsOffer" /></div>
        </div>
    </div>
</div>
</template>

<script>
import PaymentCode from '@/components/PaymentCode.vue'
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js";
import {mapActions} from 'vuex';

export default {
    name: 'receivePayment',
    components: {
        PaymentCode
    },
    props: {
    },

    data: function() {
        return {
            gsecurity: GSecurity,
            gtrans: undefined,
            errors: undefined,
        }
    },

    beforeMount: function() {

        // ----- Support for QR-Codes ----
        // Redirection to login page if not log in
        let code = undefined;
        if(this.$route.query['paymentCode'])
            code = this.$route.query['paymentCode'];

        if(!this.gsecurity.isAuthenticated()){
            this.$router.push({name: "newUser", query: {paymentCode: code}});
        }else if (!this.gsecurity.hasRole('ARTIST')) {
            this.$router.push({name: "error"});
        }
    },

    created() {
        // Retreive stored credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
            
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')
    },

    methods: {
        showErrors(value){
            this.errors=value;
        },
        ...mapActions(['setPaymentConfirmation']),
        
        detailsOffer(value){
            //console.log("HOLA");
            //console.log(value);

            this.setPaymentConfirmation(value);

        }

    }
}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

    .title {
        display: none;
    }

    .validationErrors{
            background-color:#f50057;
            box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);
            
            color:white;
            font-weight: bold;
            height: 100%;
            display:block;
            align-content: center;
            padding-top: 15px;
            padding-top: 5px;
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

        .title {
            display: inline-block;
            margin-left: 18%;
            text-align: left;
            font-size: 50px;
            margin-top: 5%;
            margin-bottom: 0%;
            margin-left: 1px;
            font-weight: bold;
        }

               
    }

</style>
