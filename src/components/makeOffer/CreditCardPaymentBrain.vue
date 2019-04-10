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
            auth_key: "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI0NzBkODdiOWE3ZDc5ZGY3ODYxOGFhZDZiMWFkMmViZmMxYTNmMmQwMjc2NDJiMjlhYzIwZjBlY2Q4Njc0ZjQyfGNyZWF0ZWRfYXQ9MjAxOS0wNC0xMFQxMTo1NTozMC43OTUzMzYyNzQrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTJqcjR6NnF6NHJmNG41eHRcdTAwMjZwdWJsaWNfa2V5PWRxZ3drY3NtYjdqNjh3ZjciLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMmpyNHo2cXo0cmY0bjV4dC9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgifSwiY2hhbGxlbmdlcyI6W10sImVudmlyb25tZW50Ijoic2FuZGJveCIsImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy8yanI0ejZxejRyZjRuNXh0L2NsaWVudF9hcGkiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tLzJqcjR6NnF6NHJmNG41eHQifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiR3Jvb3ZpbmciLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJncm9vdmluZyIsImN1cnJlbmN5SXNvQ29kZSI6IkVVUiJ9LCJtZXJjaGFudElkIjoiMmpyNHo2cXo0cmY0bjV4dCIsInZlbm1vIjoib2ZmIn0=",
        }
    },
    methods: {
        finishPayment() {
            
        },
        payWithCreditCard() {
            if(this.hostedFieldInstance)
            {
                this.hostedFieldInstance.tokenize().then(payload => {
                    this.$emit('finishPayment', payload)
                })
                .catch(err => {
                    console.error(err);
                })
            }
        }
    }, 
    mounted() {
        var authorizedGAxios = GAxios;
        var GAxiosToken = this.gsecurity.getToken();
        authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

        authorizedGAxios.get(endpoints.braintree)
        .then(response => {
            console.log(response)
        }).catch(ex => {
            console.log(ex);
        });

        braintree.client.create({
            
            authorization: this.auth_key
        })
        .then(clientInstance => {
            
            let options = {
                client: clientInstance,
                styles: {
                    input: {
                        'font-size': '15px',
                        'font-family': 'Archivo'
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
            console.log('hi1' , options)
        })
        .then(hostedFieldInstance => {
            this.hostedFieldInstance = hostedFieldInstance;
        })
        .catch(err => {
            console.log(err)
        });
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
