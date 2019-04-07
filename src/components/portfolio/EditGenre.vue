<template>
    <div>
        
        <b-button v-for="(genre, index) in selectedGenres" v-bind:key="genre.id" v-bind:index="index" @click="deleteGenre(index)" class="btt">{{genre.name}}</b-button>
        
        <template v-if="add">
            <b-button @click="displaySelect" class="bttn">+</b-button>
        </template>

        <template v-if="select">
            <b-form>
                <b-form-select :select-size="1" v-model="newGenre" class="hi dropdown">
                <template slot="first">
                    <option disabled>-- Please select an option --</option>
                    <option v-for="genre in genres" v-bind:key="genre.id" :value="genre">{{genre.name}}</option>
                </template>
                
                </b-form-select>
                <b-button class="btt" type="button" variant="primary" 
                    v-model="newGenre" @click="addGenre()">Submit</b-button>
            </b-form>
        </template>
  </div>
</template>

<script>
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
        genres:[ 
        {
          id: 1,
          name: 'Art Punk',
        },
        {
          id: 2,
          name: 'Crust Punk',
        },
        {
          id: 3,
          name: 'College Rock'
        },
        {
          id: 4,
          name: 'Britpunk',
        },
        {
          id: 5,
          name: 'Alternative Rock',
        },
        {
          id: 6,
          name: 'Jazz'
        },
        {
          id: 7,
          name: 'Punk',
        },
        {
          id: 10,
          name: 'Rock',
        },
        {
          id:11,
          name: 'Pop'
        },
        {
          id: 12,
          name: 'Alternative',
        },
        {
          id: 8,
          name: 'Crust',
        },
        {
          id: 9,
          name: "Opera"
        }],
        selectedGenres: undefined,
        newGenre: null,
	  }
  },
  
  beforeUpdate() {
    this.genres = this.$store.getters.genres.allGenres;
    this.selectedGenres = this.$store.getters.genres.currentGenres;
    for (let i = 0; i < this.genres.length; i++) {
        for(let x = 0; x < this.selectedGenres.length; x++)
          if(this.genres[i].name == this.selectedGenres[x].name) {
              this.genres.splice(i,1);                    
          }
    }
  },
  beforeMount() {
    this.selectedGenres = this.$store.getters.genres.currentGenres;
  },
  methods: {
    ...mapActions(['setNewGenres']),
    deleteGenre(index) {
        this.genres.push(this.selectedGenres[index]);
        this.selectedGenres.splice(index,1);
        this.setNewGenres(this.selectedGenres);
    },

    addGenre(){
      if(this.newGenre !== null) {
        if(!this.selectedGenres.includes(this.newGenre)) {
            this.selectedGenres.push(this.newGenre);
        }
        
        for (let i = 0; i < this.genres.length; i++) {
            if (this.genres[i].name == this.newGenre.name) {
                this.genres.splice(i,1);
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


