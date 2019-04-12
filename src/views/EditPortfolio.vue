<template>
  <div>
    <form v-on:submit.prevent="savePortfolio()">
      <EditSubmenu :artistId="artistId" />
      <div v-if="errors" class="validationErrors vertical-center">
        <p>Sorry! Something went wrong. Try again later.</p>
      </div>
      <EditPhoto :artistImage="this.d_portfolioMainPhoto" :artistBanner="this.d_portfolioBanner"/>
      <EditArtistInfo/>
       

      <EditImageCarousel :photosInfo="d_portfolioImages" :key="updateImagesKey" />
      <EditVideoCarousel :videosInfo="d_portfolioVideos" :key="updateVideosKey" />
      <EditAvailableDates :availableDates="this.datos[0].availableDates" :key="updateCalendatKey"/>
    </form>
  </div>
</template>

<script>
import EditSubmenu from '@/components/menus/EditSubmenu.vue'
import EditPhoto from '@/components/EditPhoto.vue'
import EditArtistInfo from '@/components/portfolio/EditArtistInfo.vue'
import EditImageCarousel from '@/components/portfolio/EditImageCarousel.vue';
import EditVideoCarousel from '@/components/portfolio/EditVideoCarousel.vue';
import EditAvailableDates from '@/components/portfolio/EditAvailableDates.vue';

import GSecurity from '@/security/GSecurity.js'
import GAxios from '@/utils/GAxios.js'
import endpoints from '@/utils/endpoints.js'

import {mapActions} from 'vuex';
import { mapGetters } from 'vuex';


