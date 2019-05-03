<template>
    <div class="hiringProcessContainer">
        <div v-if="errors" class="validationErrors vertical-center">
        <p>{{errors}}</p>
    </div>
        <div class="title"><p>{{gtrans.translate('event_info')}}</p></div>

    <div class="everything">
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :totalPrice="this.cardPrice"/>
        </div>
        <div class="evDiv">
          <div class="eventData"><EventData :nextStep="this.nextStep" @eventDataSelected="eventData" /></div>
        </div>
    </div>
    </div>
</template>

<script>
import EventData from '@/components/makeOffer/EventData.vue'
import ArtistCard from '@/components/makeOffer/ArtistCard.vue'
import GSecurity from '@/security/GSecurity.js';
import {mapActions} from 'vuex';
import { mapGetters } from 'vuex';
import PaymentProcess from '@/store/modules/payment.js';
import GTrans from "@/utils/GTrans.js";

export default {

    name: 'EventInput',

    components: {
        EventData, ArtistCard
    },

    data() {
        return {

            //Hiring Process...
            gsecurity: GSecurity,
            gtrans: undefined,
            errors: undefined,
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

            address: undefined,
        }
    },

    created() {

        // Retreive store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
        
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')

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
        if(!PaymentProcess.checkViewRequirements(PaymentProcess.state, this.hiringType, "EventInput")){
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
        if(this.hiringType == 'FARE')
            this.cardPrice = this.$store.getters.offer.totalPrice;
        else if(this.hiringType == 'CUSTOM')
            this.cardPrice = this.$store.getters.offer.totalPrice;
        else if(this.hiringType && this.hiringType == 'PERFORMANCE')
            this.cardPrice = this.$store.getters.offerPerformancePack.priceHour;
        

        // Actualizamos el siguiente paso
        this.nextStep = '/paymentSelector/';
        
        this.nextStep += this.artistId;

    },

    methods: {

        ...mapActions(['setEventDescription']),

        eventData(description) {
            if(description == '' || description == undefined){
                this.errors = this.gtrans.translate('event_data_error');
            }
            else{
                this.setEventDescription(description).then(() => {
                
                // If VueX has correcty saved the description
                this.$router.push(this.nextStep)

            }).catch( e => {

                console.log('Error: Could not set description in VueX');
                console.log(e);
                
            });

            }

            

        }
    }
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
        
    }

</style>
