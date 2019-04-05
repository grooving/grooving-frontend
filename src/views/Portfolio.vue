<template>
  <div>
    <ArtistInfo :artistBanner="d_portfolioBanner" :artistName="d_portfolioName" :artistGenres="portfolioGenres" :artistImage="d_portfolioIcon" :artistDescription="d_portfolioBiography" />
    <ImageCarousel class="imageCarousel" :photosInfo="d_portfolioImages" :key="updateImagesKey"/>
    <VideoCarousel class="videoCarousel" :videosInfo="d_portfolioVideos" :key="updateVideosKey"/>
    <div v-if="this.datos.length != 0" id="datesContainer" class="datesContainer">	
    	<div class="contentCalendar">
    		<h3 class="availableDatesTitle" >Available dates</h3>
    		<Calendar class="availableDates" :availableDates="this.datos[0].availableDates"/>
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
import Calendar from '@/components/Calendar.vue';

var portfolioDays = [];

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
    }
  },

  data: function(){
    
    return{
      gsecurity: GSecurity,
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
      datos: Array(),
    }
  },

  computed: {

    hideEditButton(){
      return !this.artistId || this.gsecurity.isAnonymous() || this.artistId != this.gsecurity.getId();
    }

  },
  
<<<<<<< HEAD
  beforeMount: function(){
    
=======
  mounted: function(){
    this.artistId = this.$route.params['artistId'];

>>>>>>> 0cc8899189f73daafb034e343b97eeb4c5860586
    var authorizedGAxios = GAxios;
    authorizedGAxios.get(endpoints.portfolio+this.$route.params['artistId']+"/")
      .then(response => {
      		console.log(response)
          var portfolio = response.data;

          this.d_portfolioBanner = portfolio.banner;
          this.d_portfolioName = portfolio.artisticName;
          this.d_portfolioIcon = portfolio.main_photo;
          this.d_portfolioBiography = portfolio.biography;
          var genres = portfolio.artisticGenders;
          
          for(var i = 0; i < genres.length; i++){
            var genre = genres[i];
            this.portfolioGenres.push(genre);
          }
          
         
          var imageCounter = 0;
          var pImages = portfolio.images;


          for(var i = 0; i < pImages.length; i++){
            var image = pImages[i];
            this.d_portfolioImages.push({id:imageCounter, imageURL:image});

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

          

          this.d_portfolioDays = portfolio.calendar_set[0]['days'];
          console.log(this.d_portfolioImages)

          
          
                
    });


      var authorizedGAxios = GAxios;
      if (this.gsecurity.isAuthenticated()) {
        var GAxiosToken = this.gsecurity.getToken();
        authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;
      }

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

  }

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

