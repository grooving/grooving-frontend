<template>
  <div id="results" class="container-fluid px-0 mt-0">
    <h1 v-if="parentZoneName != ''" class="titleView"><router-link v-bind:to="zoneBackLink.toString()"><i style="font-size: 30px;" class="material-icons">chevron_left</i> {{parentZoneName}}</router-link></h1>
    <h1 v-else class="titleView">Genres</h1>
    <p v-if="parentZoneName == ''" class="subtitleView">You can create, edit and delete zones supported by the system.</p>
    <p v-else class="subtitleView">This is the list of sub-zones for {{parentZoneName}}.</p>
    
    <div class="row tableContent">
      <div class="back" v-if="parentId > 0" @click="back()"><i class="material-icons arrowIcon arrow">arrow_back</i><span class="goBack">Go Back</span></div>
      <div v-if="zones.length==0" class="emptyZones">
        <p>There are any zones for this category. Create a new one?</p>
        <router-link v-bind:to="{name: 'createZone', params: {parentId, parentZoneName}}" class="btn btn-primary editButton"><span class="hireText">CREATE</span></router-link>
      </div>

      <table v-else>
        <col width="450">
        <col width="5">
        <tr>
          <th>NAME</th>
          <th style="text-align:center;">OPTIONS</th>
        </tr>
        <tr v-for="zone in zones" :key="zone.id">
            <td class="rowWordBreak">
              <div style="display:inline-flex !important; vertical-align:top !important">
                <router-link v-if="depth == 1" v-bind:to="zone.id.toString()"  class="genreLink" ><span>{{zone.name}}</span><i class="material-icons">chevron_right</i></router-link>
                <span v-else class="zoneLink">{{zone.name}}</span>
              </div>
            </td>
            
            <td>
              <div class="contentButtons">
                <div v-if="zone.depth != 2" @click="viewChildren(zone.id)" class="btn btn-primary editButton sub"><span class="hireText">SUB-ZONES</span></div>
                <div class="edit" @click="editZone(zone.id)"><i class="material-icons iconOffer">edit</i></div>
                <div class="delete" @click="deleteZone(zone.id)"><i class="material-icons iconOffer">delete</i></div>
                <!-- <router-link v-bind:to="{name: 'editZone', params: {parentZoneId, parentZoneName, zone}}" class="btn btn-primary editButton"><span class="hireText">EDIT</span></router-link>
                <router-link v-bind:to="{name: 'deleteZone', params: {zone, parentZoneId}}" class="btn btn-primary deleteButton"><span class="hireText">DELETE</span></router-link> -->
              </div>
            </td>
        </tr>
      </table>
    </div>
    <div style="margin-top: 30px; margin-bottom: 30px;">
      <div @click="newZone" v-if="zones.length!=0 && parentId > 0" class="btn btn-primary editButton sub"><span class="hireText">NEW ZONE</span></div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'ZonesList',
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

  .zoneLink{
    display: inline-flex !important;
    vertical-align: top !important;
    width: 80px;
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
    padding-left: 35px;
    
  }

  .rowWordBreak{
    word-break: break-all;
  }

  .sub {
    width: 150px;
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

