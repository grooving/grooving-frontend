<template>
<div class="prueba">
    <div v-if="errors" class="validationErrors vertical-center">
        <p>Sorry! Something went wrong. Try again later.</p>
    </div>
    <div class="title"><p>Pick a starting date</p></div>
    <div class="everything">
        <div class="artistCard"><ArtistCard :artistName="this.artistData.artisticName" :artistImage="this.artistData.photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :totalPrice="this.totalPrice"/>
        </div>
        <div class="paymentDiv">
          <div class="creditCardPayment" style="min-width:400px;"><StartingDatePicker @startingHour="getHourAndMinutes"/></div>
        </div>
    </div>
</div>
</template>

<script>
import CreditCardPayment from '@/components/makeOffer/CreditCardPayment.vue'
import StartingDatePicker from '@/components/makeOffer/StartingDatePicker.vue'
import ArtistCard from '@/components/makeOffer/ArtistCard.vue'
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';
import { mapGetters } from 'vuex';
import {mapActions} from 'vuex';
import PaymentProcess from '@/store/modules/payment.js';
import { error } from 'util';

export default {

    name: 'StartingDate',

    components: {
        StartingDatePicker, ArtistCard
    },

    data() {
        return {
            gsecurity: GSecurity,
            artistId: undefined,
            hiringType: undefined,
            cardPrice: undefined,
            creditCard: {
                number: undefined, 
                name: undefined, 
                month: undefined, 
                year: undefined, 
                cvv: undefined, 
            },
            date: {
                fecha: undefined, 
                hour: undefined, 
                duration: undefined,
            },
            offer: {
                artistId: undefined, 
                hiringType: undefined, 
                location: undefined, 
                zipcode: undefined, 
                street: undefined, 
                description: undefined,
            },
            artistData: {
                artistId: undefined,
                artisticName: undefined,
                photo: undefined, 
                genres: undefined,
            },
            totalPrice: undefined,
            nextStep: undefined,
            farePackageId: undefined,
        }
    },

    props: {
        errors: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        ...mapActions(['setDateTime']),

        getHourAndMinutes(hour, minutes){
            alert(hour);
            alert(minutes);

            var startingHour = minutes+':'+hour;
            this.date.hour = startingHour;

            this.setDateTime(this.date).then(() => {
                
                // If VueX has correcty saved the time
                this.$router.push(this.nextStep)

            }).catch( e => {

                console.log('Error: Could not set time in VueX');
                console.log(e);

            });

        }

    },

    created() {
        // Retreive store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        // The artist to whom the offer is created
        this.artistId = this.$route.params['artistId'];
        // Retrieve the type of hiring
        this.hiringType = this.$store.getters.offer.hiringType;


        if(!this.$gsecurity.isAuthenticated()) {
            console.log('Error')
            location.replace("/#/*")
        }

        if(!this.$gsecurity.hasRole('CUSTOMER')) {
            console.log("Error: You are not a customer so you can't hire an artist");
            location.replace("/#/*")
        }

        if(!this.artistId){
            console.log("Error: ArtistId not provided");
            location.replace("/")
        }


    },

    beforeMount: function() {

        // ###### VUEX RESTORE ###### 

        this.artistData = this.$store.getters.offerArtist;

        // ###### END OF VUEX RESTORE ###### 
        
        var authorizedGAxios = GAxios;
        var GAxiosToken = this.gsecurity.getToken();
        authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

        alert(this.hiringType);

        // Obtenemos el precio de la tarjeta izq
        if(this.hiringType == 'PERFORMANCE'){
            alert("fea");
            this.totalPrice = this.$store.getters.offerPerformancePack.priceHour;
        }

        // Actualizamos el siguiente paso
        if(this.hiringType == 'PERFORMANCE')
            this.nextStep = '/addressInput/';

        this.nextStep += this.artistData.artistId;
    },

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
        padding-top: 12px;
    }


    @media (min-width:768px)  {
      
        .everything {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5%;
            text-align: center;
            padding: 15px;
            margin-left: 35%;
            margin-right: 35%;
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
