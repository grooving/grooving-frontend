<template>
  <div>
    <ArtistInfo :artistBanner="d_portfolioBanner" :artistName="d_portfolioName" :artistGenres="portfolioGenres" :artistZones="portfolioZones"
      :artistImage="d_portfolioIcon" :artistDescription="d_portfolioBiography" :artistRating="rating" :artistId="artistId"/>
    <ImageCarousel class="imageCarousel" :photosInfo="d_portfolioImages" :key="updateImagesKey"/>
    <VideoCarousel class="videoCarousel" :videosInfo="d_portfolioVideos" :key="updateVideosKey"/>
    <div id="datesContainer" class="datesContainer">	
    	<div class="contentCalendar">
    		<h3 class="availableDatesTitle" >{{gtrans.translate('availableDates')}}</h3>
    		<Calendar :key="refreshC" class="availableDates" :availableDates="datos.availableDates"/>
    	</div>
    </div>
    <router-link v-if="!hideEditButton" :to="'/editPortfolio/' + artistId" class="floating-btn vertical-center">
      <div id="floating-button">
        <div :to="artistId" class="floating-btn vertical-center">
          <i class="material-icons vertical-center">edit</i>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>

import ArtistInfo from '@/components/portfolio/ArtistInfo.vue';
import ImageCarousel from '@/components/portfolio/ImageCarousel.vue';
import VideoCarousel from '@/components/portfolio/VideoCarousel.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js";
import Calendar from '@/components/Calendar.vue';

import {mapActions} from 'vuex';
import { type } from 'os';

export default {
  name: 'Portfolio',
  components: {
    ArtistInfo,
    ImageCarousel,
    VideoCarousel,
    Calendar,
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
    },
    portfolioZones: {
      type: Array,
      default: function() {return[]}
    },
  },

  data: function(){
    
    return{
      gsecurity: GSecurity,
      gtrans: undefined,
      artistId: -1,
      updateVideosKey: 0,
      updateImagesKey: 0,
      d_portfolioBanner: '',
      d_portfolioIcon: '',
      d_portfolioName:'',
      d_portfolioBiography: '',
      d_portfolioImages: Array(),
      d_portfolioVideos: Array(),
      d_portfolioDays: Array(),
      datos: {
        availableDates: Array(),
      },
      rating: undefined,

      refreshC: 1,
    }
  },

  computed: {

    hideEditButton(){
      return !this.$gsecurity.hasRole('ARTIST')||!this.artistId || this.gsecurity.isAnonymous() || this.artistId != this.gsecurity.getId();
    },

    availableDates: function(){
      
      if(this.datos && this.datos[0] && this.datos[0].availableDates)
        return this.datos[0].availableDates;
      else
        return Array();

    }

  },
  methods: {
      ...mapActions(['setCurrentGenres', 'setCurrentZones']),
  },
  mounted: function(){
    
    this.artistId = this.$route.params['artistId'];

    var authorizedGAxios = GAxios;

    NProgress.start();
    authorizedGAxios.get(endpoints.portfolio+this.$route.params['artistId']+"/")
      .then(response => {
          var portfolio = response.data;

          this.d_portfolioBanner = portfolio.banner;
          this.d_portfolioName = portfolio.artisticName;
          this.d_portfolioIcon = portfolio.main_photo;
          this.d_portfolioBiography = portfolio.biography;
          this.rating = portfolio.artist.rating;
          var genres = portfolio.artisticGender;
          var zones = portfolio.zone;
          
          for(var i = 0; i < genres.length; i++){
            var genre = genres[i];
            delete genre.parentGender;
            this.portfolioGenres.push(genre);
          }
          this.setCurrentGenres(this.portfolioGenres);

          for(var i = 0; i < zones.length; i++){
            var zone = zones[i];
            this.portfolioZones.push(zone);
          }
          this.setCurrentZones(this.portfolioZones);
         
          var imageCounter = 0;
          var pImages = portfolio.images;


          for(var i = 0; i < pImages.length; i++){
            var image = pImages[i];
            this.d_portfolioImages.push({id:imageCounter, imageURL:image});
            imageCounter++;
          }
          this.updateImagesKey += 1;

          var videoCounter = 0;
          var pVideos = portfolio.videos;


          for(var i = 0; i < pVideos.length; i++){
            var video = pVideos[i];
            this.d_portfolioVideos.push({id:videoCounter, videoURL:video});
            videoCounter = videoCounter+1;
          }

          this.updateVideosKey += 1;  
                
    }).catch( () => {
      // If there was an error while loading the request (entity does not exist, ...)
      this.$router.push('/error');
    });


      var authorizedGAxios = GAxios;
      if (this.gsecurity.isAuthenticated()) {
        var GAxiosToken = this.gsecurity.getToken();
        authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;
      }

      authorizedGAxios.get(endpoints.artistCalendar + this.$route.params['artistId'] + '/')
        .then(response => {

          var calendar = response.data;
          if(calendar.length==0){
            this.datos.push({availableDates: []});
          }else{
            for (var i = 0; i < calendar.days.length; i++) {
              this.datos.availableDates.push(calendar.days[i])
            }
          }

        }).catch(ex => {
            // If there was an error while loading the request (entity does not exist, ...)
            this.$router.push('/error');
        }).then(() => {
          NProgress.done()
        }).then(() => {
          this.refreshC++;
        });
  },
  created() {

        // Retreive store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
            
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')

    },
}
</script>

<style scoped>


  .imageCarousel{
    padding-top: 20px;
    padding-bottom: 50px;
  }

  .videoCarousel{
    padding-top: 30px;
    padding-bottom: 50px;
  }

  .datesContainer{
  	padding-bottom: 50px;
  }

  .floating-btn{
    position:fixed;
    width:60px;
    height:60px;
    bottom:40px;
    right:40px;
    z-index: 10;
    background-image: linear-gradient(to right, #00fb82, #187fe6);
    color:#FFF;
    border-radius:50px;
    text-align:center;
    box-shadow: 2px 2px 3px #999;
    text-decoration:none;
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

  .vertical-center{
    display: flex; 
    align-items: center;  /*Aligns vertically center */
    justify-content: center; /*Aligns horizontally center */
  }

</style>

