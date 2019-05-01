<template>
    <div class="content">
        <div id="errorsDiv" class="validationErrors vertical-center">
            <p style="margin: 0px;">{{errors}}</p>
        </div>
        <div class="paymentOptions">
            <!-- <p>{{gtrans.translate('selectMethod')}}</p> -->
            <!-- <div class="continueButtonDiv"><div  class="btn btn-primary continueButton"><span class="continueText">PAYPAL</span></div @click="paymentOptionSelected()"></div> -->
            <!-- <br> -->
            <div @click="paymentOptionSelected()"
                class="btn btn-primary continueButton"><span class="continueText">{{gtrans.translate('creditcard')}}</span>
            </div>
            <br><br>
            <div id="paypal-button-container" class="button"></div>
            <!-- <div @click="paymentOptionSelected()"
                class="btn btn-primary continueButton"><span class="continueText">PAYPAL</span>
            </div> -->
        </div>
    </div>
</template>
<script src="https://www.paypal.com/sdk/js?client-id=AVwB_2wUfHN5UCJO1Ik6uWkFbALgetwYKS5_BJ6gr9bR6wcEP5iFK84Nme_ebMbXI4yQdgH5BX2Tld2o&currency=EUR&intent=authorize"></script>
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

    },
    mounted() {
        this.nextStep = '/payment/' + this.$route.params['artistId']

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
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: '0.01'
                    }
                }]
            });
        },
        onApprove: function(data, actions) {

            // Authorize the transaction
            actions.order.authorize().then(function(authorization) {

                // Get the authorization id
                var authorizationID = authorization.purchase_units[0]
                .payments.authorizations[0].id

                // Call your server to validate and capture the transaction
            });
        }
    }).render('#paypal-button-container');
    },

    created: function(){
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
        
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')
    }
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
