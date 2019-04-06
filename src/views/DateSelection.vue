<template>
<div class="prueba">
    <div class="title"><p>Choose a date</p></div>
    
    <div class="everything">
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.main_photo" 
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

export default {
  name: 'DateSelection',
  computed: mapGetters(['offerArtist', 'offerFarePack']),
  components: {
    Calendar, ArtistCard
  },

  data: function() {
      return {
          artistData: {
              artistId: undefined,
              artisticName: undefined,
              main_photo: undefined,
              genres: undefined,
          },
          priceHour: undefined,
          nextStep: undefined,
          gsecurity: GSecurity,
          datos: Array(),
          fecha: '',
      }
  },
    created() {
        // Retreive store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();
    },
  beforeMount: function() {
      var authorizedGAxios = GAxios;
      var GAxiosToken = this.gsecurity.getToken();
      authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

      authorizedGAxios.get('/artist' + endpoints.calendar + this.$route.params['artistId'] + '/')
        .then(response => {
            var calendar = response.data;
            console.log(calendar[0].days)

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
        this.artistData.main_photo = this.$store.getters.offerArtist.main_photo;
        this.artistData.genres = this.$store.getters.offerArtist.genres;

        this.priceHour = this.$store.getters.offerFarePack.priceHour;

        this.nextStep = '/timeSelection/' + this.artistData.artistId;

         // Retreive store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();
        if(!this.$gsecurity.hasRole('CUSTOMER') || this.artistData.artistId != this.$route.params['artistId'] 
            || !this.priceHour) {

            console.log('Error')
            location.replace("/#/*")
        }
  },
    methods: {
        ...mapActions(['setDate']),
        dateSelected() {
            this.setDate(this.fecha).then(() => this.$router.push(this.nextStep));
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
