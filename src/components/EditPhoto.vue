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
                <input type="file" accept="image/*" class="custom-file-input" id="customFile" @change="onFileChange">
                <img class="profile_photo"  src="@/assets/img/edit.png" @click="onFileChange()"/>
             </div>
        </div></div>
        <div >
            <div >
                <div >
                    <div v-if='editBanner' class="inputForm ">
                        <input @keypress.enter="toogleBannerInput($event)" class="form-control" type="url"  
                            placeholder="Add the URL of your new banner" v-model="$parent.d_portfolioBanner">
                    </div>

                    <div class="inputForm" v-if="editPhoto">
                        <input @keypress.enter="tooglePhotoInput($event)" type="url" v-model="$parent.d_portfolioMainPhoto" class="form-control" 
                            placeholder="Add the URL of your new profile image" />
                    </div>
                </div>
            </div>
        </div>

        <div>
        </div>
    </div>
</template>

<script>
import endpoints from '@/utils/endpoints.js';
import GAxios from '../utils/GAxios.js';
import GSecurity from "@/security/GSecurity.js";
import GImage from '@/utils/GImage.js';

export default {
    name: "EditPhoto",

    data() {
        return {
            gaxios: GAxios,
            gsecurity: GSecurity,
            gimage: undefined,

            editPhoto: false,
            editBanner: false,
            newPhoto: undefined,
            newBanner: undefined,
        }
    },

    methods: {
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            console.log('VM :', vm)

            reader.onload = (e) => {
                vm.image = e.target.result;

                this.gimage = new GImage(vm.image, 'PROFILE');
                let imageRequestBody = this.gimage.getRequestBody();

                this.gaxios.put(endpoints.image).then(x => {
                    console.log(x);
                }).catch(x => {
                    console.log(x);
                });


            };
            reader.readAsDataURL(file);
        },

        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                return;
            }
            this.createImage(files[0]);
            var fileName = files[0].name;
            $('.custom-file-label').html(fileName);
        },

        showPhotoInput(){
            this.editPhoto = true;
        }, 
        showBannerInput(){
            this.editBanner = true;
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
