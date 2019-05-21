<template>
    <div>
        <h4 style="margin-bottom:0px;margin-top:10px;"><strong>{{gtrans.translate('artist_genre_title')}}</strong></h4>
        <b-button v-for="(genre, index) in selectedGenres" v-bind:key="genre.id" v-bind:index="index" @click="deleteGenre(index)" class="btt">{{genre.name}}</b-button>
        
        <template v-if="add">
            <b-button @click="displaySelect" class="bttn">+</b-button>
        </template>

        <template v-if="select">
            <b-form>
              <b-form-select v-model="newGenre" >
                  <option disabled>---- Add a new genre ----</option>
                  <option v-for="opt in tree" :key="opt.id" :value="opt">
                      <span v-for="times in opt.depth" :key="times">&nbsp;&nbsp;</span>
                      <span>{{opt.name}}</span>
                  </option>
              </b-form-select>
                <b-button class="btt" type="button" variant="primary" 
                    v-model="newGenre" @click="addGenre()">{{gtrans.translate('submit')}}</b-button>
            </b-form>
        </template>
  </div>
</template>

<script>
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js";
import {mapActions} from 'vuex';
import { mapGetters } from 'vuex';

export default {

  name: "EditGenre",
  computed: mapGetters(['genres']),
  props: {
    genresData: {
      type: Array,
      default: null,
    },
    selectedGenresData: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
        select:  false,
        add: true,
        genres: undefined,
        selectedGenres: undefined,
        newGenre: null,
        tree: Array(),
        gsecurity: GSecurity,
        gtrans: undefined,
	  }
  },
  
  beforeUpdate() {
    this.genres = this.$store.getters.genres.allGenres;
    this.selectedGenres = this.$store.getters.genres.currentGenres;
    console.log('Todas las genres' , this.genres)
    console.log('genres del artista' , this.selectedGenres)

    this.tree = Array();

    var all = this.genres;
    if(this.selectedGenres.length == 0 || this.selectedGenres[0].name != all.name) {
      this.tree.push({id:all['id'], name: all['name'], children:all['children'], depth: 0});

      if (this.genres.children != null) {
        var cat1 = this.genres.children;

        cat1loop:
        for (let a = 0; a < cat1.length; a++) {
          var c1 = cat1[a];
            for(let t = 0; t < this.selectedGenres.length; t++) {
              if(this.selectedGenres[t].name == c1.name) {
                continue cat1loop;
              }
            }
          this.tree.push({id:c1['id'], name: c1['name'], children:c1['children'], depth: 1});

          if(cat1[a].children != null) {
            var cat2 = cat1[a].children;

            cat2loop:
            for(let u = 0; u < cat2.length; u++) {
              var c2 = cat2[u];
              for(let p = 0; p < this.selectedGenres.length; p++) {
                if(this.selectedGenres[p].name == c2.name) {
                  continue cat2loop;
                }
              }
              this.tree.push({id:c2['id'], name: c2['name'], children:c2['children'], depth: 2});
            }
          }
        }
      }
    }
    console.log(this.tree)
  },
  beforeMount() {
    this.genres = this.$store.getters.genres.allGenres;
    this.selectedGenres = this.$store.getters.genres.currentGenres;
    console.log('Todas las genres' , this.genres)
    console.log('genres del artista' , this.selectedGenres)

    this.tree = Array();

    var all = this.genres;
    if(this.selectedGenres.length == 0 || this.selectedGenres[0].name != all.name) {
      this.tree.push({id:all['id'], name: all['name'], children:all['children'], depth: 0});

      if (this.genres.children != null) {
        var cat1 = this.genres.children;

        cat1loop:
        for (let a = 0; a < cat1.length; a++) {
          var c1 = cat1[a];
            for(let t = 0; t < this.selectedGenres.length; t++) {
              if(this.selectedGenres[t].name == c1.name) {
                continue cat1loop;
              }
            }
          this.tree.push({id:c1['id'], name: c1['name'], children:c1['children'], depth: 1});

          if(cat1[a].children != null) {
            var cat2 = cat1[a].children;

            cat2loop:
            for(let u = 0; u < cat2.length; u++) {
              var c2 = cat2[u];
              for(let p = 0; p < this.selectedGenres.length; p++) {
                if(this.selectedGenres[p].name == c2.name) {
                  continue cat2loop;
                }
              }
              this.tree.push({id:c2['id'], name: c2['name'], children:c2['children'], depth: 2});
            }
          }
        }
      }
    }
  },
  methods: {
    ...mapActions(['setNewGenres']),
    deleteGenre(index) {
        console.log('to delete',index)
        this.selectedGenres.splice(index,1);
        this.setNewGenres(this.selectedGenres);
    },

    addGenre(){
      if(this.newGenre !== null) {
        if(!this.selectedGenres.includes(this.newGenre)) {
            this.selectedGenres.push(this.newGenre);
        }

        if(this.newGenre.children != null) {
          var ch1 = this.newGenre.children;
          for(let i = 0; i < ch1.length; i++) {
            for(let y = 0; y < this.selectedGenres.length; y++) {
              if(ch1[i].name == this.selectedGenres[y].name) {
                this.selectedGenres.splice(y,1);
                break;
              }
            }
            if(ch1[i].children != null) {
              var ch2 = ch1[i].children;
              for(let x = 0; x < ch2.length; x++) {
                for(let z = 0; z < this.selectedGenres.length; z++) {
                  if(ch2[x].name == this.selectedGenres[z].name) {
                    this.selectedGenres.splice(z,1);
                    break;
                  }
                }
              }
            }
          }
        }

        this.select = false;   
        this.add = true;   

        this.setNewGenres(this.selectedGenres);

        }

    },

    displaySelect() {
      this.select = true;
      this.add = false;
    },
  },
  created() {
      this.gsecurity = GSecurity;
      this.gsecurity.obtainSavedCredentials();
      this.gtrans = new GTrans(this.gsecurity.getLanguage());
        
      // Podemos cambiar el lenguaje así para debug...
      //this.gtrans.setLanguage('es')
      //this.gtrans.setLanguage('en')
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

@media (max-width: 767px){
  select {
    margin: 0;
    width: 75%;
  }
}

@media (min-width: 768px){
  select {
    margin: 0;
    width: 25%;
  }
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


