<template>
<div class="hiringProcessContainer">

    <div id="errorsDiv" class="validationErrors vertical-center">
        <p style="margin: 0px;">{{errors}}</p>
    </div>
    <div class="title"><p>{{gtrans.translate('chooseDate')}}</p></div>

    <div class="everything">
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :price="this.cardPrice" :totalPrice="this.totalPrice"/>
        </div>
        <div class="calendarButton">
          <div class="calendar"><Calendar @datePickerDate="calendarSelected" :availableDates="availableDates"/></div>
          <div class="continueButtonDiv" @click="dateSelected()" ><div class="btn btn-primary continueButton"><span class="continueText">{{gtrans.translate('continueButton')}}</span></div></div>
        </div>
    </div>
</div>
</template>

<script>
import Calendar from '@/components/Calendar.vue';
import ArtistCard from '@/components/makeOffer/ArtistCard.vue'

import GAxios from '@/utils/GAxios.js';
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js";
import endpoints from '@/utils/endpoints.js';
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
import PaymentProcess from '@/store/modules/payment.js';
import PaymentVue from './Payment.vue';

export default {

    name: 'DateSelection',
    
    components: {
        Calendar, ArtistCard
    },

    computed: {

        availableDates: function(){
    
            if(this.datos && this.datos[0] && this.datos[0].availableDates)
                return this.datos[0].availableDates;
            else
                return Array();

        }
    },

    data: function() {
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

          datos: Array(),
          fecha: '',
          totalPrice: undefined,
          errors: "",
        }
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

                    this.errors = 'Error: Could not set date in VueX';
                    document.getElementById("errorsDiv").style.display = "block";
                    
                });
            }else{
                this.errors = 'You must select a date.';
                document.getElementById("errorsDiv").style.display = "block";
            }
        },

        calendarSelected(){
            this.fecha = arguments[0];
        }
    },

    created() {

        // Retrieve store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        // The artist to whom the offer is created
        this.artistId = this.$route.params['artistId'];
        // The artistId saved in Vuex
        var vuexArtistId = this.$store.getters.offerArtist ? this.$store.getters.offerArtist.artistId : undefined;
        // Retrieve the type of hiring
        this.hiringType = this.$store.getters.offer.hiringType;

        // ###### SECURITY ACCESS CHECKS ###### 

        if(!this.gsecurity.hasRole('CUSTOMER')) {
            console.log("Error: You are not a customer so you can't hire an artist");
            location.replace("/#/*")
        }

        if(!this.artistId || !vuexArtistId || this.artistId != vuexArtistId){
            console.log("Error: ArtistId not provided or VueX not matching URL");
            location.replace("/")
        }

        // Check the user does not access the view directly
        if(!PaymentProcess.checkViewRequirements(PaymentProcess.state, this.hiringType, "DateSelection")){
            console.log('Error: Direct access to the view was detected')
            location.replace("/#/hiringType/" + this.artistId + "/")
        }

        // ###### END OF SECURITY ACCESS CHECKS ###### 

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
            
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')

    },

    beforeMount: function() {

        NProgress.start();

        // ###### VUEX RESTORE ###### 

        this.artistData = this.$store.getters.offerArtist;

        // ###### END OF VUEX RESTORE ###### 
        
        var authorizedGAxios = GAxios;
        var GAxiosToken = this.gsecurity.getToken();
        authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

        authorizedGAxios.get(endpoints.artistCalendar + this.artistId + '/')
            .then(response => {
                var calendar = response.data;

                if(calendar.length==0){
                    this.datos.push({availableDates: []});
                }else{
                    this.datos.push({availableDates: calendar.days,})
                }

            }).catch(ex => {
                console.log(ex);
            }).then( () => {NProgress.done()});

        
        // Obtenemos el precio de la tarjeta izq
        if(this.hiringType == 'FARE'){
            this.cardPrice = this.$store.getters.offerFarePack.priceHour;
        }
        else if(this.hiringType == 'CUSTOM'){
            this.cardPrice = this.$store.getters.offerCustomPack.minimumPrice;
        }
        else if(this.hiringType == 'PERFORMANCE'){
            this.totalPrice = this.$store.getters.offerPerformancePack.priceHour;
        }

        // Actualizamos el siguiente paso
        if(this.hiringType == 'FARE' || this.hiringType == 'CUSTOM')
            this.nextStep = '/timeSelection/';
        else if(this.hiringType == 'PERFORMANCE')
            this.nextStep = '/startingDate/';

        this.nextStep += this.artistData.artistId;
    },
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
        margin-top: 5px;
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
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.7) !important;
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .continueButtonDiv {
        margin-top: 30px;
        margin-bottom: 15px;
    }

    .calendarButton  {
        min-width: 320px;
    }

    .validationErrors{
        background-color:#f50057;
        box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);      
        color:white;
        display: none;
        font-weight: bold;
        padding: 10px;
        padding-top: 12px;
    }

    @media (max-width:767px)  {
        .calendarButton {
            padding-top: 6px;
            margin-right: 3%;
            margin-left: 3%;
        }
    }

    @media (min-width:768px)  {

        .artistCard{
            margin-top: 20px;
        }

        .hiringProcessContainer{
            margin-bottom: 5%;
        }

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
