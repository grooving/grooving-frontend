<template>
 <div class="container-fluid horizontal-center">
    <div id="topContainer" class="row">
      <div class="col-sm-12 col-md-8 horizontal-center">
        <div id="titleAndAdd" class="row">
          <div id="titleContainer" class="col-8 vertical-center">
            <h3 class="titleCarousel"><strong>{{gtrans.translate('artist_images')}}</strong></h3>
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
                <input @change="onFileChange($event)" type="file" id="customFile" class="custom-file-input" aria-describedby="imageCarouselInput"  v-bind:placeholder="this.gtrans.translate('image_placeholder')" />
                <label v-if="this.gtrans.getLanguage() == 'es'" class="custom-file-label labelES" for="customFile"></label>
                <label v-else class="custom-file-label labelEN" for="customFile"></label>
              </div>
              <small :class="{'imageCarouselInput' : showImageCarouselInputErrors}" class="form-text text-muted">
                {{gtrans.translate('image_help')}}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="bottomContainer" class="row">
      <div class="owl-wrapper horizontal-center">
        <div class="col-sm-12 col-md-8 horizontal-center">
          <OwlImageCarousel :photosInfo="d_photosInfo" :key="actualizador" :mode="'edit'" @actionImageTrigger="deleteCarouselImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OwlImageCarousel from './OwlImageCarousel.vue';
import GSecurity from "@/security/GSecurity.js"
import GTrans from "@/utils/GTrans.js"
import endpoints from '@/utils/endpoints.js';
import GAxios from '@/utils/GAxios.js'

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
      gsecurity: GSecurity,
      gtrans: undefined,
    }
  },

  methods: {

    img_get_url(file, ext) {
           
            var reader = new FileReader();
            
            reader.onload = (e) => {
                NProgress.start()
                this.photo = e.target.result;
                this.image64 = this.photo.split("base64,")[1];
                
                if(this.image64.length>=1995000){
                  
                  this.$parent.errors = this.gtrans.translate('customerRegister_photoMaxSize');
                  
                  document.getElementById("errorsDiv").style.display = "block";
                  
                  window.scrollTo(0,0);
           
                  NProgress.done();
                }
                else{
                this.ext = ext;
                this.imgtype = "CAROUSEL";
                
                var uri = '';
                uri = endpoints.uploadImage;
                GAxios.put(uri, {
                    
                    "imgData": this.image64,
                    "imgExtension":this.ext,
                    "oldUrl": null,
                    "type": this.imgtype,

                    }).then(response => {
                        this.addImageURL = response.data['imgUrl'];
                        this.add(e)
                        console.log(response);
                    }).catch(ex => {
                        
                        this.errors = ex.response.data.error;
                        document.getElementById("errorsDiv").style.display = "block";
                        window.scrollTo(0,0);
                    }).then( () => {
                        NProgress.done();

                    })
                };}
                    reader.readAsDataURL(file);
                    
                },
        onFileChange(e) {
            
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                return;
            }   
    
            var fileName = files[0].name;
            
            this.ext= fileName.split(".")[1];
            
            this.img_get_url(files[0], this.ext);
            
            //$('.custom-file-label').html(this.response);
            
        },

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
    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();

    this.gtrans = new GTrans(this.gsecurity.getLanguage());
    
    // Podemos cambiar el lenguaje así para debug...
    //this.gtrans.setLanguage('es')
    //this.gtrans.setLanguage('en')
    this.d_photosInfo = this.$props.photosInfo;
  }
}
</script>

<style scoped>
.addElementButton{
        min-width: 100px !important;
        color: white !important;
        font-weight: bold;
        border-radius: 0px 25px 25px 0px;
        text-align: center;
        align-content: center;
        padding: 0px;
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
  .custom-file-input ~ .custom-file-label.labelES::after {
        content: "Buscar" !important;
    }

  .custom-file-input ~ .custom-file-label.labelEN::after {
        content: "Browse" !important;
    }
  .imageCarouselInput{
    color: #f50057 !important;
  }

  .custom-file-label .form-control{
        color: #6c757d;
        font-weight: semibold;
        text-align: left;
    }
  .horizontal-center{
    margin: 0 auto;
  }

  .titleCarousel{
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


