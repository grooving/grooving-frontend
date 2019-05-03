<template>
    <div class="content">
        <div id="errorsDiv" class="validationErrors vertical-center">
            <p style="margin: 0px;">{{errors}}</p>
        </div>
        <div class="paymentOptions">
            <!-- <p>{{gtrans.translate('selectMethod')}}</p> -->
            <!-- <div class="continueButtonDiv"><div  class="btn btn-primary continueButton"><span class="continueText">PAYPAL</span></div @click="paymentOptionSelected()"></div> -->
            <!-- <br> -->
            <div v-if="!paid" @click="paymentOptionSelected()"
                class="btn btn-primary continueButton"><span class="continueText">{{gtrans.translate('creditcard')}}</span>
            </div>
            <br><br>
            <div v-if="!paid" id="paypal-button-container" class="button"></div>
            <div v-if="paid" id="sendButton" class="btn btn-primary continueButton" style="margin-bottom: 40%" @click="payWithPayPal"><span class="continueText">{{gtrans.translate('sendOffer')}}</span></div>

        </div>
    </div>
</template>

<script>
import GSecurity from "@/security/GSecurity.js"
import GTrans from "@/utils/GTrans.js"

export default {
    name: "PaymentOptions",
    data() {
        return {
            nextStep: undefined,
            gsecurity: GSecurity,
            gtrans: undefined,
            paid: false,
            authId: undefined,
            amount: 10.56,
        }
    },
    props: {
        continueURI: {
            type: String,
            default: 'payment'
        } 
    },
    components: {
    },
    methods: {
        paymentOptionSelected(){
            this.$emit('paymentOptionSelected', 'CREDITCARD');
        },
        payWithPayPal() {
            this.$emit('finishPayment', this.authId)
        },
        paymentMade() {
            this.paid = true;
        }
    },
    beforeMount() {
        this.hiringType = this.$store.getters.offer.hiringType;
        if(this.hiringType == 'FARE' || this.hiringType == 'CUSTOM'){
            this.amount = this.$store.getters.offer.totalPrice; 
        } else if(this.hiringType == 'PERFORMANCE') {
            this.amount = this.$store.getters.offerPerformancePack.priceHour; 
        }
    },
    mounted() {

        this.nextStep = '/payment/' + this.$route.params['artistId']

        let  createOrder = (data, actions) => {
        // Make a call to the REST api to create the payment
            return actions.order.create({
            purchase_units: [{
                    amount: {
                        value: this.amount
                    }
                }]
            });
        }
        let  onApprove = (data, actions) => {
            NProgress.start();
            // Authorize the transaction
            actions.order.authorize().then(payload => {
                    this.authId = payload.id;
                }).then(() => {
                    this.paid = true;
                    NProgress.done();
                });
            
        }
        paypal.Buttons({

        style: {
                color:  'blue',
                shape:  'pill',
                label:  'paypal',
                fundingicons: 'false',
                tagline: 'false',
                layout: 'horizontal',
                size: 'responsive',
                height: 44,
        },
        createOrder,
        onApprove,
    }).render('#paypal-button-container');
    },

    created: function(){
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
        
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')
    },

}
</script>

<style scoped>

    .continueButton{
        width: 60%;
        max-width: 300px;
        color: white !important;
        font-weight: bold;
        border-radius: 25px;
        margin-top: 20px;

        font-size: 22px;
                
        border: none;


        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }



    .continueButton:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
    } 

    @media (max-width:768px)  {
        .content{
            padding-top: 5%;
            padding-bottom: 5%;
            margin: 0 auto;
            width: 100%;

        }   

        .button {
            width: 60%;
            max-width: 300px;
            margin: 0 auto;
        }
    }
        
    @media (min-width:768px)  {

        .content{
            background-color:white;
            height: 295px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            text-align: center;
            padding-left: 35px;
            padding-right: 35px;
            border-radius: 10px;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);

        }

        .continueButton{
            width: 100%;
            color: white !important;
            font-weight: bold;
            border-radius: 25px;

            font-size: 22px;
                    
            border: none;


            background-image: linear-gradient(to right, #00fb82, #187fe6);
        }

        .button {
            width: 100%;
        }

        .continueButton:hover{
            background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
            box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        }
    }


</style>
