<template>
  <div v-if="photosInfo.length != 0" class="container-fluid">
      <div class="owl-wrapper horizontal-center">
          <div class="row" style="padding-bottom: 15px">
            <div class="col-sm-12 col-md-8 horizontal-center">
              <h3 style="text-align: left; color: black;"><strong>{{gtrans.translate('artist_images')}}</strong></h3>
            </div>
          </div>
          <div class="row">
              <div class="col-sm-12 col-md-8 horizontal-center">
                  <div class="owl-carousel owl-theme">       
                      <a v-for="photoInfo in photosInfo" :key="photoInfo.id" :href="photoInfo.link">
                        <img :src="photoInfo.imageURL" class="card-img-top artistImage" v-bind:alt="gtrans.translate('image_alt')">
                      </a>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel'
import GSecurity from "@/security/GSecurity.js"
import GTrans from "@/utils/GTrans.js"

/* Makes Slides responsive */
$(window).on('resize', function(){

  var windowWidth = $(window).width();

  /* Substracts some amount to ensure component's width
  is smaller than the window */
  windowWidth -= 100;

  $('.owl-wrapper').css('width', windowWidth);

});

export default {
  name: "ImageCarousel",

  data: function(){
    return{
      gsecurity: GSecurity,
      gtrans: undefined,
    }
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

  },

  mounted: function () {

    /* Initializes Owl Carousel */
    var windowWidth = $( window ).width();
    windowWidth -= 100;

    $('.owl-wrapper').css('width', windowWidth);

    $('.owl-carousel').owlCarousel({
      loop:true,
      margin: 10,
      autoplay: true,
      nav: true,
      responsive:{

          0:{
              items:1,
          },
          600:{
              items:2,
          },
          992:{
              items:3,
          }
          
      },

    });
  }
}
</script>

<style scoped>
  .horizontal-center{
    margin: 0 auto;
  }

  @media (max-width: 576px) {
    .artistImage {
      object-fit: cover;
      height: 12rem;
      width: 100%;
      border-radius: 10px 10px 10px 10px;
    }
  }

  @media (min-width: 576px) {
    .artistImage {
      object-fit: cover;
      height: 15rem;
      width: 100%;
      border-radius: 10px 10px 10px 10px;
    }
  }
</style>


