<template>
  <div v-if="photosInfo.length != 0" class="container-fluid">
      <div class="horizontal-center">
          <div class="row" style="padding-bottom: 15px">
            <div class="col-sm-12 col-md-8 horizontal-center">
              <h3 style="text-align: left; color: black;"><strong>{{gtrans.translate('artist_images')}}</strong></h3>
            </div>
          </div>
          <div class="row">
              <div class="owl-wrapper horizontal-center">
                <div class="col-sm-12 col-md-8 horizontal-center">
                  <OwlImageCarousel :photosInfo="d_photosInfo" :key="actualizador" :mode="'displayImage'" @imageTrigger="magnifyImage" />
                </div>
              </div>
          </div>
      </div>
      <ImagePopup  v-if="popUpPhoto != ''" :photo="popUpPhoto" @onClosePopUp="popUpPhoto = ''" />
  </div>
</template>

<script>
import OwlImageCarousel from './OwlImageCarousel.vue';
import ImagePopup from './ImagePopup.vue';
import GSecurity from "@/security/GSecurity.js"
import GTrans from "@/utils/GTrans.js"

export default {

  name: "ImageCarousel",

  components:{
    OwlImageCarousel, ImagePopup
  },

  data: function(){
    return{

      gsecurity: GSecurity,
      gtrans: undefined,
      actualizador: 0,

      // Array containing the info about photos
      d_photosInfo: Array(),
      popUpPhoto: '',

    }
  },

  methods: {

    magnifyImage: function(id){
      // Finds the selected video in the array, gets its URL and opens it
      var selectedImage = this.d_photosInfo.filter(x => x.id == id);

      if(selectedImage){
        this.popUpPhoto = selectedImage[0].imageURL;
      }

    },

  },

  props:{
    photosInfo: {
            /* Array of dictionaries of type { id:int, imageURL: String, link: String} */
            type: Array,
            default: [
              {id: 0, imageURL: "https://4c79id2ej5i11apui01ll2wc-wpengine.netdna-ssl.com/wp-content/uploads/2018/09/Charli-XCX-Gallery-1.jpg", link: '#'}
            ]
    },
  },
  
  created: function(){
    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();

    this.gtrans = new GTrans(this.gsecurity.getLanguage());
    
    // Podemos cambiar el lenguaje así para debug...
    //this.gtrans.setLanguage('es')
    //this.gtrans.setLanguage('en')

    this.d_photosInfo = this.$props.photosInfo;
    //console.log(this.popUpPhoto)
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


