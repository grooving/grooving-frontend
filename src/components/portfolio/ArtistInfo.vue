<template>
    <div class="content overlap">
        <div class="bannerIcon">
            <img class="card-img-top banner" :src="artistBanner"/>       
        </div>
        <div class="artistIcon">
            <img class="card-img-top icon" :src="artistImage"/>
        </div>
        <h1 style="font-weight: bold;">{{artistName}}</h1>
        <span class="card-text artistGenres">{{ genresToString() }}</span>
        <div>
            <router-link v-if="gsecurity.hasRole('CUSTOMER') || !gsecurity.isAuthenticated()" v-bind:to="hireURI" class="btn btn-primary hireButton"><span class="hireText">HIRE</span></router-link>
        </div>
        <div class="rating">

            <span class="ratingOK" v-if="artistRating >= 1">★</span>
            <span v-else>☆</span>
            
            <span class="ratingOK" v-if="artistRating >= 2">★</span>
            <span v-else>☆</span>
            
            <span class="ratingOK" v-if="artistRating >= 3">★</span>
            <span v-else>☆</span>
            
            <span class="ratingOK" v-if="artistRating >= 4">★</span>
            <span v-else>☆</span>
            
            <span class="ratingOK" v-if="artistRating >= 5">★</span>
            <span v-else>☆</span>
        </div>
        <div class="description">
            <p>{{artistDescription}}</p>
        </div>
    </div>
</template>

<script>
import GSecurity from "@/security/GSecurity.js";

const hiringBaseURI = '/hiringType/';
const registerURI = '/newUser/';

export default {
    name: "ArtistInfo",

    data: function() {
        return {
            gsecurity: GSecurity,
        };
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
        artistName: {
            type: String,
            default: 'Charli XCX'
        },
        artistGenres: {
            type: Array,
            default: function() { return ['Pop', 'PC Music', 'Alternative']}
        },
        artistBanner: {
            type: String,
            default: 'https://www.billboard.com/files/media/02-Charli-XCX-Elsewhere-Show-billboard-1548.jpg'
        },
        artistRating: {
            type: Number,
            default: 4
        },
        artistDescription: {
            type: String,
            default: "Charli XCX is a british singer known for her hits such as 'Vroom Vroom', 'Girls Night Out' or 'Taxi'."
        },
        artistId: {
            type: String,
        },
    },

    computed: {

        hireURI: function() {
            if (!this.gsecurity.isAuthenticated()) {
                return registerURI;
            } else if (this.gsecurity.hasRole('CUSTOMER')) {
                return hiringBaseURI + this.$props.artistId;
            }
        },
    },

    methods: {
        genresToString() {

            var res = "";
            var i = 0;

            for (i = 0; i < this.artistGenres.length; i++) { 
                if (i != this.artistGenres.length - 1) {
                    res += this.artistGenres[i].name + ", ";
                } else {
                    res += this.artistGenres[i].name;
                }
            }

            return res;
        }
    },

    created() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();
    },
}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

    .bannerIcon img{
        width: 100%;
        object-fit: cover;
        height: 10rem;

        position: relative;
        z-index: 1;
        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .8);

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

    h1{
        margin-bottom: 0rem !important;
    }

    .artistIcon{
        height: 75px;
    }

    .rating span{
        font-size: 30px;
    }
    
    .rating{
        margin-bottom: 5px;
    }
    .description p{
        word-break: break-all;
        margin-left: 3%;
        margin-right: 3%;
    }

    .ratingOK{
        background: -webkit-linear-gradient(#00fb82, #187fe6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

     .artistGenres {
            color: #187FE6;
            font-size: 18px;
    }

    .hireButton {
        font-size: 24px;
        font-weight:bold;
        
        border: none;
        border-radius: 30px;

        background-image: linear-gradient(to right, #00fb82, #187fe6);
        margin-top:10px;
        margin-bottom:10px;
    }

    .hireButton:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .hireText {
        padding: 0px 10px 0px 10px;
    }
    

    @media (min-width: 800px){
        .bannerIcon img{
            width: 100%;
            object-fit: cover;
            height: 20rem;

            position: relative;
            z-index: 1;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .8);

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

        .description p{
            word-break: break-all;
            margin-left: 20%;
            margin-right: 20%;
        }

       
        
    }


</style>
