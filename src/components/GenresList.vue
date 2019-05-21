<template>
  <div id="results" class="container-fluid">
    <h1 v-if="parentGenreName != ''" class="titleView"><router-link v-bind:to="genreBackLink.toString()"><i style="font-size: 30px;" class="material-icons">chevron_left</i> {{parentGenreName}}</router-link></h1>
    <h1 v-else class="titleView">{{gtrans.translate('genres_title')}}</h1>
    <p v-if="parentGenreName == ''" class="subtitleView">{{gtrans.translate('genres_subtitle')}}</p>
    <p v-else class="subtitleView">{{gtrans.translate('genres_subtitle_list')}} {{parentGenreName}}.</p>
    <div class="row tableContent">

      <div v-if="genres.length==0" class="emptyGenres">
        <p>{{gtrans.translate('genres_createMsg')}}</p>
        <router-link v-bind:to="{name: 'createGenre', params: {parentGenreId, parentGenreName}}" class="btn btn-primary editButton"><span class="hireText">{{gtrans.translate('genres_newGenre')}}</span></router-link>
      </div>

      <table v-else>
        <col width="450">
        <col width="5">
        <tr>
          <th>{{gtrans.translate('genres_name')}}</th>
          <th style="text-align:center;">{{gtrans.translate('genres_options')}}</th>
        </tr>
        <tr v-for="genre in genres">
            <td class="rowWordBreak">
              <div style="display:inline-flex !important; vertical-align:top !important">
                <router-link v-if="depth == 1" v-bind:to="'/manageGenres/'+genre.id.toString()"  class="genreLink" ><span>{{genre.name}}</span><i class="material-icons">chevron_right</i></router-link>
                <span v-else class="genreLink">{{genre.name}}</span>
              </div>
            </td>
            
            <td>
              <div class="contentButtons">
                <router-link v-bind:to="{name: 'editGenre', params: {parentGenreId, parentGenreName, genre}}" class="btn btn-primary editButton"><span class="hireText">{{gtrans.translate('genres_edit')}}</span></router-link>
                <router-link v-bind:to="{name: 'deleteGenre', params: {genre, parentGenreId}}" class="btn btn-primary deleteButton"><span class="hireText">{{gtrans.translate('genres_delete')}}</span></router-link>
              </div>
            </td>
        </tr>
      </table>
    </div>
    <div style="margin-top: 30px; margin-bottom: 30px;">
      <router-link v-bind:to="{name: 'createGenre', params: {parentGenreId, parentGenreName}}" v-if="genres.length!=0" class="btn btn-primary editButton"><span class="hireText">{{gtrans.translate('genres_newGenre')}}</span></router-link>
    </div>

  </div>
</template>

<script>

import GAxios from '@/utils/GAxios.js';
import GTrans from "@/utils/GTrans.js";
import GSecurity from '@/security/GSecurity.js';

export default {
  name: 'GenresList',

  data: function(){
    	return{
          gsecurity: undefined,
          gtrans: undefined,
    	}
    },

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
    },
    depth:{
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
  }

  .rowWordBreak{
    word-break: break-all;
    width: auto;
    padding-left: 35px;
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
      margin-left: 15%;
      margin-right: 25%;

    }

    .subtitleView{
      text-align: left;
      margin-left: 15%;
      margin-right: 25%;
    }

    table {
      margin-top: 10px;
      border-collapse: collapse;
      width: 100%;
      margin-left: 15%;
      margin-right: 15%;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
    }

   
  }

  @media (max-width: 768px){
    .titleView{
      text-align: left;
      font-weight: bold;
      margin-right: 5%;

    }

    .subtitleView{
      text-align: left;
      margin-right: 5%;
    }
  }

  .container-fluid{
    padding-top: 5%;
  }

  

</style>