export default {
  name: 'EditPortfolio',
  computed: mapGetters(['genres']),
  components: {
    EditSubmenu,
    EditImageCarousel,
    EditPhoto,
    EditArtistInfo,
    EditVideoCarousel,
    EditAvailableDates,
  },  

  data: function(){
    
    return{
      gsecurity: GSecurity,
      updateVideosKey: 0,
      updateImagesKey: 0,
      updateCalendatKey: 0,
      artistId: -1,
      errors: false,

      // Artist Info
      d_portfolioBanner: '',
      d_portfolioMainPhoto: '',
      d_portfolioArtisticName:'',
      d_portfolioBiography: '',
      d_portfolioGenres: Array(),

      // Carousel
      d_portfolioImages: [], 
      d_portfolioVideos: [],  

      //Calendar
      datos: Array(),
      d_portfolioDays: [],

      //New genres
      namesOfNewGenres: [],

    }
  },
  methods: {
    ...mapActions(['setCurrentGenres', 'setAllGenres', 'setFinal']),
    // Given a carousel-dictionary, returns an array consisting of the 
    // URLs used on the carousel
    extractURLS: function(collection, key){
      var res = Array();
      
      if(collection)
        for(var i = 0; i < collection.length; i++)
          res.push(collection[i][key])

      return res;
    },


    // Loads portfolio data
    retreivePortfolio: function(){
      NProgress.start();      
      
      GAxios.get(endpoints.portfolio + this.artistId + "/")
      .then(response => {
          var portfolio = response.data;

          this.d_portfolioBanner = portfolio.banner;
          this.d_portfolioArtisticName = portfolio.artisticName;
          this.d_portfolioMainPhoto = portfolio.main_photo;
          this.d_portfolioBiography = portfolio.biography;

          // Genres
          var genres = portfolio.artisticGender;
          
          for(var i = 0; i < genres.length; i++){
            var genre = genres[i];
            delete genre.parentGender;
            this.d_portfolioGenres.push(genre);
          }

          
          // Images
          var pImages = portfolio.images;

          for(var i = 0; i < pImages.length; i++){
            var image = pImages[i];
            this.d_portfolioImages.push({id:i, imageURL:image});
          }

          this.updateImagesKey += 1;

          // Videos
          var pVideos = portfolio.videos;

          for(var i = 0; i < pVideos.length; i++){
            var video = pVideos[i];
            this.d_portfolioVideos.push({id:i, videoURL:video}, );
          }

          this.updateVideosKey += 1;
  
      }).catch( () => {
        this.errors = true;
      });

      GAxios.get(endpoints.genres)
      .then(response => {
          var genres = response.data;

          this.setAllGenres(genres)

      }).catch( () => {
        this.errors = true;
      });

      var authorizedGAxios = GAxios;
          var GAxiosToken = this.gsecurity.getToken();
          authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

          authorizedGAxios.get('/artist' + endpoints.calendar + this.gsecurity.getId() + '/')
            .then(response => {
              var calendar = response.data;
              if(calendar.length==0){
                this.datos.push({availableDates: []});
              }else{
                this.datos.push({availableDates: calendar[0].days,})
              }
                this.updateCalendatKey += 1;
          }).then(() => {
            NProgress.done()
          });
    },

    savePortfolio: function(){
      NProgress.start(); 
      var authorizedGAxios = GAxios;
      var GAxiosToken = this.gsecurity.getToken();
      authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

      var newGenres = this.$store.getters.genres.newGenres;
      for(var i = 0; i < newGenres.length; i++){
            var genre = newGenres[i].name;
            this.namesOfNewGenres.push(genre);
      }

      let body = {
        "id": this.artistId,
        "artisticName": this.d_portfolioArtisticName,
        "biography": this.d_portfolioBiography,
        "banner": this.d_portfolioBanner,
        "images": this.extractURLS(this.d_portfolioImages, 'imageURL'),
        "videos": this.extractURLS(this.d_portfolioVideos, 'videoURL'),
        "main_photo": this.d_portfolioMainPhoto,
        "artisticGenders": this.namesOfNewGenres,
      };
      let body_calendar = {
        "days": this.d_portfolioDays,
        "portfolio":this.$route.params['artistId']
      };

      authorizedGAxios.put(endpoints.portfolio + this.artistId + '/', body)
      .then(response => {
        console.log(response.data);
        this.gsecurity.setPhoto(this.d_portfolioMainPhoto);
        window.localStorage.setItem("photo", this.d_portfolioMainPhoto);
        //this.$router.push("/showPortfolio/"+this.artistId);
        //window.location.reload();
        
        //Actualizamos el calendario
        authorizedGAxios.put(endpoints.calendar + this.artistId + '/', body_calendar)
        .then(response => {
          this.$router.push("/showPortfolio/"+this.artistId)
        }).catch(ex => {
            console.log(ex);
            this.errors = true;
        })

      }).catch(ex => {
          console.log(ex);
          this.errors = true;
      }).then( () => {
          NProgress.done()
      });

      this.setFinal();
      
    },
  },

  props: {
    portfolioBanner: {
      type: String
    },
    portfolioIcon: {
      type: String
    },
    portfolioName: {
      type: String
    },
    portfolioBiography: {
      type: String
    },
    portfolioImages: {
      type: Array,
      default: function() {return []}
    },
    portfolioVideos: {
      type: Array,
      default: function() {return []}
    },
    portfolioVideos: {
      type: Array,
      default: function() {return []}
    },
    portfolioGenres: {
      type: Array,
      default: function() {return[]}
    }
  },

  created() {
    // Retreive store credentials
    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();
  },
  
  beforeMount: function(){
    
    this.artistId = Number(this.$route.params['artistId']);

    // Check if the user is granted to access
    if(!this.artistId || this.gsecurity.isAnonymous() || this.artistId != this.gsecurity.getId() || !this.$gsecurity.hasRole('ARTIST'))
      this.$router.push("/*");

    this.retreivePortfolio();
  },

}
</script>

<style scoped>

    *{
        font-family: "Archivo"
    }

  .imageCarousel{
    padding-top: 20px;
  }

  .videoCarousel{
    padding-top: 30px;
    padding-bottom: 20px;
  }

  .datesContainer{
  	padding-bottom: 50px;
  }

.contentCalendar{
        width: 100%;
        margin: 0 auto !important;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .availableDates{
        text-align: left;
        margin-left: 20px;
        font-weight: semibold;
    }

    @media (max-width: 767px){
    	.availableDatesTitle{
    		display: none;
    	}
    }
    @media (min-width: 768px){

        .availableDatesTitle{
            text-align: center;
            font-weight: bold;
            color: black;
            font-family: "Archivo";
            padding-top: 20px;
            padding-bottom: 40px;


        }
        .contentCalendar{
            width: 63%;
            
            margin: 0 auto !important;
            padding-top: 10px;
            padding-bottom: 10px;
            border-radius: 10px;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .5);
            margin: 0 auto;
        }
    }


    .validationErrors{
        background-color:#f50057;
        box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);
        
        color:white;
        font-weight: bold;
        height: 100%;
        padding-top: 12px;
    }

</style>

