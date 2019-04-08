<template>
<div class="prueba">
    <div class="title"><p style="text-align: left !important;">Choose a time range</p></div>
    
    <div class="everything">
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :price="this.priceHour"/>
        </div>
        <div class="sliderButton" >
          <div class="slider" ><DoubleSlider style="padding-top:10%" @timeUpdate="updateTime"/></div>
          <div v-bind:to="nextStep" class="continueButtonDiv"><div style="margin: 10%;" @click="timeSelected" 
            class="btn btn-primary continueButton"><span class="continueText">CONTINUE</span></div></div>
        </div>
    </div>
</div>
</template>

<script>
import DoubleSlider from '@/components/makeOffer/DoubleSlider.vue'
import ArtistCard from '@/components/makeOffer/ArtistCard.vue'
import GSecurity from '@/security/GSecurity.js';
import {mapActions} from 'vuex';
import { mapGetters } from 'vuex';
import PaymentProcess from '@/store/modules/payment.js';

export default {
    name: 'TimeSelection',

    computed: mapGetters(['offerArtist']),

    components: {
        DoubleSlider, ArtistCard
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
            priceHour: undefined,
            time: {
                hour: '00:00',
                duration: 23.5,    
            },
            nextStep: '/addressInput/', 
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

        if(!PaymentProcess.checkStepRequirements(PaymentProcess.state, 'FARE', 2)){
            console.log('Error: Direct access to the view was detected')
            location.replace("/#/hiringType/1/")
        }
    },

    mounted() {

        this.artistData.artistId = this.$store.getters.offerArtist.artistId;
        this.artistData.artisticName = this.$store.getters.offerArtist.artisticName;
        this.artistData.photo = this.$store.getters.offerArtist.photo;
        this.artistData.genres = this.$store.getters.offerArtist.genres;

        this.hiringType = this.$store.getters.offer.hiringType;

        if(this.hiringType && this.hiringType == 'FARE')
            this.priceHour = this.$store.getters.offerFarePack.priceHour;

        this.nextStep += this.artistId;

    },

    methods: {
        ...mapActions(['setDateTime']),

        updateTime(startHour, duration) {
            this.time.hour = startHour;
            this.time.duration = duration;
        },

        timeSelected() {

            this.setDateTime(this.time).then(() => {
                // If VueX has correcty saved the time
                this.$router.push(this.nextStep)
            }).catch( e => {
                console.log('Error: Could not set time in VueX');
                console.log(e);
            });
        },
    },
}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }
    

    .continueButton {
        font-size: 22px;
                
        border: none;
        border-radius: 30px;
        width: 65%;

        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .continueButton:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .sliderButton  {
        margin-top: 15%;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }

    .continueButtonDiv {
        margin-top: 30px;
        margin-bottom: 10%;
    }

    .title {
        display: none;
    }

    @media (max-width:767px)  {
        .sliderButton {
            padding-top: 5%;
            margin-right: 3%;
            margin-left: 5%;
        }
    }

    @media (min-width:768px)  {
        

        .sliderButton  {
            margin-left: 5%;
            width: 100%;
            max-width: 400px;
            min-width: 300px;
            padding-top: 7%;
            padding-left: 5%;
            padding-right: 5%;
            margin-right: 0%;
            display: inline-block;

            border-radius: 10px;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
        }
      
        .continueButtonDiv {
            margin-top: 30px;
        }
      
        .everything {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5%;
            text-align: center;
            padding: 15px;
            margin-left: 30%;
            margin-right: 30%;
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
