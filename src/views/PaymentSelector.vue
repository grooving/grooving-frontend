<template>
<div class="prueba">
    <div class="title"><p>Select a payment method</p></div>
    <div v-if="errors === true" class="validationErrors">
        <p>Sorry! Something went wrong. Try again later.</p>
        <!--<p>Error en el numero</p>
        <p>Error en el mes</p>-->
    </div>
    <div class="everything"> 
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.main_photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :totalPrice="this.totalPrice"/>
        </div>
        <div class="paymentSelect">
          <div class="paymentOptions" style="min-width: 250px;"><PaymentOptions @paymentOptionSelected="paymentSelected()"/></div>
        </div>
    </div>
</div>
</template>

<script>
import PaymentOptions from '@/components/makeOffer/PaymentOptions.vue'
import ArtistCard from '@/components/makeOffer/ArtistCard.vue'
import GSecurity from '@/security/GSecurity.js';
import { mapGetters } from 'vuex';

export default {
    name: 'PaymentSelector',
    computed: mapGetters(['offerArtist', 'offer']),
    components: {
        PaymentOptions, ArtistCard
    },
    data() {
        return {
            artistData: {
                artistId: undefined,
                artisticName: undefined,
                main_photo: undefined,
                genres: undefined,
            },
            gsecurity: GSecurity,
            totalPrice: undefined,
            address: undefined,
            nextStep: undefined,
        }
    },
    methods: {
        paymentSelected(){
            this.$emit('paymentSelected');
        }
    },
    created() {
        // Retreive store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();
    },
    mounted() {
        this.artistData.artistId = this.$store.getters.offerArtist.artistId;
        this.artistData.artisticName = this.$store.getters.offerArtist.artisticName;
        this.artistData.main_photo = this.$store.getters.offerArtist.main_photo;
        this.artistData.genres = this.$store.getters.offerArtist.genres;

        this.totalPrice = this.$store.getters.offer.totalPrice;
        this.address = this.$store.getters.offerAddress.location;

        this.nextStep = '/payment/' + this.artistData.artistId;

        if(!this.$gsecurity.hasRole('CUSTOMER') || this.artistData.artistId != this.$route.params['artistId'] 
            || !this.address) {
                
            console.log('Error')
            location.replace("/#/*")
        }
    },

}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

    .title {
        display: none;
    }

    @media (max-width:767px)  {
        .validationErrors{
            background-color:#f50057;
            box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);
            
            color:white;
            font-weight: bold;
            height: 100%;
            padding-top: 5%;
        } 
  
    }

    @media (min-width:768px)  {
      
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
        .title {
            display: inline-block;
            margin-left: 18%;
            text-align: left;
            font-size: 50px;
            margin-top: 5%;
            margin-bottom: 0%;
            margin-left: 1px;
            font-weight: bold;
        }
        .validationErrors{
            padding-top: 10px;
            padding-bottom: 0.25px;
            color: #c62828;
            font-weight: semibold;
            border-color: green;
            width: 50%;
            margin: 0 auto;
            height: auto;
            border-radius: 5px;
            align-items: center;
            text-align: center;
            box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .5);
        }        
    }

</style>
