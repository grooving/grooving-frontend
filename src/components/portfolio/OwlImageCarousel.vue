<template>
    <div class="owl-carousel owl-theme">       
      <div v-for="photoInfo in photosInfo" :key="photoInfo.id" class="photoContainer">

        <img :src="photoInfo.imageURL" class="card-img-top carouselImage item" data-dot="<button role='button' class='owl-dot-button'></button>"/>

        <!-- If mode is editVideo, actionImage is a trashBin -->
        <img v-if="$props.mode == 'editVideo'" :id="photoInfo.id" class="actionImage" src="@/assets/img/trashbin.jpg" @click="actionImageTrigger($event)" />
        <!-- If mode is displayVideo, actionImage is a play -->        
        <img v-else :id="photoInfo.id" class="actionImage" src="@/assets/img/play_video.png" @click="actionImageTrigger($event)" />

      </div>
    </div>
</template>

<script>
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';

/* Makes Slides responsive */
$(window).on('resize', function(){

  var windowWidth = $(window).width();

  /* Substracts some amount to ensure component's width
  is smaller than the window */
  windowWidth -= 100;

  $('.owl-wrapper').css('width', windowWidth);

});

export default {

  name: "OwlImageCarousel",

  methods: {

    actionImageTrigger: function(event){
      this.$emit('actionImageTrigger', event.target.id);
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

    mode: {
      /* Currently, only 'editVideo' and 'displayVideo' are availables */
      type: String,
      default: 'editVideo',
    },
    
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
      dots: true,
      dotsData: true,
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

  },

}
</script>

<style>

.owl-dots {
    display: flex;
    justify-content: center;
    padding-top: 10px;
}

.owl-dot {
    background-color: #e8e5e5;
    margin: 5px;
    height: 3px;
    width: 80%;
}

.owl-dot-button {
    width: 100%;
    height: 100%;
    background: none;
    border: none;
}

.owl-dot.active{
    background-color: #9b9b9b;
}

</style>

<style scoped>

  .actionImage {
    opacity: 0.60;
    position: absolute;
    width: 25% !important;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .actionImage:hover {
    width: 30% !important;
  }

  @media (max-width: 576px) {
    .carouselImage {
      object-fit: cover;
      height: 12rem;
      width: 100%;
      border-radius: 10px 10px 10px 10px;
    }
  }

  @media (min-width: 576px) {
    .carouselImage {
      object-fit: cover;
      height: 15rem;
      width: 100%;
      border-radius: 10px 10px 10px 10px;
    }
  }

  .horizontal-center{
    margin: 0 auto;
  }

  img {
    width: inherit;
  }

  .photoContainer{
    border-radius: 10px 10px 10px 10px;
    position: relative;
  }
  
  .vertical-center{
    display: flex; 
    align-items: center;  /*Aligns vertically center */
  }

</style>


