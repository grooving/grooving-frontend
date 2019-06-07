<template>

    <div class="content overlap ">
        <div class="card">
        <div class="bannerIcon">
            <img class="card-img-top banner" :src="artistBanner"/>
            <div class="card-img-overlay">
                <img class="profile_photo overBanner" src="@/assets/img/edit.png" @click="showBannerInput()"/>
             </div>
        </div>
        </div>
        <div class="card">
        <div class="artistIcon">
            <img class="card-img-top icon" :src="artistImage"/>
             <div class="card-img-overlay" style="top: -20px;">
                <img class="profile_photo"  src="@/assets/img/edit.png" @click="showPhotoInput()"/>
             </div>
        </div></div>
        <div >
            <div >
                <div >
        
                    <div class="inputForm">
                        <div v-if="this.editBanner" class="custom-file">
                            <input type="file" accept="image/*" class="custom-file-input"  @change="onFileChange('BANNER', $event)"
                            v-bind:placeholder="this.gtrans.translate('banner_placeholder')">
                            <label v-if="this.gtrans.getLanguage() == 'es'" class="custom-file-label labelES" for="customFile"></label>
                            <label v-else class="custom-file-label labelEN" for="customFile"></label>
                            <small class="form-text text-muted">
                                {{gtrans.translate('image_help')}}
                            </small>
                        </div> 
                    </div>

                    <div class="inputForm">
                        <div v-if="this.editPhoto" class="custom-file">
                            <input type="file" accept="image/*" class="custom-file-input"  @change="onFileChange('PROFILE', $event)"
                            v-bind:placeholder="this.gtrans.translate('profileImage_placeholder')">
                            <label v-if="this.gtrans.getLanguage() == 'es'" class="custom-file-label labelES" for="customFile"></label>
                            <label v-else class="custom-file-label labelEN" for="customFile"></label>
                            <small class="form-text text-muted">
                                {{gtrans.translate('image_help')}}
                            </small>
                        </div> 
                    </div>

                    
                </div>
            </div>
        </div>

        <div>
        </div>
    </div>
</template>

<script>
import GSecurity from "@/security/GSecurity.js"
import GTrans from "@/utils/GTrans.js"
import endpoints from '@/utils/endpoints.js';
import GAxios from '../utils/GAxios.js'

