<template>

    <div class="content overlap ">
        <div class="card">
        <div class="bannerIcon">
            <img class="card-img-top banner" :src="artistBanner"/>
            <div class="card-img-overlay" style="top: -20px;">
                <img class="profile_photo overBanner" src="@/assets/img/bin1.png" @click="showBannerInput()"/>
             </div>
        </div>
        </div>
        <div class="card">
        <div class="artistIcon">
            <img class="card-img-top icon" :src="artistImage"/>
             <div class="card-img-overlay" style="top: -20px;">
                <img class="profile_photo"  src="@/assets/img/bin1.png" @click="showPhotoInput()"/>
             </div>
        </div></div>
        <div >
            <div >
                <div >
                    <div v-if='editBanner' class="inputForm ">
                        <input @keypress.prevent="toogleBannerInput()" class="form-control" type="text"  
                            placeholder="Add the URL of your new banner" v-model="$parent.d_portfolioBanner">
                    </div>

                    <div class="inputForm" v-if="editPhoto">
                        <input @keypress.prevent="tooglePhotoInput()" type="text" v-model="$parent.d_portfolioMainPhoto" class="form-control" 
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
        toogleBannerInput() {
            this.editBanner = false;
        },
        tooglePhotoInput() {
            this.editPhoto = false;
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
