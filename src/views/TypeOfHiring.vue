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
            gsecurity: GSecurity,
            artistId: -1,
            nextStep: '/dateSelection/',
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

            if(hiringType == 'FARE') {
                this.setFarePackage(this.farePackage).then(() => {
                    // If VueX has correctly set the package
                    this.$router.push(this.nextStep);
                }).catch( e => {
                    console.log('Could not set Hiring Type');
                    console.log(e);
                });
            }else if(hiringType == 'CUSTOM'){
                console.log('wig..')
                this.setCustomPackage(this.customPackage).then(() => {
                    // If VueX has correctly set the package
                    this.$router.push(this.nextStep);
                }).catch( e => {
                    console.log('Could not set Hiring type');
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

        this.artistId = this.$route.params['artistId'];

        if(!this.$gsecurity.hasRole('CUSTOMER')) {
            console.log("Error: You are not a customer so you can't hire an artist");
            location.replace("/#/*")
        }

        if(!this.artistId){
            console.log("Error: ArtistId not provided");
            location.replace("/")
        }

        // Clear saved data before beginning
        this.clearState();
    },

    beforeMount() {
        NProgress.start();

        var authorizedGAxios = GAxios;
        var GAxiosToken = this.gsecurity.getToken();
        authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

        // Artist Information - Left Card
        authorizedGAxios.get(endpoints.portfolio + this.artistId + "/")
        .then(response => {

          var portfolio = response.data;
          
          var genres = portfolio.artisticGender;
          var portfolioGenres = '';

          for(var i = 0; i < genres.length; i++){
            
            var genre = genres[i].name;
            portfolioGenres += genre;
            if(i < 3 && genres.length > 1)
                portfolioGenres += ', ';
            else
                break;

          }
          
          // Artist Information
          this.artistData = {
              artistId: portfolio.artist.id, 
              photo: portfolio.main_photo, 
              artisticName: portfolio.artisticName, 
              genres: portfolioGenres
          };

          this.setArtist(this.artistData);
            NProgress.done();
          this.nextStep += this.artistData.artistId;

        }).catch(ex => {
            console.log('Could not load Artist Info Data');
            console.log(ex);
            NProgress.done();
        });

        // Hiring Types - Right Card
        authorizedGAxios.get(endpoints.artistPayPackage + this.artistId + "/")
        .then(response => {

            // Available PaymentPackages
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
            console.log('Could not load payment packages')
            console.log(ex);
            NProgress.done();
        });
    },
}
</script>

<style>

</style>

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
