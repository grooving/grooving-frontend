<template>
<div class="prueba">
    <div class="title"><p>{{gtrans.translate('sentOffer_msg')}}</p></div>
    
    <div class="everything">
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :totalPrice="this.cardPrice"/>
        </div>
        <div class="sentOffer" style="min-width: 320px "><PaymentNotif/></div>

    </div>
</div>
</template>

<script>
import PaymentNotif from '@/components/PaymentNotif.vue'
import ArtistCard from '@/components/makeOffer/ArtistCard.vue'
import GSecurity from '@/security/GSecurity.js';
import {mapActions} from 'vuex';
import { mapGetters } from 'vuex';
import GTrans from "@/utils/GTrans.js";

export default {
    name: 'SentOffer',
    computed: mapGetters(['offerArtist']),
    components: {
        PaymentNotif, ArtistCard
    },
    data() {
        return {
            artistData: {
                artistId: undefined,
                artisticName: undefined,
                photo: undefined, 
                genres: undefined,
            },
            gsecurity: GSecurity,
            gtrans: GTrans,
            totalPrice: undefined,
            cardPrice: undefined,
            nextStep: undefined,
        }
    },
    methods: {
        ...mapActions(['setFinal']),
    },
    created() {
        // Retreive store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();
        this.gtrans = new GTrans(this.gsecurity.getLanguage());
    },
    mounted() {
        NProgress.done();
        this.artistData.artistId = this.$store.getters.offerArtist.artistId;
        this.artistData.artisticName = this.$store.getters.offerArtist.artisticName;
        this.artistData.photo = this.$store.getters.offerArtist.photo;
        this.artistData.genres = this.$store.getters.offerArtist.genres;

        this.setFinal();

        if(!this.$gsecurity.hasRole('CUSTOMER') || this.artistData.artistId != this.$route.params['artistId'] ) {
                
            console.log('Error')
            location.replace("/#/*")
        }
        // Obtenemos el precio de la tarjeta izq   
        if(this.hiringType == 'FARE')
            this.cardPrice = this.$store.getters.offerFarePack.priceHour;
        else(this.hiringType == 'CUSTOM')
            this.cardPrice = this.$store.getters.offer.totalPrice;
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
