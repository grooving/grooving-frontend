<template>
    <div>
        
        <b-button v-for="(zone, index) in selectedZones" v-bind:key="zone.id" v-bind:index="index" @click="deleteZone(index)" class="btt">{{zone.name}}</b-button>
        
        <template v-if="add">
            <b-button @click="displaySelect" class="bttn">+</b-button>
        </template>
        
        <template v-if="select">
            <b-form>
                <b-form-select :select-size="1" v-model="newZone" class="hi dropdown">
                <template slot="first">
                    <option disabled>-- Please select an option --</option>
                    <option v-for="zone in zones" v-bind:key="zone.id" :value="zone">{{zone.name}}</option>
                </template>
              </b-form-select>
              <b-button class="btt" type="button" variant="primary" v-model="newZone" @click="addZone()">Submit</b-button>
            </b-form>
        </template>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import { mapGetters } from 'vuex';

export default {

  name: "EditZone",
  computed: mapGetters(['zones']),
  props: {
    zonesData: {
      type: Array,
      default: null,
    },
    selectedZonesData: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
        select:  false,
        add: true,
        zones:[ 
        {
          id: 1,
          name: 'Sevilla',
        },
        {
          id: 2,
          name: 'Andalucía',
        },
        {
          id: 3,
          name: 'Valencia'
        },
        {
          id: 4,
          name: 'Málaga',
        },],
        selectedZones: undefined,
        newZone: null,
	  }
  },
  
  beforeUpdate() {
    this.zones = this.$store.getters.zones.allZones;
    this.selectedZones = this.$store.getters.zones.currentZones;
    console.log('Todas las zonas' , this.zones)
    console.log('Zonas del artista' , this.selectedZones)

    for (let i = 0; i < this.zones.length; i++) {
      for(let x = 0; x < this.selectedZones.length; x++) {
        if(this.zones[i].name == this.selectedZones[x].name) {
            this.zones.splice(i,1);                    
        }
      }
    }
    
  },
  beforeMount() {
    this.selectedZones = this.$store.getters.zones.currentZones;
  },
  methods: {
    ...mapActions(['setNewZones']),
    deleteZone(index) {
        this.zones.push(this.selectedZones[index]);
        this.selectedZones.splice(index,1);
        this.setNewZones(this.selectedZones);
    },
    addZone(){
      if(this.newZone !== null) {
        if(!this.selectedZones.includes(this.newZone)) {
            this.selectedZones.push(this.newZone);
        }
        
        for (let i = 0; i < this.zones.length; i++) {
            if (this.zones[i].name == this.newZone.name) {
                this.zones.splice(i,1);
            }              
        }

        this.select = false;   
        this.add = true;   

        this.setNewZones(this.selectedZones);

        }

    },

    displaySelect() {
      this.select = true;
      this.add = false;
    },
  }
}


</script>

<style scoped>

.hi {
    width: fit-content;
    font-size: 18px;    
}

.btt, .bttn {
    background-color: #a2a2a2;
    border-radius: 7px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    outline: none;
    border-color: transparent;
    margin: 4px;
}

.bttn {
    border-radius: 50%;
}

select:hover{
    border-color: #187fe6;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .5) !important;
}

select:focus{
    border-color: #00fb82;
    font-weight: semibold;
    color:black;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
}

.cancelButton {
    font-size: 18px;
    border: none;
    border-radius: 30px;
    font-weight: bold;
}

.cancelButton {
    margin-right: 3%;        
    background-image: linear-gradient(to right, #a2a2a2, #474747);
}

.cancelButton:hover {
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
    background-image: linear-gradient(to right, #515151, #232323) !important;
}

</style>


