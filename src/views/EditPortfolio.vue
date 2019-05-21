<template>
  <div>
    <form v-on:submit.prevent="savePortfolio">
      <EditSubmenu :artistId="artistId" />
      <div id="errorsDiv" class="validationErrors vertical-center">
        <p style="margin: 0px;">{{errors}}</p>
      </div>
      <EditPhoto :artistImage="this.d_portfolioMainPhoto" :artistBanner="this.d_portfolioBanner"/>
      <EditArtistInfo :key="updateArtistInfoKey"/>
       

      <EditImageCarousel :photosInfo="d_portfolioImages" :key="updateImagesKey" />
      <EditVideoCarousel :videosInfo="d_portfolioVideos" :key="updateVideosKey" />

      <EditAvailableDates :availableDates="availableDates" :key="updateCalendarKey"/>
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

  computed: {
    
    availableDates: function(){

      if(this.datos && this.datos[0] && this.datos[0].availableDates)
        return this.datos[0].availableDates;
      else
        return Array();

    }

  },

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
      updateCalendarKey: 0,
      updateArtistInfoKey:0,
      artistId: -1,
      errors: false,

      // Artist Info
      d_portfolioBanner: '',
      d_portfolioMainPhoto: '',
      d_portfolioArtisticName:'',
      d_portfolioBiography: '',
      d_portfolioGenres: Array(),
      d_portfolioZones: Array(),

      // Carousel
      d_portfolioImages: [], 
      d_portfolioVideos: [],  

      //Calendar
      datos: Array(),
      d_portfolioDays: [],

      //New genres
      namesOfNewGenres: [],

      //New zones
      namesOfNewZones: [],

      errors: "",

    }
  },
  methods: {
    ...mapActions(['setCurrentGenres', 'setAllGenres', 'setCurrentZones', 'setAllZones','setFinal']),
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

          // Genres
          var genres = portfolio.artisticGender;
          
          for(var i = 0; i < genres.length; i++){
            var genre = genres[i];
            delete genre.parentGender;
            this.d_portfolioGenres.push(genre);
          }

          // Zones
          var zones = portfolio.zone;
          console.log('zzzzzones', zones)
          for(var i = 0; i < zones.length; i++){
            var zone = zones[i];
            this.d_portfolioZones.push(zone);
          }
          this.updateArtistInfoKey++;
          this.setCurrentGenres(this.d_portfolioGenres);
          this.setCurrentZones(this.d_portfolioZones);
  
      }).catch( response => {
        this.errors = response.data.error;
        document.getElementById("errorsDiv").style.display = "block";
        window.scrollTo(0,0);
      });

      GAxios.get(endpoints.zones, {
      params: {
        'tree': true
      }
      }).then(response => {

        var root = response.data;

        this.setAllZones(root)
      }).catch( () => {
        this.errors = ex.response.data.error;
        document.getElementById("errorsDiv").style.display = "block";
        window.scrollTo(0,0);
      });

      GAxios.get(endpoints.genres, {
      params: {
        'tree': true
      }
      }).then(response => {

        var root = response.data;

        this.setAllGenres(root)
      }).catch( () => {
        this.errors = ex.response.data.error;
        document.getElementById("errorsDiv").style.display = "block";
        window.scrollTo(0,0);
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
                this.datos.push({availableDates: calendar.days,})
              }
                this.updateCalendarKey += 1;
          }).then(() => {
            NProgress.done()
          });
    },

    savePortfolio: function(){
      NProgress.start(); 
      var authorizedGAxios = GAxios;
      var GAxiosToken = this.gsecurity.getToken();
      authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

      var newG = this.$store.getters.genres.newGenres;
      var currentG = this.$store.getters.genres.currentGenres;
      var genresToSave = Array();

      if(newG)
        for(let a = 0; a < newG.length; a++) {
          genresToSave.push(newG[a]);
        }

      if(currentG)
        for(let a = 0; a < currentG.length; a++) {
          genresToSave.push(currentG[a]);
        }

      for(var i = 0; i < genresToSave.length; i++){
            var genre = genresToSave[i].name;
            this.namesOfNewGenres.push(genre);
      }

      var newZ = this.$store.getters.zones.newZones;
      var currentZ = this.$store.getters.zones.currentZones;
      var zonesToSave = Array();

      if(newZ)
        for(let a = 0; a < newZ.length; a++) {
          zonesToSave.push(newZ[a]);
        }
      
      if(currentZ)
        for(let a = 0; a < currentZ.length; a++) {
          zonesToSave.push(currentZ[a]);
        }

      for(var i = 0; i < zonesToSave.length; i++){
            var zone = zonesToSave[i].name;
            this.namesOfNewZones.push(zone);
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
        "zone" : this.namesOfNewZones,
      };
      let body_calendar = {
        "days": this.d_portfolioDays,
        "portfolio":this.$route.params['artistId']
      };

      console.log('body',body)

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
            this.errors = ex.response.data.error;
            document.getElementById("errorsDiv").style.display = "block";
            window.scrollTo(0,0);
        })

      }).catch(ex => {
          console.log(ex);
          this.errors = ex.response.data.error;
          document.getElementById("errorsDiv").style.display = "block";
          window.scrollTo(0,0);
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
        height: 100%;
        display: none;
        font-weight: bold;
        padding: 10px;
        padding-top: 12px;
    }

</style>

