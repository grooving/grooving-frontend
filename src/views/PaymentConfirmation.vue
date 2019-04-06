<template>
    <div class="everything">
        
        <div class="tarjeta">
            <a v-bind:href="customerURI">
                <img v-if="!userPhoto" src="@/assets/defaultPhoto.png" class="card-img-top customerImage" alt="Artist's Image">
                <img v-else v-bind:src="userPhoto" class="card-img-top customerImage" alt="Artist's Image">
            </a>
            <div class="card-body cuerpoTarjeta cuerpoTarjetaTop">
                <div class="leftContent">
                    <h5 class="card-title customerName">{{ this.userName }}</h5>
                </div>
                <div class="rightContent">
                    <p class="price">{{ this.offerPrice }}€</p>
                </div>
                <hr>
            </div>
            <hr>
            <div class="card-body cuerpoTarjeta">
                <div class="confirmation"><img class="tick" src="@/assets/img/approved_tick.png"/>
                    <p class="price">{{sentText}}</p>
                </div>      
            </div>
        </div>
    </div>
</template>

<script>

    import GAxios from '../utils/GAxios.js'
    import GSecurity from '@/security/GSecurity.js';
    import endpoints from '@/utils/endpoints.js';
    import { mapGetters } from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        name: 'PaymentConfirmation',
        computed: mapGetters(['offer']),
        data: function() {
            return {
                gsecurity: GSecurity,
                gaxios: GAxios,
                userName: '',
                userPhoto: '',
                offerPrice: ''
            }
        },
        props: {
            customerURI: {
                type: String,
                default: '#'
            },
            customerImage: {
                type: String,
                default: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-11/2/13/asset/buzzfeed-prod-web08/sub-buzz-11149-1478107381-1.png',
            },
            customerName: {
                type: String,
                default: 'Mr. Pug'
            },
            sentText: {
                type: String,
                default: 'Received'
            },
            price: {
                type: String,
                default: '$156.00'
            },
        },
        methods: {
            ...mapActions(['setPaymentConfirmation']),
        },
        beforeMount() {
            console.log("holita");

            var paymentConfirmation = this.$store.getters.paymentConfirmation;
            if(!paymentConfirmation || !paymentConfirmation.userName){
                this.$router.push("/error")
            }
            this.userName = this.$store.getters.paymentConfirmation.userName;
            console.log(this.userName);
            this.userPhoto = this.$store.getters.paymentConfirmation.userPhoto;
            this.offerPrice = this.$store.getters.paymentConfirmation.offerPrice;

            this.setPaymentConfirmation(undefined);
            
        }
    }   

</script>

<style scoped>
    * {
        font-family: "Archivo"
    }
    .card-img-top {
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
    }

    .customerImage {
        object-fit: cover;
        max-height: 200px;
        border-bottom: 1px;
        box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, .3);
    }

    .tick{
        margin-top: 10px;
        width: 140px;
        margin-bottom: 20px;
    }
    .price {
        font-size: 35px;
        margin-bottom: 0px;
        color: #187FE6;
    }

    .leftContent {
        text-align: left;
        overflow: auto;
    }

    .customerName {
        font-size: 32px;
        margin-bottom: 0px;
        padding-bottom: 0px;
        word-wrap: break-word;
    }

    .rightContent {
        padding-left: 20px;
        margin-left: auto;
        margin-right: 0px;
    }

    .tarjeta {
        width: 100%;
    }

    .cuerpoTarjeta {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    hr {
        margin: 0px;
    }

    @media (max-width:767px)  {
        .calendarButton {
            padding-top: 5%;
            margin-right: 3%;
            margin-left: 3%;
        }
    }

    @media (min-width:768px)  {

        .tarjeta {
            min-width: 335px;
            width: 25%;
            box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
            margin-left: 2.5%;
            margin-right: 2.5%;
            margin-top: 2em;
            border-radius: 10px;
        }

        .customerImage {
            border-radius: 10px 10px 0px 0px;
        }
      
        .everything {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 15px;
            margin-left: 10%;
            margin-right: 10%;

        }
    }

</style>
