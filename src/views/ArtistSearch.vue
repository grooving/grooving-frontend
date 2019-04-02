<template>
  <div id="searchMainWrapper" class="container-fluid">
    <div class="container">
      <div class="row">
        <div id="filtersDesktop" class="d-none d-lg-inline col-lg-4 col-xl-2">
          <FiltersSideMenu :filters_data="filter_parameters" @onFiltersChange="updateFilters" />
        </div>
        <div id="results" class="col-12 col-lg-8 col-xl-10" style="padding-left:0px; padding-right:0px;">
            <div id="resultsContainer" class="container-fluid">
              <ArtistList :artistas="datos" />
            </div>
        </div>
      </div>
      <div id="floating-button" class="d-lg-none" @click="showFilterSelectionModal = !showFilterSelectionModal">
        <a href="#" class="floating-btn vertical-center">
          <i class="material-icons vertical-center">more_vert</i>
        </a>
      </div>
    </div>
    <FiltersModalMenu :filters_data="filter_parameters" v-if="showFilterSelectionModal" @onFiltersChange="updateFilters" @filterSelectionClose="toggleFilterSelectionModal()"/>
  </div>
</template>

<script>

import FiltersSideMenu from '@/components/menus/FiltersSideMenu.vue';
import FiltersModalMenu from '@/components/menus/FiltersModalMenu.vue';
import ArtistList from '@/components/ArtistList.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';

const showPortfolioBaseURI = '/showPortfolio/';
const hiringBaseURI = '/makeOffer/';

export default {
  name: 'ArtistSearch',

  components: {
    FiltersSideMenu,
    FiltersModalMenu,
    ArtistList,
  },

  data: function(){
    return {
        filter_parameters: [
            {id: 0, text: "Genre", filterName: "artisticGender", selected: false},
            {id: 1, text: "Artist Name", filterName: "artisticName", selected: true}
        ], 
        showFilterSelectionModal: false,
        datos: Array(),
      }
  },

  methods: {

    toggleFilterSelectionModal: function (){
      this.showFilterSelectionModal = !this.showFilterSelectionModal;
    },

    updateFilters: function() {
      var selected = Array();

      for(var i = 0; i < arguments[0].length; i++){
        selected.push(arguments[0][i]);
      }

      for(var j = 0; j < this.filter_parameters.length; j++){
        if(selected.includes(this.filter_parameters[j].id)){
          this.filter_parameters[j].selected = true;
          this.$route.query[this.filter_parameters[j].filterName] = document.getElementById('searchFormDesktop').value
        }else{
          delete this.$route.query[this.filter_parameters[j].filterName]
        }
      }

      this.datos = Array();
      this.search(this.$route.query);
    },

    search: function(queries){
      // Make the API call
      GAxios.get(endpoints.artists, {
        params: {
          ...(queries[this.filter_parameters[0].filterName] != undefined ? { "artisticGender": queries[this.filter_parameters[0].filterName]} : {}),
          ...(queries[this.filter_parameters[1].filterName] != undefined ? { "artisticName": queries[this.filter_parameters[1].filterName] } : {})
        }
      })
      .then(response => {

        var artists = response.data.results;

        for(var i = 0; i < artists.length; i++){
          var genres = Array();

          for(var g = 0; g < artists[i].portfolio.artisticGender.length; g++){
            genres.push(artists[i].portfolio.artisticGender[g].name);
          }

          this.datos.push({
            artistURI: showPortfolioBaseURI + artists[i].id, 
            artistImage: artists[i].photo,
            artistName: artists[i].portfolio.artisticName,
            artistGenres: genres,
            hireURI: hiringBaseURI + artists[i].id,
          });

        }
      }).catch(ex => {
          console.log(ex);
      });
    }
  },

  props:{

    listTitle:{
      type: String,
      default: 'Search Results'
    },

  },

  mounted: function(){
    // Check if we want to filter artists
    var queries = this.$route.query;

    // If either of the filers is set, we update their values
    this.filter_parameters[0].selected = queries[this.filter_parameters[0].filterName] != undefined;
    this.filter_parameters[1].selected = queries[this.filter_parameters[1].filterName] != undefined;

    this.search(queries);
  },
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

  .hidden {
    display: none;
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

  .floating-btn{
    position:fixed;
    width:60px;
    height:60px;
    bottom:40px;
    right:40px;
    z-index: 10;
    background-image: linear-gradient(to right, #00fb82, #187fe6);
    color:#FFF;
    border-radius:50px;
    text-align:center;
    box-shadow: 2px 2px 3px #999;
    text-decoration:none;
    
  }

  .floating-btn:hover{
    background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
  }

  .vertical-center{
    display: flex; 
    align-items: center;  /*Aligns vertically center */
    justify-content: center; /*Aligns horizontally center */
  }

</style>
