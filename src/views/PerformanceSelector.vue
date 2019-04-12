<template>
<div class="prueba">
    <div v-if="errors" class="validationErrors vertical-center">
        <p>Sorry! Something went wrong. Try again later.</p>
    </div>
    <div class="title"><p>Choose a performance</p></div>
    <div class="everything">
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :price="this.cardPrice"/>
        </div>
        <div class="paymentDiv">
          <div class="creditCardPayment" style="min-width:400px;"><Performances @hiring="selectTypeOfHiring" :performances="packages"/></div>
        </div>
    </div>
</div>
</template>

<script>
import CreditCardPayment from '@/components/makeOffer/CreditCardPayment.vue'
import Performances from '@/components/makeOffer/Performances.vue'
import ArtistCard from '@/components/makeOffer/ArtistCard.vue'
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';
import {mapActions} from 'vuex';
import { mapGetters } from 'vuex';
import PaymentProcess from '@/store/modules/payment.js';
import { error } from 'util';

export default {

    name: 'PerformanceSelector',

    components: {
        Performances, ArtistCard
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
            nextStep: undefined,
            performancePackage: {
                packageId: undefined,
                priceHour: undefined,
                duration: undefined,
            },
            packages: Array(),
        }
    },

    props: {
        errors: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        ...mapActions(['setPerformancePackage']),
        ...mapActions(['setOffer']),

        selectPerformance() {
            if(this.performancePackageId){
                return true;
            }
        },

        selectTypeOfHiring(perfId, perfPrice, perfDuration){

            /* Creamos el package de tipo Performance con los datos obtenidos */

            this.performancePackage.packageId = perfId;
            this.performancePackage.priceHour = Math.trunc(perfDuration * perfPrice);
            this.performancePackage.duration = perfDuration;

            /* Setteamos la oferta */
            this.setOffer('PERFORMANCE').then( () => {

                // Actualizamos el siguiente paso
                this.nextStep = '/dateSelection/'+this.artistData.artistId;

                if(this.hiringType == 'PERFORMANCE'){

                    // Creamos el customPackage asociado con los datos...
                    this.setPerformancePackage(this.performancePackage).then(() => {
                        // If VueX has correctly set the package
                        this.$router.push(this.nextStep);
                    }).catch( e => {
                        console.log('Could not set PaymentPackage: Performance');
                        console.log(e);
                    })

                }

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
            this.$router.push({name: "error"});
        }

        if(!this.$gsecurity.hasRole('CUSTOMER')) {
            console.log("Error: You are not a customer so you can't hire an artist");
            this.$router.push({name: "error"});
        }

        if(!this.artistId){
            console.log("Error: ArtistId not provided");
            location.replace("/")
        }

        if(!PaymentProcess.checkViewRequirements(PaymentProcess.state, this.hiringType, "PerformanceSelector")){
            console.log('Error: Direct access to the view was detected')
            location.replace("/#/hiringType/" + this.artistId + "/")
        }


    },
    beforeMount: function(){

        this.artistData = this.$store.getters.offerArtist;

        var GAxiosToken = this.gsecurity.getToken();
        var authorizedGAxios = GAxios;
        authorizedGAxios.defaults.headers.common['Authorization'] = 'Token '+ GAxiosToken;

        /* Aquí devolvemos los packages de tipo performance */
        
        NProgress.start();        
        authorizedGAxios.get(endpoints.paymentPackages + this.artistData.artistId + '/')
            .then(response => {
                console.log(response.data);
                
                var packages = response.data;

                for (var i = 0; i < packages.length; i++) {
                    if(packages[i].performance != null){
                        this.packages.push({
                            custom: packages[i].custom,
                            custom_id: packages[i].custom_id,
                            description: packages[i].description,
                            fare: packages[i].fare,
                            fare_id: packages[i].fare_id,
                            package_id: packages[i].id,
                            performance: packages[i].performance,
                            performance_id: packages[i].performance_id,
                        });
                    }
                    
                }
                
            }).catch(ex => {
                console.log(ex);
            }) 

        // ** Artist Information - Left Card **
        authorizedGAxios.get(endpoints.portfolio + this.artistId + "/")
            .then(response => {

            var portfolio = response.data;
            
            // Géneros de un portfolio
            var genres = portfolio.artisticGender;
            var portfolioGenres = '';

            for(var i = 0; i < genres.length; i++){
                var genre = genres[i].name;
                portfolioGenres += genre;
                portfolioGenres += ', ';
            }

            portfolioGenres = portfolioGenres.slice(0, portfolioGenres.length - 2);
            
            // Artist Information (ID, Photo, ArtisticName, Genres)
            this.artistData = {
                artistId: portfolio.artist.id, 
                photo: portfolio.main_photo, 
                artisticName: portfolio.artisticName, 
                genres: portfolioGenres
            };

            this.setArtist(this.artistData);

            }).catch(ex => {
                console.log('Could not load Artist Info Data API');
                console.log(ex);
            }).then(() => {
                NProgress.done()
            });
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
