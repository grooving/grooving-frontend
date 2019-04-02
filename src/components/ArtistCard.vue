<template>
    <div>
        <div class="card tarjeta">
            <router-link v-bind:to="artistURI"><img v-bind:src="artistImage" onerror="this.src='https://cdn.pixabay.com/photo/2016/02/19/11/36/microphone-1209816_960_720.jpg'" class="card-img-top artistImage" alt="Artist's Image"></router-link>
            <div class="card-body cuerpoTarjeta">
                <div class="leftContent">
                    <h5 class="card-title artistName">{{ artistName }}</h5>
                    <span class="card-text artistGenres">{{ genresToString() }}</span>
                </div>
                <div v-if="gsecurity.hasRole('CUSTOMER') || !gsecurity.isAuthenticated()" class="rightContent">
                    <router-link v-bind:to="hireURI" class="btn btn-primary hireButton"><span class="hireText">HIRE</span></router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GSecurity from '@/security/GSecurity.js';

export default {
    name: "ArtistCard",

    components: {

    },

    data: function(){
        return{
            gsecurity: GSecurity,
        }
    },

    computed: {
        hireURI: function() {
            if (!this.gsecurity.isAuthenticated()) {
                return 'newUser';
            } else if (this.gsecurity.hasRole('CUSTOMER')) {
                return 'makeOffer';
            }
        }
    },
    
    methods: {
        genresToString() {

            var res = "";
            var i = 0;

            for (i = 0; i < this.artistGenres.length; i++) { 
                if (i != this.artistGenres.length - 1) {
                    res += this.artistGenres[i] + ", ";
                } else {
                    res += this.artistGenres[i];
                }
            }

            return res;
        }
    },

    props: {
        artistURI: {
            type: String,
            default: '/showPortfolio'
        },
        artistImage: {
            type: String,
            default: 'https://img.europapress.es/fotoweb/fotonoticia_20181107115306_1920.jpg',
        },
        artistName: {
            type: String,
            default: 'ROSALÍA'
        },
        artistGenres: {
            type: Array,
            default: ['Pop', 'Flamenco']
        },
    },
}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

    .artistGenres {
        color: #187FE6;
        font-size: 18px;
    }

    .artistImage {
        object-fit: cover;
        height: 20rem;
        width: 100%;

        border-radius: 20px 20px 0px 0px;
    }

    .artistName {
        font-weight: bold;
        font-size: 2rem;
        word-break: break-word;
    }

    .cuerpoTarjeta {
        display: flex;
        align-items: center; 
    }

    .hireButton {
        font-size: 24px;
        font-weight:bold;
        
        border: none;
        border-radius: 30px;

        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .hireButton:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .hireText {
        padding: 0px 10px 0px 10px;
    }

    .leftContent {
        float: left;
        text-align: left;
        width: 65%;
    }

    .rightContent {
        float: right;
        text-align: center;
        padding-left: 20px;
    }

    .tarjeta {
        max-width: 400px;
        width: 95%;
        min-width: 290px;
        margin: 0 auto !important;
        border-radius: 20px;
        box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
    }

</style>
