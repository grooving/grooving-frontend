<template>
 <div class="container-fluid horizontal-center">
    <div id="topContainer" class="row">
      <div class="col-sm-12 col-md-8 horizontal-center">
        <div id="titleAndAdd" class="row">
          <div id="titleContainer" class="col-8 vertical-center">
            <h3 class="title"><strong>Video Showcase</strong></h3>
          </div>
          <div id="buttonContainer" class="col-4 vertical-center">
            <button class="vertical-center addButton" @click="toggleImageURLInput">
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
            <OwlImageCarousel :photosInfo="photosInfo" :key="actualizador" @deleteImage="deleteCarouselImage" />
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import OwlImageCarousel from './OwlImageCarousel.vue';

const ytThumbnail_01 = 'http://i3.ytimg.com/vi/';
const ytThumbnail_02 = '/maxresdefault.jpg';
const ytURI1 = 'https://www.youtube.com/watch?v=';
const ytURI2 = 'http://www.youtube.com/watch?v=';
const ytURI3 = 'https://m.youtube.com/watch?v=';
const ytIDLength = 11;
const videoPrueba ="replay";

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
      photosInfo: [
              {id: 0, imageURL: "https://4c79id2ej5i11apui01ll2wc-wpengine.netdna-ssl.com/wp-content/uploads/2018/09/Charli-XCX-Gallery-1.jpg", link: '#'}
            ],
    }
  },

  methods: {

    deleteCarouselImage: function(id){
      this.photosInfo = this.photosInfo.filter(x => x.id != id);
      this.actualizador++;
    },

    toggleImageURLInput: function(){
      this.showAddURL = !this.showAddURL;
    },

    add: function(){
      
      if(this.addImageURL){
        // Get YT video ID in order to add its thumbnail
        var ytVideoId, thumbnail;

        if(this.addImageURL.startsWith(ytURI1)){
          ytVideoId = this.addImageURL.substring(ytURI1.length, ytURI1.length + ytIDLength)
        }else if(this.addImageURL.startsWith(ytURI2)){
          ytVideoId = this.addImageURL.substring(ytURI2.length, ytURI2.length + ytIDLength)
        }else if(this.addImageURL.startsWith(ytURI3)){
          ytVideoId = this.addImageURL.substring(ytURI3.length, ytURI3.length + ytIDLength)
        }

        //If it is not a yt video, we return a generic image
        if(ytVideoId)
          thumbnail = ytThumbnail_01 + ytVideoId + ytThumbnail_02;
        else
          thumbnail = "https://myaco.lemans.org/GED/content/4805C9CE-ECF4-4232-AEF4-3580948695DC.jpg";

        this.photosInfo.push({id: this.photosInfo.length, imageURL: thumbnail});
        this.actualizador = this.actualizador + 1;

        this.addImageURL = '';
        this.toggleImageURLInput();
      }
    },

  },

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


