<template>

    <div class="content overlap">
        <div class="bannerIcon">
            <img class="card-img-top banner" :src="artistBanner"/>
            <div class="card-img-overlay " id="overBanner">
                <img class="overBanner" src="@/assets/img/approved_tick.png" @click="showBannerInput()"/>
             </div>       
        </div>
        <div class="card">
        <div class="artistIcon">
            <img class="card-img-top icon" :src="artistImage"/>
             <div class="card-img-overlay" style="top: -20px;">
                <img class="profile_photo" src="@/assets/img/approved_tick.png" @click="showPhotoInput()"/>
             </div>
        </div></div>
        <div class="container-fluid horizontal-center">
            <div id="topContainer" class="row">
                <div class="col-sm-12 col-md-8 horizontal-center">
                    <div v-if='editBanner' class="inputForm ">
                        <input class="form-control inputBannerURL" type="text" id="inputBannerURL" 
                            placeholder="Add the URL of your new banner" :value="newBanner">
                    </div>
                    <div v-if='editPhoto' class="inputForm">
                        <input class="form-control inputPhotoURL" type="text" id="inputPhotoURL" 
                            placeholder="Add the URL of your new profile image" :value="newPhoto">
                    </div>

                    <div id="urlForm" class="row py-2" v-if="editPhoto">
                    <div class="col-12 vertical-center">
                        <input @keypress.enter="add()" type="text" v-model="newPhoto" class="form-control" 
                            placeholder="Add the URL of your new profile image" />
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

export default {
    name: "EditPhoto",
    props: {
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
            editPhoto: false,
            editBanner: false,
            newPhoto: undefined,
            newBanner: undefined,
        }
    },
    methods: {
        showPhotoInput(){
            this.editPhoto = true;
        }, 
        showBannerInput(){
            this.editBanner = true;
        }, 
    },

}
</script>

<style scoped>
    * {
        font-family: "Archivo"
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

    .overBanner {
        background-color: grey; opacity:0.85; 
        cursor: pointer; 
        height: 50px !important;
        width: 50px !important;
        top: 11.5rem;
        left: 0.7rem;
        float: right;
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
      background-color: grey; opacity:0.85; 
      cursor: pointer; 
    }

    .rating span{
        font-size: 30px;
    }
    
    
    

    @media (min-width: 800px){

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

        #overBanner {
            float:right;
            height: 50px;
            widows: 50px;
        }
        
    }


</style>
