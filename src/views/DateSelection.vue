<template>
<div class="prueba">
    <div class="title"><p>Choose a date</p></div>
    
    <div class="everything">
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :price="this.priceHour"/>
        </div>
        <div class="calendarButton">
          <div class="calendar" style="width: 320px;"><Calendar @datePickerDate="calendarSelected" :availableDates="this.datos[0].availableDates"/></div>
          <div class="continueButtonDiv" @click="dateSelected()" ><div class="btn btn-primary continueButton"><span class="continueText">CONTINUE</span></div></div>
        </div>
    </div>
</div>
</template>

<script>
import Calendar from '@/components/Calendar.vue';
import ArtistCard from '@/components/makeOffer/ArtistCard.vue'
import GAxios from '@/utils/GAxios.js';
import GSecurity from '@/security/GSecurity.js';
import endpoints from '@/utils/endpoints.js';
import {mapActions} from 'vuex';
import { mapGetters } from 'vuex';
import PaymentProcess from '@/store/modules/payment.js';

export default {

    name: 'DateSelection',
    computed: mapGetters(['offerArtist', 'offerFarePack']),
    components: {
        Calendar, ArtistCard
    },

    data: function() {
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
          nextStep: '/timeSelection/',
          datos: Array(),
          fecha: '',
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

        if(!PaymentProcess.checkStepRequirements(PaymentProcess.state, 'FARE', 1)){
            console.log('Error: Direct access to the view was detected')
            location.replace("/#/hiringType/" + this.artistId + "/")
        }

    },

    beforeMount: function() {
        
      var authorizedGAxios = GAxios;
      var GAxiosToken = this.gsecurity.getToken();
      authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

      authorizedGAxios.get('/artist' + endpoints.calendar + this.artistId + '/')
        .then(response => {
            var calendar = response.data;

            this.datos.push({
                availableDates: calendar[0].days,
            })

        }).catch(ex => {
            console.log(ex);
        });
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
        ...mapActions(['setDateDate']),

        dateSelected() {
            if(this.fecha){
                this.setDateDate(this.fecha).then(() => {
                    // If VueX has correcty saved the date
                    this.$router.push(this.nextStep)
                }).catch( e => {
                    console.log('Error: Could not set date in VueX');
                    console.log(e);
                });
            }else{
                alert('You must select a date...');
            }
        },

        calendarSelected(){
            this.fecha = arguments[0];
        }
    }
}
</script>

<style>

.vdp-datepicker__calendar {
  width: 100%;
  border: 0px;
  margin-top: 10px;
}

</style>

<style scoped>
    * {
        font-family: "Archivo"
    }
    

    .calendar {
        margin-top: 5%;
        
    }

    .title {
        display: none;
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

    .continueButtonDiv {
        margin-top: 30px;
        margin-bottom: 10%;
    }

    @media (max-width:767px)  {
        .calendarButton {
            padding-top: 5%;
            margin-right: 3%;
            margin-left: 3%;
        }
    }

    @media (min-width:768px)  {

        .calendarButton  {
            margin-left: 5%;
            width: 320px;
            margin-top: 0%;
            margin-right: 0%;
            display: inline-block;
            
            border-radius: 10px;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
        }
      
        .continueButtonDiv {
            margin-top: 15px;
            margin-bottom: 15px;
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
