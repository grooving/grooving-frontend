<template>
    <div>
        
        <b-button v-for="(zone, index) in selectedZones" v-bind:key="zone.id" v-bind:index="index" @click="deleteZone(index)" class="btt">{{zone.name}}</b-button>
        
        <template v-if="add">
            <b-button @click="displaySelect" class="bttn">+</b-button>
        </template>
        
        <template v-if="select">
            <b-form>
              <b-form-select v-model="newZone" style="width:90%; margin:0 auto;" >
                  <option :value="undefined">---------</option>
                  <option v-for="opt in tree" :key="opt.id" :value="opt">
                      <span v-for="times in opt.depth" :key="times">&nbsp;&nbsp;</span>
                      <span>{{opt.name}}</span>
                  </option>
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
        zones:undefined,
        selectedZones: undefined,
        newZone: null,
        tree: Array(),
	  }
  },
  
  beforeUpdate() {

    this.zones = this.$store.getters.zones.allZones;
    this.selectedZones = this.$store.getters.zones.currentZones;
    console.log('Todas las zonas' , this.zones)
    console.log('Zonas del artista' , this.selectedZones)

    this.tree = Array();

    var pais = this.zones;
    if(this.selectedZones.length == 0 || this.selectedZones[0].name != pais.name) {
      this.tree.push({id:pais['id'], name: pais['name'], children:pais['children'], depth: 0});

      if (this.zones.children != null) {
        var comunidades = this.zones.children;

        caloop:
        for (let a = 0; a < comunidades.length; a++) {
          var comunidad = comunidades[a];
            for(let t = 0; t < this.selectedZones.length; t++) {
              if(this.selectedZones[t].name == comunidad.name) {
                continue caloop;
              }
            }
          this.tree.push({id:comunidad['id'], name: comunidad['name'], children:comunidad['children'], depth: 1});

          if(comunidades[a].children != null) {
            var provincias = comunidades[a].children;

            provloop:
            for(let u = 0; u < provincias.length; u++) {
              var provincia = provincias[u];
              for(let p = 0; p < this.selectedZones.length; p++) {
                if(this.selectedZones[p].name == provincia.name) {
                  continue provloop;
                }
              }
              this.tree.push({id:provincia['id'], name: provincia['name'], children:provincia['children'], depth: 2});
            }
          }
        }
      }
    }
    console.log(this.tree)
    
  },
  beforeMount() {
    this.selectedZones = this.$store.getters.zones.currentZones;
  },
  methods: {
    ...mapActions(['setNewZones']),
    deleteZone(index) {
        this.selectedZones.splice(index,1);
        this.setNewZones(this.selectedZones);
    },
    addZone(){
      if(this.newZone !== null) {
        if(!this.selectedZones.includes(this.newZone)) {
            this.selectedZones.push(this.newZone);
        }

        if(this.newZone.children != null) {
          var ch1 = this.newZone.children;
          for(let i = 0; i < ch1.length; i++) {
            for(let y = 0; y < this.selectedZones.length; y++) {
              if(ch1[i].name == this.selectedZones[y].name) {
                this.selectedZones.splice(y,1);
                break;
              }
            }
            if(ch1[i].children != null) {
              var ch2 = ch1[i].children;
              for(let x = 0; x < ch2.length; x++) {
                for(let z = 0; z < this.selectedZones.length; z++) {
                  if(ch2[x].name == this.selectedZones[z].name) {
                    this.selectedZones.splice(z,1);
                    break;
                  }
                }
              }
            }
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


