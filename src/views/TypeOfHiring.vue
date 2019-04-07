<template>
<div class="prueba">
    <div class="title"><p>Choose type of hiring </p></div>
    
    <div class="everything">
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.main_photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId"/></div>
        <div class="hiringType"><HiringType @hiring="type"
            :farePrice="this.farePackage.priceHour"  /></div>
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
            nextStep: undefined,
            artistData: Array(),
            farePackage: {
                id: undefined, 
                priceHour: undefined,
            },
        }
    },
    methods: {
        ...mapActions(['setHiring']),
        ...mapActions(['setArtist']),
        ...mapActions(['setFarePackage']),
        type(type, artistId) {
            this.setHiring(type);
            if(type == 'FARE') {
                this.setFarePackage(this.farePackage).then(() => this.$router.push(this.nextStep));
            }
        }
    },
    created() {
        // Retreive store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        if(!this.$gsecurity.hasRole('CUSTOMER')) {

            console.log('Error')
            location.replace("/#/*")
        }
    },
    beforeMount() {
        var authorizedGAxios = GAxios;
        var GAxiosToken = this.gsecurity.getToken();
        authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

        authorizedGAxios.get(endpoints.portfolio+this.$route.params['artistId']+"/")
        .then(response => {
          var portfolio = response.data;
          
          var genres = portfolio.artisticGenders;
          var portfolioGenres = '';
          for(var i = 0; i < genres.length; i++){
            var genre = genres[i];
            portfolioGenres += genre;
            if(i == 3) {
                break;
            }
          }

          this.artistData = {
              artistId: portfolio.artist.id, 
              main_photo: portfolio.main_photo, 
              artisticName: portfolio.artisticName, 
              genres: portfolioGenres};

          this.setArtist(this.artistData);
          this.nextStep = '/dateSelection/' + this.artistData.artistId;

        }).catch(ex => {
            console.log(ex);
        });

        authorizedGAxios.get(endpoints.artistPayPackage+this.$route.params['artistId']+"/")
        .then(response => {
            console.log(response)
            var paymentPackages = response.data;
            for(var i = 0; i< paymentPackages.length; i++) {
                var payPack = paymentPackages[i];
                if(payPack.fare_id != null) {
                    this.farePackage.id = payPack.id;
                    this.farePackage.priceHour = payPack.fare.priceHour;
                }
            }
            }).catch(ex => {
                console.log(ex);
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
