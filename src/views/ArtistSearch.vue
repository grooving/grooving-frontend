<template>
  <div id="searchMainWrapper" class="container-fluid">
    <div class="container">
      <div class="row">
        <div id="filtersDesktop" class="d-none d-lg-inline col-lg-4 col-xl-2">
          <FiltersSideMenu :simple_filters="simple_filters" :tristate_filters="tristate_filters" :selector_filters="selector_filters" @onFiltersChange="updateFilters" />
        </div>
        <div id="results" class="col-12 col-lg-8 col-xl-10" style="padding-left:0px; padding-right:0px;">
            <div id="resultsContainer" class="container-fluid mt-0">
              <ArtistList :artistas="datos_artistas" :listTitle="'Search Results'" />
            </div>
        </div>
      </div>
      <div id="floating-button" class="d-lg-none" @click="showFilterSelectionModal = !showFilterSelectionModal">
        <a href="#" class="floating-btn vertical-center">
          <i class="material-icons vertical-center">more_vert</i>
        </a>
      </div>
    </div>
    <FiltersModalMenu :simple_filters="simple_filters" :tristate_filters="tristate_filters" :selector_filters="selector_filters" v-if="showFilterSelectionModal" @onFiltersChange="updateFilters" @filterSelectionClose="toggleFilterSelectionModal()"/>
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
        simple_filters: [
            {id: 0, text: "Genre", filterName: "artisticGender", value: false},
            {id: 1, text: "Artist Name", filterName: "artisticName", value: true}
        ],
        tristate_filters: [
            {id: 0, text: "Score", filterName: "order", value: 0},
        ], 
        selector_filters:[
            {id: 0, text: "Zones", filterName: "zone", value: 0, data: [
              {id: 0, text: "España", value: "0", depth: 0},
              {id: 0, text: "Andalucia", value: "1", depth: 1},
              {id: 0, text: "Sevilla", value: "2", depth: 2}
            ]},
        ],
        showFilterSelectionModal: false,
        datos_artistas: Array(),
      }
  },

  methods: {

    toggleFilterSelectionModal: function (){
      this.showFilterSelectionModal = !this.showFilterSelectionModal;
    },

    updateFilters: function() {
      
      // Simple Filters
      // Either delete or ipdate route's query parameters to match 
      // the selected filters

      for(var i = 0; i < this.simple_filters.length; i++){
        var filter_item = this.simple_filters[i];
        if(filter_item.value)
          this.$route.query[filter_item.filterName] = document.getElementById('searchFormDesktop').value
        else
          delete this.$route.query[filter_item.filterName]
      }

      // TriState Filters

      for(var i = 0; i < this.tristate_filters.length; i++){
        var filter_item = this.tristate_filters[i];

        if(filter_item.value == 0)
          delete this.$route.query[filter_item.filterName];
        else if(filter_item.value == 1)
          this.$route.query[filter_item.filterName] = 'asc';
        else
          this.$route.query[filter_item.filterName] = 'desc';

      }

      // Selector Filters

      for(var i = 0; i < this.selector_filters.length; i++){
        var filter_item = this.selector_filters[i];

        if(filter_item.value)
          this.$route.query[filter_item.filterName] = filter_item.value;
        else
          delete this.$route.query[filter_item.filterName]
      }

      // Reset data
      this.datos_artistas = Array();
      this.search(this.$route.query);
    },

    search: function(queries){
      // Make the API call
      NProgress.start();
      GAxios.get(endpoints.artists, {
        params: queries
      })
      .then(response => {

        var artists = response.data.results;

        for(var i = 0; i < artists.length; i++){
          var genres = Array();

          for(var g = 0; g < artists[i].portfolio.artisticGender.length; g++){
            genres.push(artists[i].portfolio.artisticGender[g].name);
          }

          this.datos_artistas.push({
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

  props:{

    listTitle:{
      type: String,
      default: 'Search Results'
    },

  },

  beforeMount: function(){
    NProgress.start();
    // Check if we want to filter artists
    var queries = this.$route.query;

    // If either of the filers is set, we update their values
    this.simple_filters[0].value = queries[this.simple_filters[0].filterName] != undefined;
    this.simple_filters[1].value = queries[this.simple_filters[1].filterName] != undefined;

    // Obtain zones tree...
    GAxios.get(endpoints.zones, {
      params: {
        'tree': true
      }
    }).then(response => {

      var root = response.data;
      var tree = Array();

      tree.push({id:root['id'], text: root['name'], value: root['name'], depth: 0})

      for(var i=0; i < root['children'].length; i++){
        // For each Comunidad Autónoma
        var ca = root['children'][i];
        tree.push({id:ca['id'], text: ca['name'], value: ca['name'], depth: 1})

        for(var j=0; j < ca['children'].length; j++){
          // For each provincia
          var provincia = ca['children'][j];
          tree.push({id:provincia['id'], text: provincia['name'], value: provincia['name'], depth: 2})
        }
      }

      console.log(tree)

      this.selector_filters[0].data = tree;

      
    }).then(() => {
      NProgress.done()
    });

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

