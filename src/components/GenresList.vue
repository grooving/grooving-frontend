<template>
  <div id="results" class="container-fluid px-0 mt-0">
    <h1 class="titleView">Genres</h1>
    <p class="subtitleView">You can create, edit and delete genres supported by the system.</p>
    <div class="row tableContent">
      <table>
        <col width="450">
        <col width="5">
        <tr>
          <th>NAME</th>
          <th style="text-align:center;">OPTIONS</th>
        </tr>
        <tr>
          <td class="rowWordBreak">
            <div style="display:inline-flex !important; vertical-align:top !important">
              <a  class="genreLink" href="www.google.es"><span>Pop</span><i class="material-icons">chevron_right</i></a>
            </div>
          </td>
          <td>
            <div class="contentButtons">
              <a class="btn btn-primary editButton"><span class="hireText">EDIT</span></a>
              <a class="btn btn-primary deleteButton"><span class="hireText">DELETE</span></a>
            </div>
          </td>
        </tr>
        <tr>
          <td class="rowWordBreak">
            <div style="display:inline-flex !important; vertical-align:top !important">
              <a class="genreLink" href="www.google.es"><span>Rock</span><i class="material-icons">chevron_right</i></a>
            </div>
          </td>
          <td>
            <div class="contentButtons">
              <a class="btn btn-primary editButton"><span class="hireText">EDIT</span></a>
              <a class="btn btn-primary deleteButton"><span class="hireText">DELETE</span></a>
            </div>
          </td>
        </tr>
        <tr>
          <td class="rowWordBreak">
            <div style="display:inline-flex !important; vertical-align:top !important">
              <a class="genreLink" href="www.google.es"><span>Heavy Metal</span><i class="material-icons">chevron_right</i></a>
            </div>
          </td>
          <td>
            <div class="contentButtons">
              <a class="btn btn-primary editButton"><span class="hireText">EDIT</span></a>
              <a class="btn btn-primary deleteButton"><span class="hireText">DELETE</span></a>
            </div>
          </td>
        </tr>
        <tr>
          <td class="rowWordBreak">
            <div style="display:inline-flex !important; vertical-align:top !important">
              <a class="genreLink" href="www.google.es"><span>PC Music</span><i class="material-icons">chevron_right</i></a>
            </div>
          </td>
          <td>
            <div class="contentButtons">
              <a class="btn btn-primary editButton"><span class="hireText">EDIT</span></a>
              <a class="btn btn-primary deleteButton"><span class="hireText">DELETE</span></a>
            </div>
          </td>
        </tr>
        <tr>
          <td class="rowWordBreak">
            <div style="display:inline-flex !important; vertical-align:top !important">
              <a class="genreLink" href="www.google.es"><span>Indie</span><i class="material-icons">chevron_right</i></a>
            </div>
          </td>
          <td>
            <div class="contentButtons">
              <a class="btn btn-primary editButton"><span class="hireText">EDIT</span></a>
              <a class="btn btn-primary deleteButton"><span class="hireText">DELETE</span></a>
            </div>
          </td>
        </tr>
        <tr>
          <td class="rowWordBreak">
            <div style="display:inline-flex !important; vertical-align:top !important">
              <a class="genreLink" href="www.google.es"><span>Flamenco</span><i class="material-icons">chevron_right</i></a>
            </div>
          </td>
          <td>
            <div class="contentButtons">
              <a class="btn btn-primary editButton"><span class="hireText">EDIT</span></a>
              <a class="btn btn-primary deleteButton"><span class="hireText">DELETE</span></a>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

import GAxios from '@/utils/GAxios.js';

export default {
  name: 'ArtistsList',

  components: {
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
}

</script>

<style scoped>

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

