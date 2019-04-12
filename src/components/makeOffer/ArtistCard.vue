<template>
<div>
    
    <div class="everything">
        <div class="tarjeta">
            <router-link v-bind:to="linkToPortfolio">
                <img v-if="!artistImage" src="@/assets/defaultPhoto.png" class="card-img-top artistImage" alt="Artist's Image">
                <img v-else class="card-img-top artistImage" :src="artistImage" alt="Artist's Image">
            </router-link>
            <div class="card-body cuerpoTarjeta">
                <div class="leftContent">
                    <h5 class="card-title artistName">{{ artistName }}</h5>
                    <span class="card-text artistGenres">{{ artistGenres }}</span>
                </div>
                <div v-if="price!=null" class="rightContent">
                    <p class="price">{{ price }}€/h</p>
                </div>
                <div v-if="totalPrice!=null" class="rightContent">
                    <p class="price">Total: <br>{{ totalPrice }}€</p>
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import DoubleSlider from '@/components/makeOffer/DoubleSlider.vue'
import {mapActions} from 'vuex';

export default {
  name: 'TimeSelection',

  components: {
    DoubleSlider
  },

  data () {
      return {
          time: {
            start: '00:00',
            duration: 23.5,    
        },
        nextStep: undefined, 
      }
  },

  computed: {

      linkToPortfolio: function(){
          return this.$props.artistURI  + this.$props.artistId;
      }

  },

  props: {
        artistId: {
            type: String,
            default: "1"
        },
        artistURI: {
            type: String,
            default: '/showPortfolio/'
        },
        artistImage: {
            type: String,
            default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png',
        },
        artistName: {
            type: String,
            default: 'NO DATA'
        },
        artistGenres: {
            type: Array,
            default: 'Genre 1, Genre 2'
        },
        price: {
          type: String,
          default: null
        },
        totalPrice: {
          type: Number,
          default: null
        },
    },
    methods: {

    }
}
</script>

<style>


</style>

<style scoped>
    * {
        font-family: "Archivo"
    }
    .card-img-top {
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
    }

    .tarjeta {
        width: 100%;
        box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
        margin-bottom: 10px;
    }

    .artistImage {
        object-fit: cover;
        max-height: 200px;
    }

    .cuerpoTarjeta {
        display: flex;
        align-items: center;
    }

    .leftContent {
        text-align: left;
        overflow: auto;
        max-width: 50%;
    }

    .artistName {
        font-size: 32px;
        margin-bottom: 0px;
        padding-bottom: 0px;
        word-wrap: break-word;
    }

    .artistGenres {
        color: #187FE6;
        font-size: 18px;
        word-wrap: break-word;
    }

    .rightContent {
        padding-left: 0px;
        margin-left: auto;
        margin-right: 0px;
        max-width: 50%;
    }

    .price {
        font-size: 35px;
        margin-bottom: 0px;
        color: #187FE6;
        word-break: break-all;
    }

    .artistImage {
        border-radius: 0px;
    }

    @media (min-width:768px)  {
        .tarjeta {
            min-width: 335px;
            width: 25%;
            border-radius: 10px;
            box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
            margin-right: 10px;
        }

        .artistImage {
            border-radius: 10px 10px 0px 0px;
        }
        
        
    }

</style>
