<template>
  <div>
    <EditArtistInfo />
    <EditImageCarousel />
    <EditVideoCarousel />
    <EditAvailableDates />
  </div>
</template>

<script>
import EditPhoto from '@/components/EditPhoto.vue'
import EditArtistInfo from '@/components/portfolio/EditArtistInfo.vue'
import EditImageCarousel from '@/components/portfolio/EditImageCarousel.vue';
import EditVideoCarousel from '@/components/portfolio/EditVideoCarousel.vue';
import EditAvailableDates from '@/components/portfolio/EditAvailableDates.vue';

var portfolioDays = [];

export default {
  name: 'EditPortfolio',
  components: {
    EditImageCarousel,
    EditPhoto,
    EditArtistInfo,
    EditVideoCarousel,
    EditAvailableDates,
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
      updateVideosKey: 0,
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
  
  mounted: function(){
    
    var authorizedGAxios = GAxios;
    authorizedGAxios.get(endpoints.portfolio+this.$route.params['artistId']+"/")
      .then(response => {
      		console.log(response)
          var portfolio = response.data;

          this.d_portfolioBanner = portfolio.banner;
          this.d_portfolioName = portfolio.artisticName;
          this.d_portfolioIcon = portfolio.artist.photo;
          var media = portfolio.portfoliomodule_set;
          var genres = portfolio.artisticGender;

          for(var i = 0; i < genres.length; i++){
            var genre = genres[i];
            this.portfolioGenres.push(genre['name']);
          }

          var imgCounter = 0;
          var vidCounter = 0;

          for(var i = 0; i < media.length; i++){

            var elementMedia = media[i];
            
            if(elementMedia['type'] == 'VIDEO'){
              this.d_portfolioVideos.push({id:vidCounter, videoURL:elementMedia['link']});
              vidCounter += 1;
            }
            if(elementMedia['type'] == 'PHOTO'){
              this.d_portfolioImages.push({id:imgCounter, imageURL:elementMedia['link']});
              imgCounter += 1;
            }
          }

          this.d_portfolioDays = portfolio.calendar_set[0]['days'];
          //alert(this.d_portfolioDays.length);

          this.updateVideosKey += 1;
          this.updateImagesKey += 1;
                
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

</style>

