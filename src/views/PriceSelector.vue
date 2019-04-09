<template>
    <div class="hell">
        <div class="title">
            <p>Choose the price</p>
        </div>
        <div class="everything">
            <div class="tarjeta">
                <router-link v-bind:to="artistURI"><img v-bind:src="artistImage" class="card-img-top artistImage" alt="Artist's Image"></router-link>
                <div class="card-body cuerpoTarjeta">
                    <div class="leftContent">
                        <h5 class="card-title artistName">{{ artistName }}</h5>
                        <span class="card-text artistGenres">{{ genresToString() }}</span>
                    </div>
                    <div class="rightContent">
                        <p class="price">{{ price }}€</p>
                    </div>
                </div>
            </div>
            <div>
                <div><CustomPrice @confirmPrice="confirmPrice" @priceSelected="priceValue" :duration="date.duration" :minPrice="minimumPrice"  /></div>
            </div>
        </div>
    </div>
</template>

<script>
    import CustomPrice from '@/components/CustomPrice.vue'
    import GSecurity from '@/security/GSecurity.js'
    import {mapActions} from 'vuex';


    export default {
        name: 'PriceSelector',
        
        components: {
            CustomPrice
        },

        data: function() {
            return {
                gsecurity: GSecurity,
                artistId: undefined,
                hiringType: undefined,
                artistData: {
                    artistId: undefined,
                    artisticName: undefined,
                    photo: undefined,
                    genres: undefined,
                },
                minimumPrice: undefined,
                date: {
                    date: undefined,
                    hour: undefined,
                    duration: undefined,
                },
                nextStep: undefined, 
                price: '',
            };
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
            },

            priceValue (value) {
                this.price = value;
            },

            ...mapActions(['setOfferPrice']),

            confirmPrice(){
                if(this.price){
                    this.setOfferPrice(this.price).then(() => {
                        // If VueX has correcty saved the price
                        this.$router.push(this.nextStep)
                    }).catch( e => {
                        console.log('Error: Could not set price in VueX');
                        console.log(e);
                    });
                }else{
                    alert('You must select a price...');
                }
            }
        },

        props: {
            artistURI: {
                type: String,
                default: '#'
            },
            artistImage: {
                type: String,
                default: 'http://www.tiumag.com/wp-content/uploads/rosalia-2018-2-705x564.jpg',
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

        created() {
            // Retreive store credentials
            this.gsecurity = GSecurity;
            this.gsecurity.obtainSavedCredentials();

            this.artistId = this.$route.params['artistId'];
            // Retrieve the type of hiring in order to ensure access permission
            this.hiringType = this.$store.getters.offer.hiringType;

            if(!this.gsecurity.hasRole('CUSTOMER')) {
                console.log("Error: You are not a customer so you can't hire an artist");
                location.replace("/#/*")
            }

            if(!this.artistId){
                console.log("Error: ArtistId not provided");
                location.replace("/")
            }

            var stepNumber;
            if(this.hiringType == 'CUSTOM'){
                stepNumber = 2;
                this.nextStep = '/addressInput/';
            }

            if(!this.hiringType || !PaymentProcess.checkStepRequirements(PaymentProcess.state, this.hiringType, stepNumber)){
                console.log('Error: Direct access to the view was detected')
                location.replace("/#/hiringType/" + this.artistId + "/")
            }
        },

        mounted() {

            this.artistData.artistId = this.$store.getters.offerArtist.artistId;
            this.artistData.artisticName = this.$store.getters.offerArtist.artisticName;
            this.artistData.photo = this.$store.getters.offerArtist.photo;
            this.artistData.genres = this.$store.getters.offerArtist.genres;
            
            this.date = this.$store.getters.offerDate;
            
            if(this.hiringType && this.hiringType == 'CUSTOM')
                this.minimumPrice = this.$store.getters.offerCustomPack.minimumPrice;
            console.log("minpri", this.minimumPrice)

            this.nextStep += this.artistId;

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
        word-wrap: break-word;
    }

    .artistImage {
        max-height: 200px;
        object-fit: cover;
    }

    .artistName {
        font-size: 32px;
        margin-bottom: 0px;
        padding-bottom: 0px;
        word-wrap: break-word;
    }

    .card-img-top {
      border-radius: 0px;
    }

    .cuerpoTarjeta {
        align-items: center;
        display: flex;
    }

    .leftContent {
        overflow: auto;
        text-align: left;
    }

    .price {
        color: #187FE6;
        font-size: 35px;
        margin-bottom: 0px;
    }

    .rightContent {
        margin-left: auto;
        margin-right: 0px;
        padding-left: 20px;
    }

    .tarjeta {
        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
        width: 100%;
    }

    .title {
        display: none;
    }

    @media (min-width:768px)  {
        .artistImage{
            border-radius: 10px 10px 0px 0px;
        }
      
        .everything {
            align-items: center;
            display: flex;
            justify-content: center;
            margin-left: 10%;
            margin-right: 10%;
            margin-top: 5%;
            padding: 15px;
            text-align: center;
        }

        .tarjeta {
            border-radius: 10px;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
            margin-right: 10px;
            min-width: 335px;
            width: 25%;
        }

        .title {
            display: inline-block;
            font-size: 50px;
            font-weight: bold;
            margin-bottom: 0%;
            margin-left: 10%;
            margin-right: 12%;
            margin-top: 5%;
            text-align: left;
        } 
    }
</style>