export default {
    name: "EditPhoto",
    props: {
        artistURI: {
            type: String,
            default: '#'
        },
        artistImage: {
            type: String,
            default: 'https://thefader-res.cloudinary.com/private_images/c_limit,w_1024/c_crop,h_481,w_924,x_0,y_99,f_auto,q_auto:eco/Charli-XCX-Pop2-Credit_Charlotte-Rutherford_aiuv0d/Charli-XCX-Pop2-Credit_Charlotte-Rutherford_aiuv0d.jpg',
        },
        artistBanner: {
            type: String,
            default: 'https://www.billboard.com/files/media/02-Charli-XCX-Elsewhere-Show-billboard-1548.jpg'
        },
        errors :{
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            gsecurity: GSecurity,
            gtrans: undefined,

            editPhoto: false,
            editBanner: false,
            newPhoto: undefined,
            newBanner: undefined,
            banner:'',
            image64: '',
            photo:'',

        }
    },
    methods: {
        
        img_get_url(file, ext, typeImg) {
           
            var reader = new FileReader();
            
            reader.onload = (e) => {
                var parentUrl = "";
                if (typeImg === "BANNER"){
                    parentUrl = this.$parent.d_portfolioBanner;
                }else{
                    parentUrl = this.$parent.d_portfolioMainPhoto;
                }
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
                this.imgtype = typeImg;
                this.oldUrl = parentUrl;
                
                var uri = '';
                uri = endpoints.uploadImage;
        
                GAxios.put(uri, {
                    
                    "imgData": this.image64,
                    "imgExtension":this.ext,
                    "oldUrl":this.oldUrl,
                    "type": this.imgtype,

                    }).then(response => {
                    
                        if (typeImg === "BANNER"){
                            this.$parent.d_portfolioBanner = response.data['imgUrl'];
                            this.toogleBannerInput(e);
                        }else{
                            this.$parent.d_portfolioMainPhoto = response.data['imgUrl'];
                            this.tooglePhotoInput(e);
                        }
                
                        this.artistBanner = response.data['imgUrl'];

                        console.log(response);
                    }).catch(ex => {
                        
                        this.$parent.errors = ex.response.data.error;
                        document.getElementById("errorsDiv").style.display = "block";
                        window.scrollTo(0,0);
                    }).then( () => {
                        NProgress.done();

                    })
                };}
                    reader.readAsDataURL(file);
                },
        onFileChange(typeImg, e) {
            
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                return;
            }   
    
            var fileName = files[0].name;
            
            let splittedFN = fileName.split(".");

            if(splittedFN.length > 1){
                this.ext= splittedFN[splittedFN.length - 1 ];
            }
            
            this.img_get_url(files[0], this.ext, typeImg);
            
            $('.custom-file-label').html(this.response);
            
        },


        showPhotoInput(){
            this.editPhoto = !this.editPhoto;
            event.preventDefault();
        }, 
        showBannerInput(){
            this.editBanner = !this.editBanner;
            event.preventDefault();
        }, 
        toogleBannerInput(event) {
            this.editBanner = false;
            event.preventDefault();
        },
        tooglePhotoInput(event) {
            this.editPhoto = false;
            event.preventDefault();
        }
    },

    created: function(){
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
    * {
        font-family: "Archivo"
    }
    .card {
        border: none;
    }

    .vertical-center{
        align-items: center;  /*Aligns vertically center */
        justify-content: center; /*Aligns horizontally center */
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
    .artistIcon{
        height: 75px;
    }

    .artistIcon img{
        border-radius: 100px;
        text-align: center;
        object-fit: cover;
        height: 8rem;
        width: 8rem;

        position: relative;
        z-index: 2;
        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .5);
        bottom: 65px;  

    }

    .content {
        margin-bottom: 20px;
    }

    .overBanner {
        background-color: grey; opacity:0.80; 
        cursor: pointer; 
        height: 50px !important;
        width: 50px !important;
        border-radius: 50%;
        float: right;
        top: 6rem;
        right: -0.5rem;
    }

    .bannerIcon img{
        width: 100%;
        object-fit: cover;
        height: 10rem;

        position: relative;
        z-index: 1;
        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .8);

    }
    .custom-file-label .form-control{
        color: #6c757d;
        font-weight: semibold;
        text-align: left;
    }

    .custom-file-input ~ .custom-file-label.labelES::after {
        content: "Buscar" !important;
    }

    .custom-file-input ~ .custom-file-label.labelEN::after {
        content: "Browse" !important;
    }

    #main_photo {
        color: #6c757d;
        font-weight: semibold;
        text-align: left;
    }
    .inputForm{
        margin-bottom: 10px;
        margin-left: 5%;
        margin-right: 5%;
    }

    input:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .3) !important;
    }

    input:focus{
        border-color: #00fb82 !important;
        font-weight: semibold;
        color:black;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        
    }

    .profile_photo {
      background-color: grey; opacity:0.80; 
      cursor: pointer; 
    }

    .rating span{
        font-size: 30px;
    }

    @media (min-width: 800px){

        .inputForm {
            margin-left:18%;
            margin-right:18%;
        }
        .artistIcon img{
            border-radius: 100px;
            text-align: center;
            object-fit: cover;
            height: 10rem;
            width: 10rem;
            position: relative;
            z-index: 2;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .5); 
            bottom: 80px;

        }

        .artistIcon{
            height: 100px;
        }

        .bannerIcon img{
            width: 100%;
            object-fit: cover;
            height: 20rem;

            position: relative;
            z-index: 1;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .8);

        }

    .overBanner {
        background-color: grey; opacity:0.85; 
        cursor: pointer; 
        height: 50px !important;
        width: 50px !important;
        float: right;
        top: 15rem;
        right: -0.5rem;
    }
        
    }


</style>
