<template>
<div class="hiringProcessContainer">
    <div class="title"><p>Select a payment method</p></div>
    <div v-if="errors === true" class="validationErrors">
        <p>Sorry! Something went wrong. Try again later.</p>
        <!--<p>Error en el numero</p>
        <p>Error en el mes</p>-->
    </div>
    <div class="everything"> 
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :totalPrice="this.totalPrice"/>
        </div>
        <div class="paymentSelect">
          <div class="paymentOptions" style="min-width: 250px;"><PaymentOptions @paymentOptionSelected="paymentSelected()"/></div>
        </div>
    </div>
</div>
</template>

<script>
import PaymentOptions from '@/components/makeOffer/PaymentOptions.vue'
import ArtistCard from '@/components/makeOffer/ArtistCard.vue'
import GSecurity from '@/security/GSecurity.js';
import { mapGetters } from 'vuex';
import PaymentProcess from '@/store/modules/payment.js';

export default {
    name: 'PaymentSelector',

    components: {
        PaymentOptions, ArtistCard
    },

    data() {
        return {
            //Hiring Process...
            gsecurity: GSecurity,
            artistId: -1,
            nextStep: undefined,
            hiringType: undefined,
            cardPrice: undefined,
            artistData: {
                artistId: undefined,
                artisticName: undefined,
                photo: undefined,
                genres: undefined,
            },

        }
    },

    methods: {
        
        paymentSelected(){ 

            this.$emit('paymentSelected');

            // If VueX has correcty saved the time
            this.$router.push(this.nextStep);
        }

    },

    created() {

        // Retreive store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        // The artist to whom the offer is created
        this.artistId = this.$route.params['artistId'];
        // The artistId saved in Vuex
        var vuexArtistId = this.$store.getters.offerArtist ? this.$store.getters.offerArtist.artistId : undefined;
        // Retrieve the type of hiring
        this.hiringType = this.$store.getters.offer.hiringType;

        // ###### SECURITY ACCESS CHECKS ###### 

        if(!this.$gsecurity.isAuthenticated()) {
            console.log('Error')
            this.$router.push({name: "error"});
        }

        if(!this.$gsecurity.hasRole('CUSTOMER')) {
            console.log("Error: You are not a customer so you can't hire an artist");
            this.$router.push({name: "error"});
        }

        if(!this.artistId || !vuexArtistId || this.artistId != vuexArtistId){
            console.log("Error: ArtistId not provided or VueX not matching URL");
            location.replace("/")
        }

        // Check the user does not access the view directly
        if(!PaymentProcess.checkViewRequirements(PaymentProcess.state, this.hiringType, "PaymentSelector")){
            console.log('Error: Direct access to the view was detected')
            location.replace("/#/hiringType/" + this.artistId + "/")
        }

        // ###### END OF SECURITY ACCESS CHECKS ###### 

    },

    beforeMount() {

        // ###### VUEX RESTORE ###### 

        this.artistData = this.$store.getters.offerArtist;
        this.date = this.$store.getters.offerDate;

        // ###### END OF VUEX RESTORE ###### 
        

        // Obtenemos el precio de la tarjeta izq   
        if(this.hiringType && this.hiringType == 'CUSTOM')
            this.cardPrice = this.$store.getters.offerCustomPack.cardPrice;
        else if(this.hiringType == 'PERFORMANCE')
            this.totalPrice = this.$store.getters.offerPerformancePack.priceHour;
        // Actualizamos el siguiente paso
        this.nextStep = '/payment/';
    
        this.nextStep += this.artistId;

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

    @media (max-width:767px)  {
        .validationErrors{
            background-color:#f50057;
            box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);
            
            color:white;
            font-weight: bold;
            height: 100%;
            padding-top: 5%;
        }
  
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

        .hiringProcessContainer{
            margin-bottom: 5%;
        }

        .title {
            display: inline-block;
            margin-right: 12%;
            margin-left: 10%;
            text-align: left;
            font-size: 50px;
            margin-top: 5%;
            margin-bottom: 0%;

            font-weight: bold;
        }

        .validationErrors{
            padding-top: 10px;
            padding-bottom: 0.25px;
            color: #c62828;
            font-weight: semibold;
            border-color: green;
            width: 50%;
            margin: 0 auto;
            height: auto;
            border-radius: 5px;
            align-items: center;
            text-align: center;
            box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .5);
        }        
    }

</style>
