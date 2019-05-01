<template>
  <div class="container-fluid">
    <div class="container mt-5">
      <ArtistList :listTitle="'Top Artists'" :artistas="datos" />
    </div>
  </div>
</template>

<script>
  
import ArtistList from '@/components/ArtistList.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';

export default {
  name: 'TopArtists',

  components: {
    ArtistList
  },

  data: function(){
    return{
      datos: Array(),
    }
  },

  methods:{
    getArtists: function(){
      NProgress.start();
      // Make the API call
      GAxios.get(endpoints.artists, {
        params: {
          'order' : 'desc'
        }
      }).then(response => {

        var artists = response.data;

        console.log(response.data)

        for(var i = 0; i < artists.length; i++){
          var genres = Array();

          for(var g = 0; g < artists[i].portfolio.artisticGender.length; g++){
            genres.push(artists[i].portfolio.artisticGender[g].name);
          }
          this.datos.push({
            artistID: artists[i].id, 
            artistImage: artists[i].photo,
            artistName: artists[i].portfolio.artisticName,
            artistGenres: genres,
          });

        }
      }).catch(ex => {
          console.log(ex);
      }).then(() => {
        NProgress.done()
      });
    }
  },

  beforeMount(){
    this.getArtists();
  }
}
</script>

<style scoped>

</style>
