<template>
<div class="hiringProcessContainer">
    <div v-if="errors" class="validationErrors">
        <p>{{errors}}</p>
    </div>
    <div class="title"><p style="text-align: left !important;">{{gtrans.translate('timeRange')}}</p></div>
    
    <div class="everything">
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :price="this.cardPrice"/>
        </div>
        <div class="sliderButton" >
          <div class="slider" ><DoubleSlider style="padding-top:10%" @timeUpdate="updateTime"/></div>
          <div v-bind:to="nextStep" class="continueButtonDiv"><div style="margin: 10%;" @click="timeSelected" 
            class="btn btn-primary continueButton"><span class="continueText">{{gtrans.translate('continueButton')}}</span></div></div>
        </div>
    </div>
</div>
</template>

<script>
import DoubleSlider from '@/components/makeOffer/DoubleSlider.vue'
import ArtistCard from '@/components/makeOffer/ArtistCard.vue'
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js";
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
import PaymentProcess from '@/store/modules/payment.js';

export default {

    name: 'TimeSelection',

    components: {
        DoubleSlider, ArtistCard
    },

    data() {
        return {
            
            //Hiring Process...
            gsecurity: GSecurity,
            gtrans: undefined,
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

            time: {
                hour: '00:00',
                duration: 23.5,    
            },
            errors: '',
        }
    },

    methods: {
        ...mapActions(['setDateTime']),

        updateTime(startHour, duration) {
            this.time.hour = startHour;
            this.time.duration = duration;
        },

        timeSelected() {

            if(this.time && this.time.duration){

                this.setDateTime(this.time).then(() => {

                    // If VueX has correcty saved the time
                    this.$router.push(this.nextStep)

                }).catch( e => {

                    console.log('Error: Could not set time in VueX');
                    console.log(e);

                });

            }else{
                this.errors = this.gtrans.translate('invalidRange')
                window.scrollTo(0,0);
            }

        },
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
        if(!PaymentProcess.checkViewRequirements(PaymentProcess.state, this.hiringType, "TimeSelection")){
            console.log('Error: Direct access to the view was detected')
            location.replace("/#/hiringType/" + this.artistId + "/")
        }

        // ###### END OF SECURITY ACCESS CHECKS ###### 

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
            
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')

    },

    beforeMount() {

        // ###### VUEX RESTORE ###### 

        this.artistData = this.$store.getters.offerArtist;

        // ###### END OF VUEX RESTORE ###### 


        // Obtenemos el precio de la tarjeta izq   
        if(this.hiringType == 'FARE'){
            this.cardPrice = this.$store.getters.offerFarePack.priceHour;
        }else if(this.hiringType == 'CUSTOM'){
            this.cardPrice = this.$store.getters.offerCustomPack.minimumPrice;
        }

        // Actualizamos el siguiente paso
        if(this.hiringType == 'FARE'){
            this.nextStep = '/addressInput/';
        }else if(this.hiringType == 'CUSTOM'){
            this.nextStep = '/priceSelector/';
        }
        
        this.nextStep += this.artistId;

    },
}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

    .validationErrors{
        background-color:#f50057;
        box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);
        
        color:white;
        font-weight: bold;
        height: 100%;
        padding-top: 12px;
    }
    

    .continueButton {
        font-size: 22px;
                
        border: none;
        border-radius: 30px;
        width: 65%;
        font-weight: bold;
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .continueButton:hover{
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.7) !important;
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .sliderButton  {
        margin-top: 0;
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

        .hiringProcessContainer{
            margin-bottom: 5%;
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
