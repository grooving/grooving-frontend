<template>
<div>
    <div id="errorsDiv" class="validationErrors vertical-center">
        <p style="margin: 0px;">{{errors}}</p>
    </div>
    <div class="everything">
        <div class="card tarjeta">
            <ul class="list-group list-group-flush"><li style="font-weight: bold" class="list-group-item">{{gtrans.translate('offer')}} #{{ offerID }}</li></ul>
            <div class="card-body cuerpoTarjeta">
                <div class="leftContent">
                    <div class="details">
                    <p class="card-text"><span style="font-weight: bold;">{{gtrans.translate('offer_date')}}: </span>{{ prettifiedDate }}</p>
                    <p class="card-text"><span style="font-weight: bold;">{{gtrans.translate('offer_duration')}}: </span>{{ startingHour }} {{ endingHour }}h</p>
                    <p class="card-text"><span style="font-weight: bold;">{{gtrans.translate('offer_price')}}: </span>{{ price }}€</p>
                    <p class="card-text"><span style="font-weight: bold;">{{gtrans.translate('offer_address')}}: </span>{{ address }}</p>
                    </div>
                    <div class="description">
                        <p class="card-text"><span style="font-weight: bold;">{{gtrans.translate('offer_package')}}: </span></p>
                        <p class="card-text">{{ packageDescription }}</p>
                        <p class="card-text"><span style="font-weight: bold;">{{gtrans.translate('offer_description')}}: </span></p>
                        <p class="card-text">{{ description }}</p>
                    </div>
                </div>
                
            </div>
            <div class="bothButtons">
                <div class="cancelButtonDiv"><router-link v-bind:to="cancelURI" class="btn btn-primary cancelButton"><span class="continueText">{{gtrans.translate('back')}}</span></router-link></div>
                <div v-if="status === 'PENDING'" class="confirmButtonDiv"><div @click="accept()" class="btn btn-primary confirmButton"><span class="continueText">{{gtrans.translate('accept')}}</span></div></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import endpoints from '@/utils/endpoints.js';
    import GAxios from '../utils/GAxios.js'
    import GSecurity from '@/security/GSecurity.js';
    import GTrans from "@/utils/GTrans.js"

    export default {
        name: 'extendedOffer',

        data() {
            return {
                gsecurity: GSecurity,
                gaxios: GAxios,
                id: Number,
                errors: '',
                gtrans: undefined,
            }
        },

        computed: {

            prettifiedDate: function(){

                var res = "";

                if(this.$props.date){
                    
                    var splittedDate = this.$props.date.split('T');

                    if(splittedDate.length == 2){

                        var dmy = splittedDate[0];
                        var timeGTM = splittedDate[1].split('+');
                        
                        res = dmy;

                        if(timeGTM[0])
                            res += " " + timeGTM[0]

                    }
                }

                return res;

            }

        },

        props: {
            offerID: {
                type: Number,
                default: 3
            },
            date: {
                type: String,
                default: 'March 19, 2019',
            },
            startingHour: {
                type: String,
                default: '',
            },
            endingHour: {
                type: String,
                default: '23:00',
            },
            price: {
                type: Number,
                default: 61.00
            },
            address: {
                type: String,
                default: 'Plaza de España s/n',
            },
            description: {
                type: String,
                default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            },
            cancelURI: {
                type: String,
                default: '/offers'
            },
            confirmURI: {
                type: String,
                default: '/acceptedOffer/'
            },
            packageDescription: {
                type: String,
                default: 'Performance'
            },
            status: {
                type: String,
            }
        },

        methods: {
            accept() {
                NProgress.start();
                var authorizedGAxios = GAxios;
                var GAxiosToken = this.gsecurity.getToken();
                authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;
                
                authorizedGAxios.put(endpoints.offer + this.$route.params['offerId'] + '/', 
                {
                    "status": "CONTRACT_MADE",
                }).then(response => {
                    console.log(response);
                    this.$router.push({path: '/offers/'})
                }).catch(ex => {
                    console.log(ex);  
                    this.errors = ex.response.data.error;
                    document.getElementById("errorsDiv").style.display = "block";
                    window.scrollTo(0,0);
                }).then( () => {
                    NProgress.done();
                })              
                },
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

    .details{
        padding-bottom: 3%;
    }

    .tarjeta {
        width: 100%;
    }

    .list-group-item {
        font-size: 36px;
        text-align: left;
    }
    
    .leftContent {
        text-align: left;
    }

    .cancelButtonDiv, .confirmButtonDiv {
        margin-left: 5%;
        margin-right: 5%;
    }

    .bothButtons {
        display: flex;
        justify-content: center;
        padding-bottom: 20px;
    }

    .confirmButton, .cancelButton {
        font-size: 18px;
        border: none;
        border-radius: 30px;
        font-weight: bold;
    }

    .confirmButton {
        margin-left: 3%;
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .cancelButton {
        margin-right: 3%;        
        background-image: linear-gradient(to right, #a2a2a2, #474747);
    }

    .confirmButton:hover {
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .cancelButton:hover {
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        background-image: linear-gradient(to right, #515151, #232323) !important;
    }

    @media (min-width:768px)  {

        .tarjeta {
            min-width: 335px;
            width: 70%;
            max-width: 900px;

            box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
        }
      
        .everything {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5%;
            text-align: center;
            padding: 15px;
            margin-left: 10%;
            margin-right: 10%;
            margin-bottom:5%;
        }

        .details {
            float: left;
            margin-right: 3%;
            flex-basis: 50%;
            flex-grow: 0;
            
        }

        .description {
            max-width: 250 px;
            flex-basis: 50%;
            flex-grow: 0;
            margin-left: 3%;
        }

        .leftContent {
            display: inline-flex;
            align-items: center;
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
    }

</style>

<style>

    p.card-text {
        word-break: break-word;
    }

</style>
