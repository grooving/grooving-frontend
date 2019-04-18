<template>
 <div class="container-fluid horizontal-center">
    <div id="topContainer" class="row">
      <div class="col-sm-12 col-md-8 horizontal-center">
        <div id="titleAndAdd" class="row">
          <div id="titleContainer" class="col-8 vertical-center">
            <h3 class="title"><strong>Image Showcase</strong></h3>
          </div>
          <div id="buttonContainer" class="col-4 vertical-center">
            <button type="button" class="vertical-center addButton" @click="toggleImageURLInput">
              <i v-if="showAddURL" class="material-icons arrowIcon addURLButton">arrow_drop_down_circle</i>
              <i v-else class="material-icons arrowIcon addURLButton">add_circle</i>
            </button>
          </div>
        </div>
        <div id="urlForm" class="row py-2" v-if="showAddURL">
          <div class="col-12 vertical-center">
            <div class="form-group" style="width: inherit;">
              <div class="row">
                <input @keypress.enter="add($event)" type="url" v-model="addImageURL" class="form-control col-10" aria-describedby="imageCarouselInput" placeholder="Insert your URL Here..." />
                <button type="button" class="addElementButton col-2" @click="add($event)">
                  ADD
                </button>
              </div>
              <small :class="{'imageCarouselInput' : showImageCarouselInputErrors}" class="form-text text-muted">
                Must be a .png, .gif, .jpg or .jpeg link to an image.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="bottomContainer" class="row">
        <div id="owl-container" class="col-sm-12 col-md-8 horizontal-center">
          <div class="owl-wrapper">
            <OwlImageCarousel :photosInfo="d_photosInfo" :key="actualizador" @deleteImage="deleteCarouselImage" />
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import OwlImageCarousel from './OwlImageCarousel.vue';

export default {

  name: "EditImageCarousel",

  components:{
    OwlImageCarousel
  },

  data: function(){
    return{
      showAddURL: false,
      addImageURL: "",
      actualizador: 0,
      d_photosInfo: [],
      showImageCarouselInputErrors: false,
    }
  },

  methods: {

    deleteCarouselImage: function(id){
      this.d_photosInfo = this.d_photosInfo.filter(x => x.id != id);
      this.$parent.d_portfolioImages = this.d_photosInfo;

      this.actualizador++;
    },

    toggleImageURLInput: function(){
      this.showAddURL = !this.showAddURL;
    },

    add: function(event){

      if(this.addImageURL){

        if(this.addImageURL.endsWith('.png') || this.addImageURL.endsWith('.jpg') || this.addImageURL.endsWith('.jpeg') || this.addImageURL.endsWith('.gif')){
          this.showImageCarouselInputErrors = false;
          this.d_photosInfo.push({id: this.d_photosInfo.length, imageURL: this.addImageURL});
          this.$parent.d_portfolioImages = this.d_photosInfo;
          this.actualizador = this.actualizador + 1;

          this.addImageURL = '';
          this.toggleImageURLInput();
        }else{
          event.preventDefault();
          this.showImageCarouselInputErrors = true;
        }
      }else{
        event.preventDefault();
      }
    },

  },

  props: {
    photosInfo: {
      type: Array,
    }
  },

  created() {
    this.d_photosInfo = this.$props.photosInfo;
  }
}
</script>

<style scoped>
.addElementButton{
        width: 200px !important;
        color: white !important;
        font-weight: bold;
        border-radius: 0px 25px 25px 0px;
        text-align: center;
        align-content: center;

        font-size: 22px;
                
        border: none;


        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .addElementButton:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
    }


  .addURLButton{
    background: -webkit-linear-gradient(left, #00fb82, #187fe6);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    border: none;
    margin: 0 auto; 
    font-size: 55px
  }

  .addURLButton:hover{
    background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
  }

  .addButton{
    height:65px; 
    width:inherit; 
    background:none; 
    border:none;
  }

  .imageCarouselInput{
    color: #f50057 !important;
  }

  .horizontal-center{
    margin: 0 auto;
  }

  .title{
    text-align: left; 
    color: black; 
    margin: 0;
  }

  #topContainer{
    padding-bottom: 15px;
    margin-top: 45px;
  }

  .vertical-center{
    display: flex; 
    align-items: center;  /*Aligns vertically center */
  }

</style>


