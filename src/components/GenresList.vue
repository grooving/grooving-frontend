<template>
  <div id="results" class="container-fluid px-0 mt-0">
    <h1 v-if="parentGenreName != ''" class="titleView"><router-link v-bind:to="genreBackLink.toString()"><i style="font-size: 30px;" class="material-icons">chevron_left</i> {{parentGenreName}}</router-link></h1>
    <h1 v-else class="titleView">Genres</h1>
    <p v-if="parentGenreName == ''" class="subtitleView">You can create, edit and delete genres supported by the system.</p>
    <p v-else class="subtitleView">This is the list of sub-genres for {{parentGenreName}}.</p>
    <div class="row tableContent">

      <div v-if="genres.length==0" class="emptyGenres">
        <p>There are any genres for this category. Create a new one?</p>
        <router-link v-bind:to="{name: 'createGenre', params: {parentGenreId, parentGenreName}}" class="btn btn-primary editButton"><span class="hireText">CREATE</span></router-link>
      </div>

      <table v-else>
        <col width="450">
        <col width="5">
        <tr>
          <th>NAME</th>
          <th style="text-align:center;">OPTIONS</th>
        </tr>
        <tr v-for="genre in genres">
            <td class="rowWordBreak">
              <div style="display:inline-flex !important; vertical-align:top !important">
                <router-link v-bind:to="genre.id.toString()"  class="genreLink" ><span>{{genre.name}}</span><i class="material-icons">chevron_right</i></router-link>
              </div>
            </td>
            
            <td>
              <div class="contentButtons">
                <router-link v-bind:to="{name: 'editGenre', params: {parentGenreId, parentGenreName, genre}}" class="btn btn-primary editButton"><span class="hireText">EDIT</span></router-link>
                <router-link v-bind:to="'deleteGenre'" class="btn btn-primary deleteButton"><span class="hireText">DELETE</span></router-link>
              </div>
            </td>
        </tr>
      </table>
    </div>
    <div style="margin-top: 30px; margin-bottom: 30px;">
      <router-link v-bind:to="{name: 'createGenre', params: {parentGenreId, parentGenreName}}" v-if="genres.length!=0" class="btn btn-primary editButton"><span class="hireText">NEW GENRE</span></router-link>
    </div>

  </div>
</template>

<script>

import GAxios from '@/utils/GAxios.js';

export default {
  name: 'GenresList',

  components: {
  },

  props:{

    listTitle:{
      type: String,
    },
    parentGenreName:{
      type: String,
      default: ''
    },
    parentGenreId:{
      type: Number,
    },
    grandParentGenreId:{
      type: Number,
      default: 0
    },
    genreBackLink:{
    },
    genres:{
      type: Array,
      default: [
        {name: 'Pop'},
        {name: 'Rock'},
        {name: 'Heavy Metal'},
        {name: 'Flamenco'}],
    }

  },
}

</script>

<style scoped>

  .emptyGenres{
    padding: 20px;
    width: 90%;
    margin-top: 10px;

  }

  .genreLink{
    display: inline-flex !important;
    vertical-align: top !important;
  }

  .contentButtons{
    display:flex;
    justify-content: center;
    align-content: center;
  }

  .editButton {
    font-size: 18px;
    font-weight:bold;
    color: white !important;
    margin-left: 5px;
    margin-right: 5px;
    border: none;
    border-radius: 30px;

    background-image: linear-gradient(to right, #00fb82, #187fe6);
  }

  .editButton:hover{
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.7) !important;
    background-image: linear-gradient(to right, #14ca9f, #1648d0) !important;
  }

  .deleteButton {
    font-size: 18px;
    font-weight:bold;
    color: white !important;
    margin-left: 5px;
    margin-right: 5px;
    border: none;
    border-radius: 30px;

    background-image: linear-gradient(to right, #FB8600, #FF0000);
  }

  .deleteButton:hover{
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.7) !important;
    background-image: linear-gradient(to right, #ED7F00, #A20101) !important;
  }

  .hireText {
    padding: 0px 10px 0px 10px;
    color: white !important;
  }

  .tableContent{
    display:flex;
    justify-content: center;
    align-content: center;
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
    
  }

  td, th {
    text-align: left;
    padding: 15px;
    padding-left: 35px;
    
  }

  .rowWordBreak{
    word-break: break-all;
  }

  tr:nth-child(even) {
    background-color: #f0f0f0;
  }


  @media (min-width:768px)  {

    .emptyGenres{
      box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
      border-radius: 10px;
      padding: 20px;
      width: 30%;
      margin-top: 20px;

    }
    .titleView{
      text-align: left;
      font-weight: bold;
      margin-left: 25%;
      margin-right: 25%;

    }

    .subtitleView{
      text-align: left;
      margin-left: 25%;
      margin-right: 25%;
    }

    table {
      margin-top: 10px;
      border-collapse: collapse;
      width: 100%;
      margin-left: 25%;
      margin-right: 25%;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
    }

   
  }

  @media (max-width: 768px){
    .titleView{
      text-align: left;
      font-weight: bold;
      margin-left: 5%;
      margin-right: 5%;

    }

    .subtitleView{
      text-align: left;
      margin-left: 5%;
      margin-right: 5%;
    }
  }

  .container-fluid{
    padding-top: 5%;
  }

  

</style>

