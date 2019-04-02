<template>
  <div id="results" class="container-fluid px-0 mt-0">
    <h1 class="titleView">{{listTitle}}</h1>
    <div class="row">
      <div v-for="artist in artistas" :key="artist.artistURI" class="tarjeta col-12 col-md-6 col-xl-4">
        <ArtistCard :artistImage="artist.artistImage" :artistName="artist.artistName" :artistGenres="artist.artistGenres" :artistURI="getArtistURI(artist.artistID)" :hireURI="getHireURI(artist.artistID)" />
      </div>
    </div>
  </div>
</template>

<script>
import ArtistCard from '@/components/ArtistCard.vue';
import GAxios from '@/utils/GAxios.js';

const showPortfolioBaseURI = '/showPortfolio/';
const hiringBaseURI = '/makeOffer/';

export default {
  name: 'ArtistsList',

  components: {
    ArtistCard,
  },

  props:{

    listTitle:{
      type: String,
    },

    artistas:{
      type: Array,
      required: true,
    }

  },

  methods:{
    getArtistURI(artistID){
      return showPortfolioBaseURI + artistID;
    },

    getHireURI(artistID){
      return hiringBaseURI + artistID;
    },
  }
}

</script>

<style scoped>

  @media (min-width:768px)  {
    .titleView{
      text-align: left;
      font-weight: bold;

    }
  }

  @media (max-width: 768px){
    .titleView{
      text-align: center;
      font-weight: bold;
      margin-bottom: 30px;

    }
  }

  .container-fluid{
    margin-top: 50px;
    margin-bottom: 30px;
  }

  @media (max-width: 576px) {
    .tarjeta{
      padding-bottom: 20px;
      padding-right: 0px;
      padding-left: 0px;
    }
  }

  @media (min-width: 576px) {
    .tarjeta{
      padding-bottom: 20px;
    }
  }

</style>

