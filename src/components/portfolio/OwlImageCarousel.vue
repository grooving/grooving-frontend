<template>
    <div id="owl-images" class="owl-carousel owl-theme">       
      <div v-for="photoInfo in photosInfo" :key="photoInfo.id" class="photoContainer">
        <img :src="photoInfo.imageURL" class="card-img-top artistImage"/>
        <img :id="photoInfo.id" class="trash" src="https://image.freepik.com/free-icon/trash-bin-symbol_318-10194.jpg" @click="borrar($event)" />
      </div>
    </div>
</template>

<script>
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';

export default {
  name: "OwlImageCarousel",

  methods: {

    borrar: function(event){
      this.$emit('deleteImage', event.target.id);
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

  mounted: function () {
    
    /* Initializes Owl Carousel */
    var containerWidth = $('#owl-container').width();
    containerWidth -= 20;
    $('.owl-wrapper').css('width', windowWidth);

    /* Make it resizable */
    window.addEventListener('resize', function () { 
      var containerWidth = $('#owl-container').width();
      containerWidth -= 20;
      $('.owl-wrapper').css('width', containerWidth);
    });

    $('.owl-carousel').owlCarousel({
      loop:false,
      margin: 10,
      autoplay: true,
      nav: false,
      responsive:{
          0:{
              items:1,
              stagePadding: 25,
          },
          600:{
              items:2,
              stagePadding: 25,
          },
          992:{
              items:2,
              stagePadding: 100,
          }
      },

    });
  },

  beforeUpdate(){
    
    /* Initializes Owl Carousel */
    var containerWidth = $('#owl-container').width();
    containerWidth -= 20;

    $('.owl-wrapper').css('width', containerWidth);

    $('.owl-carousel').owlCarousel({
      loop:false,
      margin: 10,
      autoplay: true,
      nav: false,
      responsive:{
          0:{
              items:1,
              stagePadding: 25,
          },
          600:{
              items:2,
              stagePadding: 25,
          },
          992:{
              items:2,
              stagePadding: 100,
          }
      },

    });
  }
}
</script>

<style scoped>

  .photoContainer{
    border-radius: 10px 10px 10px 10px;
    position: relative;
  }

  img {
    width: inherit;
  }

  .trash {
    opacity: 0.60;
    position: absolute;
    width: 25% !important;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .trash:hover {
    width: 30% !important;
  }

  .horizontal-center{
    margin: 0 auto;
  }
  
  .vertical-center{
    display: flex; 
    align-items: center;  /*Aligns vertically center */
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


