<template>
  <div id="results" class="container-fluid ">
    <h1 v-if="parentZoneName != ''" class="titleView"><div class="hover" @click="back()"><i style="font-size: 30px;" class="material-icons">chevron_left</i> {{parentZoneName}}</div></h1>
    <h1 v-else class="titleViewNo">{{gtrans.translate('titleListZone')}}</h1>
    <p v-if="parentZoneName == ''" class="subtitleView">{{gtrans.translate('subtitleListZone_1')}}</p>
    <p v-else class="subtitleView">{{gtrans.translate('subtitleListZone_2')}}{{parentZoneName}}.</p>
    
    <div class="row tableContent">
      <div v-if="zones.length==0" class="emptyZones">
        <p>{{gtrans.translate('empyZone_1')}}{{parentZoneName}}{{gtrans.translate('empyZone_2')}}</p>
        <div @click="newZone" class="btn btn-primary editButton"><span class="hireText">{{gtrans.translate('createZone_1')}}</span></div>
      </div>

      <table v-else >
        <tr>
          <th >{{gtrans.translate('nameZone')}}</th>
          <th style="text-align:center;">{{gtrans.translate('optionsZone')}}</th>
        </tr>
        <tr v-for="zone in zones" :key="zone.id">
            <td class="rowWordBreak">
              <div style="display:inline-flex !important; vertical-align:top !important; ">
                <div v-if="zone.depth < 2" @click="viewChildren(zone.id)"  class="zoneLink"><span >{{zone.name}}</span><i class="material-icons">chevron_right</i></div>
                <div v-if="zone.depth == 2" class="zoneLinkNo">{{zone.name}}</div>
              </div>
            </td>
            
            <td>
              <div class="contentButtons">
                <div v-if="zone.depth != 0" @click="editZone(zone.id)" class="btn btn-primary editButton"><span class="hireText">{{gtrans.translate('editZone')}}</span></div>
                <div @click="deleteZone(zone.id)" class="btn btn-primary deleteButton"><span class="hireText">{{gtrans.translate('deleteZone')}}</span></div>
              </div>
            </td>
        </tr>
      </table>
    </div>
    <div style="margin-top: 30px; margin-bottom: 30px;">
      <div @click="newZone" v-if="zones.length!=0 && parentId > 0" class="btn btn-primary editButton sub"><span class="hireText">{{gtrans.translate('newZone')}}</span></div>
    </div>

  </div>
</template>

<script>

import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js";

export default {
  name: 'ZonesList',
  data: function(){
      return{
          gsecurity: GSecurity,
          gtrans: undefined,
      }
  },
  props:{
    parentZoneName:{
      type: String,
      default: ''
    },
    parentId:{
      type: Number,
    },
    grandParentZoneId:{
      type: Number,
      default: 0
    },
    ZoneBackLink:{
    },
    zones:{
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
  methods: {
    back() {
      this.$emit('viewPrevious', this.parentId);
    },
    editZone(zoneId) {
      this.$emit('editZone', zoneId);
    },
    deleteZone(zoneId) {
      this.$emit('deleteZone', zoneId);
    },
    newZone() {
      this.$emit('newZone', this.parentId);
    },
    viewChildren(zoneId) {
      this.$emit('viewChildren', zoneId);
    },

  },
    created() {
      // Retreive stored credentials
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

  .emptyZones{
    padding: 20px;
    width: 90%;
    margin-top: 10px;

  }

  .iconOffer{
    width: 30px !important;
    height: 30px !important;
    vertical-align: middle;
    margin-top: 5px;
  }

  .goBack {
    font-size: 17px;
    vertical-align: top;
    cursor: pointer;
  }
  
  .validationErrors{
    background-color:#f50057;
    border-radius: 5px;
    box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);      
    color:white;
    display: none;
    font-weight: bold;
    height: 100%;
    margin-bottom: 14px;
    padding: 10px;
    padding-top: 12px;
  }

  .hover:hover {
    color: #005999;
  }

  .zoneLink{
    display: inline-flex !important;
    vertical-align: top !important;
    width: 120px;
    font-size: 18px;
    color: #007bff;
    cursor: pointer;
  }

  .zoneLink:hover {
    color: #005999;
  }

  .zoneLinkNo{
    display: inline-flex !important;
    vertical-align: top !important;
    width: 120px;
    font-size: 18px;
  }

  .contentButtons{
    display:flex;
    justify-content: center;
    align-content: center;
  }

  .material-icons.md-24 { font-size: 24px; }

  .material-icons:hover {
      background: -webkit-linear-gradient(left, #000000, #000000);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      cursor: pointer;
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
    width: auto;
    padding-left: 35px;
  }

  .sub {
    width: 160px;
    cursor: pointer;
  }

  tr:nth-child(even) {
    background-color: #f0f0f0;
  }


  @media (min-width:768px)  {

    .emptyZones{
      box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
      border-radius: 10px;
      padding: 20px;
      width: 30%;
      margin-top: 20px;

    }
    .titleView{
      text-align: left;
      font-weight: bold;
      margin-left: 14%;
      margin-right: 25%;
      color: #007bff;
      cursor: pointer;
    }

    .titleViewNo{
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
      text-align: center;
      margin-right: 5%;
    }
  }

  .container-fluid{
    padding-top: 5%;
  }

  

</style>

