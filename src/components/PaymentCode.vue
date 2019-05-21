<template>
    <div>
    <div class="content">
    <form v-on:submit.prevent.prevent="receivePayment()">
        <div class="form-row">
            <div class="form-group col-12">
                <p class="title">{{gtrans.translate('inputCode')}}:</p>
                <input id="inputCode" maxlength="100" v-model="code" type="text" class="form-control" required>
            </div>  
        </div>
        <div class="continueButtonDiv"><button v-bind:to="continueURI"
            class="btn btn-primary continueButton"><span class="continueText">{{gtrans.translate('send')}}</span></button></div>

    </form>
    </div>
    </div>
</template>

<script>

import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js"

export default {

    name: "paymentCode",

    data: function(){
    	return{
    		gsecurity: GSecurity,
            gaxios: GAxios,
            errors: '',
            gtrans: undefined,
            code: '',
    	}
    },

    props: {
        continueURI: {
            type: String,
            default: 'paymentConfirmation'
        } 
    },

    methods: {
    	receivePayment(){
            NProgress.start();
			var authorizedGAxios = GAxios;
            var GAxiosToken = this.gsecurity.getToken();
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;
            //authorizedGAxios.defaults.headers.common['Content-Type'] = 'application/json';
            console.log(this.code);
    		authorizedGAxios.put(endpoints.paymentCode, {
                "paymentCode": this.code
    			}).then(response => {
                    console.log(response);
                    var userPicture = response.data.photo;
                    var userName = response.data.name;
                    var offerPrice = response.data.price;
                    //var offerID = response.data.offerId;
                    var arrayOffer = [userPicture, userName, offerPrice];

                    this.$emit('offerDetails', arrayOffer);
                    this.$router.push('/paymentConfirmation');
	      		}).catch(ex => {
                    console.log(ex);
                    if (ex.response.data.error != null){
                        this.$emit('errorPayment', ex.response.data.error);
                        window.scrollTo(0,0);
                    } else if (ex.response.data.paypal != null) {
                        this.$emit('errorPayment', ex.response.data.paypal);
                        window.scrollTo(0,0);   
                    }
	      		}).then(() => {
                    NProgress.done()
                });
    	}
    },

    created: function(){
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
        
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')
    },
    
    beforeMount(){

        // ----- Support for QR-Codes ----
        // If the code is provided by URL parameters,
        // we retrieve it
        if(this.$route.query['paymentCode'])
            this.code = this.$route.query['paymentCode'];

    },
}
</script>

<style scoped>
    
    input:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .3) !important;
    }

    input:focus{
        border-color: #00fb82;
        font-weight: semibold;
        color:black;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        
    }

    .continueButton {
        font-size: 18px;
        padding-left: 4%;
        padding-right: 4%;
        border: none;
        border-radius: 30px;
        width: fit-content;
        margin-top: 2%;
        font-weight: bold;
    
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .continueButton:hover{
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .title {
        text-align: center;
        font-size: 30px;
        margin-top: 5%;
        margin-bottom: 5%;
        font-weight: bold;
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
            margin-top:5px;
            width: 320px;
            margin-right: 4%;
            margin-left: 4%;
            margin-bottom: 0;
        }

        .content{
            margin-left: 3%;
            margin-bottom: 12%;
            height: 305px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
            
            
        }
    }


</style>
