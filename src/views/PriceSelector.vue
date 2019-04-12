<template>
    <div class="hiringProcessContainer">
        <div class="title">
            <p>Choose the price</p>
        </div>
        <div class="everything">
            <div class="artistCard">
                <ArtistCard :artistName="this.artistData.artisticName" :artistImage="this.artistData.photo" 
                :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :price="price"/>
            </div>
            <div class="customPriceSelector">
                <div><CustomPrice @confirmPrice="confirmPrice" @priceSelected="priceValue" :duration="date.duration" :minPrice="cardPrice"  /></div>
            </div>
        </div>
    </div>
</template>

<script>
    import CustomPrice from '@/components/CustomPrice.vue'
    import ArtistCard from '@/components/makeOffer/ArtistCard.vue'
    import GSecurity from '@/security/GSecurity.js'
    import {mapActions} from 'vuex';
    import PaymentProcess from '@/store/modules/payment.js';



    export default {

        name: 'PriceSelector',
        
        components: {
            CustomPrice, ArtistCard
        },

        data: function() {
            return {

                //Hiring Process...
                gsecurity: GSecurity,
                artistId: -1,
                nextStep: undefined,
                hiringType: undefined,
                cardPrice: undefined,
                artistData: {
                    artistId: undefined,
                    artisticName: undefined,
                    photo: undefined,
                    genres: undefined,
                },

                date: {
                    date: undefined,
                    hour: undefined,
                    duration: undefined,
                },
                price: '',
            };
        },

        methods: {

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

        // The artist to whom the offer is created
        this.artistId = this.$route.params['artistId'];
        // The artistId saved in Vuex
        var vuexArtistId = this.$store.getters.offerArtist ? this.$store.getters.offerArtist.artistId : undefined;
        // Retrieve the type of hiring
        this.hiringType = this.$store.getters.offer.hiringType;

        // ###### SECURITY ACCESS CHECKS ###### 

        if(!this.$gsecurity.isAuthenticated()) {
            console.log('Error')
            this.$router.push({name: "error"});
        }

        if(!this.$gsecurity.hasRole('CUSTOMER')) {
            console.log("Error: You are not a customer so you can't hire an artist");
            this.$router.push({name: "error"});
        }

        if(!this.artistId || !vuexArtistId || this.artistId != vuexArtistId){
            console.log("Error: ArtistId not provided or VueX not matching URL");
            location.replace("/")
        }

        // Check the user does not access the view directly
        if(!PaymentProcess.checkViewRequirements(PaymentProcess.state, this.hiringType, "PriceSelector")){
            console.log('Error: Direct access to the view was detected')
            location.replace("/#/hiringType/" + this.artistId + "/")
        }

        // ###### END OF SECURITY ACCESS CHECKS ###### 

        },

        beforeMount() {

            // ###### VUEX RESTORE ###### 

            this.artistData = this.$store.getters.offerArtist;
            this.date = this.$store.getters.offerDate;

            // ###### END OF VUEX RESTORE ###### 
            

            // Obtenemos el precio de la tarjeta izq   
            if(this.hiringType && this.hiringType == 'CUSTOM')
                this.cardPrice = this.$store.getters.offerCustomPack.minimumPrice;

            // Actualizamos el siguiente paso
            if(this.hiringType == 'CUSTOM'){
                this.nextStep = '/addressInput/';
            }
            
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

    @media (max-width:767px) {

        .customPriceSelector{
            margin-top: 25px;
            margin-bottom: 55px;
        }
        
    }

    @media (min-width:768px)  {
        .artistImage{
            border-radius: 10px 10px 0px 0px;
        }
      
        .everything {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5%;
            text-align: center;
            padding: 15px;
            margin-left: 35%;
            margin-right: 35%;
            margin-top:0%;
        }

        .hiringProcessContainer{
            margin-bottom: 5%;
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
            margin-right: 12%;
            margin-left: 10%;
            text-align: left;
            font-size: 50px;
            margin-top: 5%;
            margin-bottom: 0%;

            font-weight: bold;
        }
    }
</style>
