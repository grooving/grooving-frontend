<template>
    <div class="hell">
        <div class="title"><p>Event information</p></div>

    <div class="everything">
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :totalPrice="this.totalPrice"/>
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

export default {

    name: 'EventInput',

    components: {
        EventData, ArtistCard
    },

    data() {
        return {
            gsecurity: GSecurity,
            artistId: undefined,
            hiringType: undefined,
            artistData: {
                artistId: undefined,
                artisticName: undefined,
                photo: undefined,
                genres: undefined,
            },
            totalPrice: undefined,
            address: undefined,
            nextStep: '/paymentSelector/',
        }
    },

    created() {
        // Retreive store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.artistId = this.$route.params['artistId'];

        if(!this.$gsecurity.hasRole('CUSTOMER')) {
            console.log("Error: You are not a customer so you can't hire an artist");
            location.replace("/#/*")
        }

        if(!this.artistId){
            console.log("Error: ArtistId not provided");
            location.replace("/")
        }

        if(!PaymentProcess.checkStepRequirements(PaymentProcess.state, 'FARE', 4)){
            console.log('Error: Direct access to the view was detected')
            location.replace("/#/hiringType/" + this.artistId + "/")
        }
    },

    mounted() {
        // Artist Data
        this.artistData.artistId = this.$store.getters.offerArtist.artistId;
        this.artistData.artisticName = this.$store.getters.offerArtist.artisticName;
        this.artistData.photo = this.$store.getters.offerArtist.photo;
        this.artistData.genres = this.$store.getters.offerArtist.genres;

        this.hiringType = this.$store.getters.offer.hiringType;

        if(this.hiringType && this.hiringType == 'FARE')
            this.totalPrice = this.$store.getters.offer.totalPrice;

        this.nextStep += this.artistData.artistId;
    },

    methods: {
        ...mapActions(['setEventDescription']),
        eventData(description) {
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
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }
    .title {
        display: none;
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
