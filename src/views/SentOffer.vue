<template>
<div class="prueba">
    <div class="title"><p>Your offer has been sent to the artist</p></div>
    
    <div class="everything">
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.main_photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :totalPrice="this.totalPrice"/>
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
                main_photo: undefined, 
                genres: undefined,
            },
            gsecurity: GSecurity,
            totalPrice: undefined,
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
    },
    mounted() {
        this.artistData.artistId = this.$store.getters.offerArtist.artistId;
        this.artistData.artisticName = this.$store.getters.offerArtist.artisticName;
        this.artistData.main_photo = this.$store.getters.offerArtist.main_photo;
        this.artistData.genres = this.$store.getters.offerArtist.genres;

        this.setFinal();

        if(!this.$gsecurity.hasRole('CUSTOMER') || this.artistData.artistId != this.$route.params['artistId'] ) {
                
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
