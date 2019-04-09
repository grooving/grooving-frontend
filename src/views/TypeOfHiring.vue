<template>
<div class="prueba">
    <div class="title"><p>Choose type of hiring </p></div>
    
    <div class="everything">
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId"/></div>
        <div class="hiringType"><HiringType @hiring="selectTypeOfHiring"
            :farePrice="this.farePackage.priceHour" :customMinPrice="this.customPackage.minimumPrice" /></div>
    </div>
</div>
</template>

<script>
import HiringType from '@/components/makeOffer/HiringType.vue'
import ArtistCard from '@/components/makeOffer/ArtistCard.vue'
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';
import {mapActions} from 'vuex';

export default {
    
    name: 'TypeOfHiring',

    components: {
        HiringType, ArtistCard
    },

    data() {
        return {

            // Hiring Process Data...
            gsecurity: GSecurity,
            artistId: -1,
            artistData: Array(),

            // Type: Fare
            farePackage: {
                packageId: undefined, 
                priceHour: undefined,
            },

            // Type: Custom
            customPackage: {
                packageId: undefined,
                minimumPrice: undefined,
            }
        }
    },

    methods: {
        ...mapActions(['clearState']), 
        ...mapActions(['setArtist']),
        ...mapActions(['setOffer']),   
        ...mapActions(['setFarePackage']),    
        ...mapActions(['setCustomPackage']),        

        selectTypeOfHiring(hiringType) {

            // Set Offer Hiring Type
            this.setOffer(hiringType).then( () => {

                // Actualizamos el siguiente paso (lo hacemos aquí porque
                // hiringType todavía no está asignado en VueX)
                var nextView = undefined;
                if(hiringType == 'FARE' || hiringType == 'CUSTOM')
                    nextView = '/dateSelection/';

                nextView += this.artistData.artistId;


                if(hiringType == 'FARE') {

                    // Creamos el farePackage asociado con los datos...
                    this.setFarePackage(this.farePackage).then(() => {
                        // If VueX has correctly set the package
                        this.$router.push(nextView);
                    }).catch( e => {
                        console.log('Could not set PaymentPackage: Fare');
                        console.log(e);
                    });

                }else if(hiringType == 'CUSTOM'){

                    // Creamos el customPackage asociado con los datos...
                    this.setCustomPackage(this.customPackage).then(() => {
                        // If VueX has correctly set the package
                        this.$router.push(nextView);
                    }).catch( e => {
                        console.log('Could not set PaymentPackage: Custom');
                        console.log(e);
                    })

                }

            });

        }
    },

    created() {

        // Retrieve store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        // The artist to whom the offer is created
        this.artistId = this.$route.params['artistId'];

        // ###### SECURITY ACCESS CHECKS ###### 

        if(!this.gsecurity.hasRole('CUSTOMER')) {
            console.log("Error: You are not a customer so you can't hire an artist");
            location.replace("/#/*");
        }

        if(!this.artistId){
            console.log("Error: ArtistId not provided");
            location.replace("/")
        }

        // Clear saved data before beginning
        this.clearState();

        // ###### END OF SECURITY ACCESS CHECKS ###### 

    },

    beforeMount() {
        NProgress.start();

        var authorizedGAxios = GAxios;
        var GAxiosToken = this.gsecurity.getToken();
        authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

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
        }).then( () => {NProgress.done()});

        // ** Hiring Types - Right Card **
        authorizedGAxios.get(endpoints.artistPayPackage + this.artistId + "/")
        .then(response => {

            // Available PaymentPackages retieved through the API
            var paymentPackages = response.data;

            for(var i = 0; i < paymentPackages.length; i++) {
                
                var payPack = paymentPackages[i];
                
                if(payPack.fare_id != null) {

                    // Fare Package
                    this.farePackage.packageId = payPack.id;
                    this.farePackage.priceHour = payPack.fare.priceHour;

                }else if(payPack.custom_id != null) {

                    // Custom Package
                    this.customPackage.packageId = payPack.id;
                    this.customPackage.minimumPrice = payPack.custom.minimumPrice;

                }
            }
            NProgress.done();

        }).catch(ex => {
            console.log('Could not load Payment Packages API')
            console.log(ex);
            NProgress.done();
        });
    },
}
</script>

<style scoped>

    .title {
        display: none;
    }

    @media (min-width:768px)  {
      
        .everything {
            display: flex;
            justify-content: center;
            padding: 15px;
            margin-left: 35%;
            margin-right: 35%;
        }
        .title {
            display: inline-block;
            margin-left: 18%;
            text-align: left;
            font-size: 50px;
            margin-top: 3%;
            margin-bottom: 0%;
            margin-left: 1px;
            font-weight: bold;
        }
    }

</style>
