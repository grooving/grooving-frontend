<template>
 <div class="container-fluid horizontal-center">
    <div id="topContainer" class="row">
      <div class="col-sm-12 col-md-8 horizontal-center">
        <div id="titleAndAdd" class="row">
          <div id="titleContainer" class="col-8 vertical-center">
            <h3 class="title"><strong>Video Showcase</strong></h3>
          </div>
          <div id="buttonContainer" class="col-4 vertical-center">
            <button type="button" class="vertical-center addButton" @click="toggleImageURLInput">
              <i v-if="showAddURL" class="material-icons arrowIcon addURLButton">cancel</i>
              <i v-else class="material-icons arrowIcon addURLButton">add_circle</i>
            </button>
          </div>
        </div>
        <div id="urlForm" class="row py-2" v-if="showAddURL">
          <div class="col-12 vertical-center">
            <input @keypress.enter="add()" type="text" v-model="addImageURL" class="form-control" placeholder="Insert your URL Here..." />
          </div>
        </div>
      </div>
    </div>
    <div id="bottomContainer" class="row">
        <div id="owl-container" class="col-sm-12 col-md-8 horizontal-center">
          <div class="owl-wrapper">
            <OwlImageCarousel :photosInfo="d_photosInfo" :key="actualizador" @deleteImage="deleteCarouselImage" />
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import OwlImageCarousel from './OwlImageCarousel.vue';

// YT URI used to obtain the thumbnail
const ytThumbnail_01 = 'http://i3.ytimg.com/vi/';
const ytThumbnail_02 = '/maxresdefault.jpg';

// Allowed URIs
const ytURI1 = 'https://www.youtube.com/watch?v=';
const ytURI2 = 'http://www.youtube.com/watch?v=';

// Length of the YT ID
const ytIDLength = 11;

export default {

  name: "EditVideoCarousel",

  components:{
    OwlImageCarousel
  },

  data: function(){
    return{
      showAddURL: false,
      addImageURL: "",
      actualizador: 0,

      // Array containing URLs of thumbnails
      d_photosInfo: Array(),

      // Array containing the actual links
      d_videosInfo: Array(),
    }
  },

  methods: {

    deleteCarouselImage: function(id){
      // Update the 3 references: photos, videos and the parent
      this.d_photosInfo = this.d_photosInfo.filter(x => x.id != id);
      this.d_videosInfo = this.d_videosInfo.filter(x => x.id != id);
      this.$parent.d_portfolioVideos = this.d_videosInfo;

      this.actualizador++;
    },

    toggleImageURLInput: function(){
      this.showAddURL = !this.showAddURL;
    },

    getThumbnail: function(ytURL){
        var ytVideoId;
        var substringBeginIndex = ytURL.startsWith(ytURI1) ? ytURI1.length : ytURI2.length;

        ytVideoId = ytURL.substring(substringBeginIndex, substringBeginIndex + ytIDLength);
        return ytThumbnail_01 + ytVideoId + ytThumbnail_02;
    },

    add: function(){
      
      if(this.addImageURL && (this.addImageURL.startsWith(ytURI1) || this.addImageURL.startsWith(ytURI2))){

        var thumbnail = this.getThumbnail(this.addImageURL);

        if(thumbnail){
          this.d_photosInfo.push({id: this.d_photosInfo.length, imageURL: thumbnail});
          this.d_videosInfo.push({id: this.d_videosInfo.length, videoURL: this.addImageURL});
          this.$parent.d_portfolioVideos = this.d_videosInfo;

          this.actualizador++;
          this.addImageURL = '';
          this.toggleImageURLInput();
        }

      }
    },

  },

  props: {
    videosInfo: {
      type: Array,
    }
  },

  created() {
    this.d_videosInfo = this.$props.videosInfo;

    for(var i = 0; i < this.d_videosInfo.length; i++){
      this.d_photosInfo.push({id: i, imageURL: this.getThumbnail(this.d_videosInfo[i]['videoURL'])});
    }

    console.log(this.d_photosInfo)
    
  }

}
</script>

<style scoped>

  .addURLButton{
    background: -webkit-linear-gradient(left, #00fb82, #187fe6);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    border: none;
    margin: 0 auto; 
    font-size: 55px
  }

  .addURLButton:hover{
    background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
  }

  .addButton{
    height:65px; 
    width:inherit; 
    background:none; 
    border:none;
  }

  .horizontal-center{
    margin: 0 auto;
  }

  .title{
    text-align: left; 
    color: black; 
    margin: 0;
  }

  #topContainer{
    padding-bottom: 15px;
  }

  .vertical-center{
    display: flex; 
    align-items: center;  /*Aligns vertically center */
  }

</style>

