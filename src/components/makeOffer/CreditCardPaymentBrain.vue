<template>
    <div>
    <div id="errorsDiv" class="validationErrors vertical-center">
        <p style="margin: 0px;">{{errors}}</p>
    </div>
    <div class="content">
        <form class="hola">
            <div class="form-row">
                <div class="form-group col-12">
                    <div id="number" class="form-control test"></div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col entrada">
                    <div id="expirationMonth" class="form-control test"></div>
                </div>
                <div class="form-group col entrada">
                    <div id="expirationYear" class="form-control test"></div>
                </div>
                <div class="form-group col entrada">
                    <div id="cvv" class="form-control test"></div>
                </div>
            </div>
            <div id="sendButton" class="btn btn-primary continueButton" @click="payWithCreditCard"><span class="continueText">{{gtrans.translate('sendOffer')}}</span></div>

            <div style="display:none" id="paypalButton" ></div>
        </form>
    </div>
    </div>
</template>
<script>
import braintree from 'braintree-web';
import paypal from 'paypal-checkout';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';
import {mapGetters} from 'vuex';
import GTrans from "@/utils/GTrans.js"


export default {
    name: "CreditCardPaymentBrain",
    data (){
        return {
            gsecurity: GSecurity,
            hostedFieldInstance: false,
            name: undefined,
            auth_key: undefined,
            errors: "",
            amount: 10,
            gtrans: undefined,
        }
    },
    methods: {
        obtainInstance() {
            NProgress.start();
            braintree.client.create({
            
            authorization: this.auth_key
            })
            .then(clientInstance => {
                
                let options = {
                    client: clientInstance,
                    styles: {
                        'input': {
                            'font-size': '15px',
                            'font-family': 'Courier'
                        }
                    },
                    fields: {
                        number: {
                            selector: '#number',
                            placeholder: this.gtrans.translate('creditcard_placeholder'),
                            maxCardLength: 16,
                        },
                        cvv: {
                            selector: '#cvv',
                            placeholder: 'CVV',
                            maxlength: 3,
                        },
                        expirationMonth: {
                            selector: '#expirationMonth',
                            placeholder: 'MM',
                            maxlength: 2,
                        },
                        expirationYear: {
                            selector: '#expirationYear',
                            placeholder: 'YYYY',
                        }
                    }
                }
                return Promise.all([
                    braintree.hostedFields.create(options),
                    braintree.paypalCheckout.create({ client: clientInstance })
                    ])
                })
                .then(instances => {

                    const hostedFieldInstance = instances[0];
                    const paypalCheckoutInstance = instances[1];

                    this.hostedFieldInstance = hostedFieldInstance;

                    // Setup PayPal Button
                    return paypal.Button.render({
                        env: 'sandbox',
                        style: {
                            label: 'paypal',
                            size: 'responsive',
                            shape: 'rect'
                        },
                        payment: () => {
                            return paypalCheckoutInstance.createPayment({
                                    flow: 'vault',
                                    intent: 'authorize',
                                    amount: this.amount,
                                    displayName: 'Braintree Testing',
                                    currency: 'EUR'
                            })
                        },
                        onAuthorize: (data, options) => {
                            return paypalCheckoutInstance.tokenizePayment(options).then(payload => {
                                console.log(payload);
                                this.errors = "";
                                this.nonce = payload.nonce;
                                this.$emit('finishPayment', this.nonce)
                            })
                        },
                        onCancel: (data) => {
                            console.log(data);
                            console.log("Payment Cancelled");
                        },
                        onError: (err) => {
                            console.error(err);
                            this.errors = this.gtrans.translate('paypal_error');
                            document.getElementById("errorsDiv").style.display = "block";
                        }
                    }, '#paypalButton')

                })
                .catch(err => {
                    console.log(err)
                }).then(() => {
                    NProgress.done();
                });
            
        },
        payWithCreditCard() {
            if(this.hostedFieldInstance)
            {
                document.getElementById("sendButton").style.display = "none";
                NProgress.start();
                this.hostedFieldInstance.tokenize().then(payload => {
                    this.$emit('finishPayment', payload.nonce)
                    console.log(payload.nonce)
                })
                .catch(err => {
                    console.error(err);
                    this.errors = err.message;
                    document.getElementById("errorsDiv").style.display = "block";
                    document.getElementById("sendButton").style.display = "block";
                    window.scrollTo(0,0);
                    NProgress.done();
                });
            }
        }
    }, 
    beforeMount() {
        this.amount = this.$store.getters.offer.totalPrice;
        var authorizedGAxios = GAxios;
        var GAxiosToken = this.gsecurity.getToken();
        authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

        authorizedGAxios.get(endpoints.braintree)
        .then(response => {
            this.auth_key = response.data
        }).catch(ex => {
            console.log(ex);
        }).then(() => this.obtainInstance());        
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

    * {
        font-family: "Archivo"
    }

    .hola {
        margin-top: 20px;
        margin-left: 10%;
        margin-right: 10%;
    }
    
    .test:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .3) !important;
    }

    .paypalB {
        margin-top:15px; 
        width:200px;
        
        margin-left: 19%;

    }

    input:focus + .test {
        display: block;
    }

    .continueButton {
        font-size: 18px;
        padding-left: 4%;
        padding-right: 4%;
        border: none;
        border-radius: 30px;
        width: fit-content;
        font-weight: bold;
        margin-top: 5%;
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .continueButton:hover{
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .validationErrors{
        background-color:#f50057;
        border-radius: 5px;
        box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);      
        color:white;
        display: none;
        font-weight: bold;
        height: 100%;
        margin-bottom: 14px;
        padding: 10px;
        padding-top: 12px;
    }

    @media (max-width:767px)  {
        .content{
            padding-top: 5%;
            margin-right: 3%;
            margin-left: 3%;
        }
    }

    @media (min-width:768px)  {

        .continueButton{
            
            margin-right: 25%;
            margin-left: 25%;
        }
        
        form{
            margin-right: 4%;
            margin-left: 4%;
        }

        .content{
            height: 300px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
        }

        .entrada{
            width: 5px !important;
        }
    }


</style>
