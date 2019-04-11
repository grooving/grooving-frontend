<template>
    <div class="content">
        <form class="hola">
            <div class="form-row">
                <div class="form-group col-12">
                    <span>Credit card info</span>
                </div>
            </div>
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
            <div class="btn btn-primary continueButton" @click="payWithCreditCard"><span class="continueText">SUBMIT</span></div>

        </form>
   </div>
</template>
<script>
import braintree from 'braintree-web';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';


export default {
    name: "CreditCardPaymentBrain",
    data (){
        return {
            gsecurity: GSecurity,
            name: undefined,
            auth_key: undefined,
        }
    },
    methods: {
        obtainInstance() {
            braintree.client.create({
            
            authorization: this.auth_key
            })
            .then(clientInstance => {
                
                let options = {
                    client: clientInstance,
                    styles: {
                        input: {
                            'font-size': '15px',
                            'font-family': 'Comic-Sans'
                        }
                    },
                    fields: {
                        number: {
                            selector: '#number',
                            placeholder: 'Enter Credit Card',
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
                return braintree.hostedFields.create(options)
                })
                .then(hostedFieldInstance => {
                    this.hostedFieldInstance = hostedFieldInstance;
                    console.log(this.hostedFieldInstance)
                })
                .catch(err => {
                    console.log(err)
                });
            
        },
        payWithCreditCard() {
            if(this.hostedFieldInstance)
            {
                this.hostedFieldInstance.tokenize().then(payload => {
                    this.$emit('finishPayment', payload.nonce)
                    console.log(payload.nonce)
                })
                .catch(err => {
                    console.error(err);
                })
            }
        }
    }, 
    beforeMount() {
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

    /* .test {
        border-color: #00fb82 ;
        font-weight: semibold ;
        color:black ;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) ;
    } */

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
