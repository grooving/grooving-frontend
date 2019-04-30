<template>
<div>
  <div class="banners">
  <div class="banner2"><img class="d-block w-100 banner2" src="@/assets/img/banner2.png" v-bind:alt="this.gtrans.translate('image')" style="box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, .2) !important;"></div>
  <div class="banner1"><img class="d-block w-100 banner1" src="@/assets/img/banner1.png" v-bind:alt="this.gtrans.translate('image')" style="box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, .2) !important;"></div>
  </div>
  <div class="container-fluid">
    <div class="container"><ArtistList :listTitle="this.gtrans.translate('artists')" :artistas="datos" /></div>
  </div>
  </div>

</template>

<script>
import ArtistList from '@/components/ArtistList.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from "@/security/GSecurity.js";
import GTrans from "@/utils/GTrans.js";

export default {
  name: 'index',

  components: {
    ArtistList
  },

  data: function(){
    return{
      gsecurity: GSecurity,
      gtrans: undefined,

      datos: Array(),
    }
  },

  methods:{
    getArtists: function(){
      NProgress.start();
      // Make the API call
      GAxios.get(endpoints.artists).then(response => {

        var artists = response.data.results;

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

  created: function(){
    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();

    this.gtrans = new GTrans(this.gsecurity.getLanguage());
    
    // Podemos cambiar el lenguaje así para debug...
    //this.gtrans.setLanguage('es')
    //this.gtrans.setLanguage('en')
  },

  beforeMount(){
    this.getArtists();
  }
}
</script>

<style>

.banners{
  padding-bottom: 3%;
}
  @media(min-width: 720px) {
    .banner2{display:block;}
    .banner1{display:none;}
  }

  @media(max-width: 720px) {
    .banner2{display:none;}
    .banner1{display:block;}
  } 
</style>
