<template>
<div class="prueba">
    <div v-if="errors === true" class="validationErrors">
        <p>Sorry! Something went wrong. Try again later.</p>
    </div>
    <div class="title"><p>Receive your payments</p></div>
    <div class="everything">
        <div class="paymentSelect">
          <div class="paymentOptions"><PaymentCode @errorPayment="showErrors" /></div>
        </div>
    </div>
</div>
</template>

<script>
import PaymentCode from '@/components/PaymentCode.vue'
import GSecurity from '@/security/GSecurity.js';

export default {
    name: 'receivePayment',
    components: {
        PaymentCode
    },
    props: {
        errors: {
            type: Boolean,
            default: false,
        },
    },

    data: function() {
        return {
            gsecurity: GSecurity,
        }
    },

    beforeMount: function() {
        if (!this.gsecurity.hasRole('ARTIST')) {
            this.$router.push({name: "error"});
        }
    },

    methods: {
        showErrors(value){
            this.errors=value;
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
