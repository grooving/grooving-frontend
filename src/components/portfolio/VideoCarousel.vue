<template>
  <div v-if="videosInfo.length != 0" class="container-fluid">
      <div class="horizontal-center">
          <div class="row" style="padding-bottom: 15px">
            <div class="col-sm-12 col-md-8 horizontal-center">
              <h3 style="text-align: left; color: black;"><strong>{{gtrans.translate('videoShowcase')}}</strong></h3>
            </div>
          </div>
          <div class="row">
              <div class="owl-wrapper horizontal-center">
                <div class="col-sm-12 col-md-8 horizontal-center">
                  <OwlImageCarousel :photosInfo="d_photosInfo" :key="actualizador" :mode="'displayVideo'" @actionImageTrigger="openYTTab" />
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import OwlImageCarousel from './OwlImageCarousel.vue';
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js";

// YT URI used to obtain the thumbnail
const ytThumbnail_01 = 'http://i3.ytimg.com/vi/';
const ytThumbnail_02 = '/maxresdefault.jpg';

// Allowed URIs
const ytURI1 = 'https://www.youtube.com/watch?v=';
const ytURI2 = 'http://www.youtube.com/watch?v=';

// Length of the YT ID
const ytIDLength = 11;

export default {

  name: "VideoCarousel",

  components:{
    OwlImageCarousel
  },

  data: function(){
    return{
      showAddURL: false,
      addImageURL: "",
      actualizador: 0,
      showImageCarouselInputErrors: false,

      // Array containing URLs of thumbnails
      d_photosInfo: Array(),

      // Array containing the actual links
      d_videosInfo: Array(),
      gtrans: undefined,
    }
  },

  methods: {

    openYTTab: function(id){
      // Finds the selected video in the array, gets its URL and opens it
      var selectedVideo = this.d_videosInfo.filter(x => x.id == id);

      if(selectedVideo){
        selectedVideo = selectedVideo[0];
        window.open(selectedVideo.videoURL, '_blank');
      }

    },

    getThumbnail: function(ytURL){
        var ytVideoId;
        var substringBeginIndex = ytURL.startsWith(ytURI1) ? ytURI1.length : ytURI2.length;

        ytVideoId = ytURL.substring(substringBeginIndex, substringBeginIndex + ytIDLength);
        return ytThumbnail_01 + ytVideoId + ytThumbnail_02;
    },

  },

  props:{
    videosInfo: {
            /* Array of dictionaries of type { id:int, imageURL: String, link: String} */
            type: Array,
            default: [
              {id: 0, videoURL: "https://www.youtube.com/watch?v=qfAqtFuGjWM"},
              {id: 1, videoURL: "https://www.youtube.com/watch?v=IFr3GnboNRU"}
            ],
    },
  },

  created() {
    this.d_videosInfo = this.$props.videosInfo;

    for(var i = 0; i < this.d_videosInfo.length; i++){
      this.d_photosInfo.push({id: i, imageURL: this.getThumbnail(this.d_videosInfo[i]['videoURL'])});
    }

    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();

    this.gtrans = new GTrans(this.gsecurity.getLanguage());
    
  },
}
</script>

<style scoped>
  .horizontal-center{
    margin: 0 auto;
  }

  @media (max-width: 576px) {
    .owl-carousel .item-video{
      height: 15em;
    }
  }

  @media (min-width: 576px) {
    .owl-carousel .item-video{
      height: 18rem;
    }
  }
</style>


