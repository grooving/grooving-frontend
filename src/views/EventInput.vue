<template>
    <div class="hell">
        <div class="title"><p>Event information</p></div>

    <div class="everything">
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.main_photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :totalPrice="this.totalPrice"/>
        </div>
        <div class="evDiv">
          <div class="eventData"><EventData :nextStep="this.nextStep" @eventDataSelected="eventData" /></div>
        </div>
    </div>
    </div>
</template>

<script>
import EventData from '@/components/makeOffer/EventData.vue'
import ArtistCard from '@/components/makeOffer/ArtistCard.vue'
import {mapActions} from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'EventInput',
  computed: mapGetters(['offerArtist', 'offer']),
  components: {
    EventData, ArtistCard
  },
  data() {
      return {
          artistData: {
              artistId: undefined,
              artisticName: undefined,
              main_photo: undefined,
              genres: undefined,
          },
          totalPrice: undefined,
          nextStep: undefined,
      }
  },
  mounted() {
        this.artistData.artistId = this.$store.getters.offerArtist.artistId;
        this.artistData.artisticName = this.$store.getters.offerArtist.artisticName;
        this.artistData.main_photo = this.$store.getters.offerArtist.main_photo;
        this.artistData.genres = this.$store.getters.offerArtist.genres;

        this.totalPrice = this.$store.getters.offer.totalPrice;

        this.nextStep = '/paymentSelector/' + this.artistData.artistId;
    },
    methods: {
        ...mapActions(['setEventDescription']),
        eventData(description) {
            this.setEventDescription(description);
        }
    }
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
