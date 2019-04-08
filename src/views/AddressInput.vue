<template>
    <div class="hell">
        <div class="title"><p>Address information</p></div>

    <div class="everything">
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :totalPrice="this.totalPrice"/>
        </div>
        <div class="addDiv">
          <div class="addressData"><AddressData :nextStep="this.nextStep" :selector_filters="this.selector_filters" @addressSelected="addressSelected" /></div>
        </div>
    </div>
    </div>
</template>

<script>
import AddressData from '@/components/makeOffer/AddressData.vue'
import ArtistCard from '@/components/makeOffer/ArtistCard.vue'
import GSecurity from '@/security/GSecurity.js';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import {mapActions} from 'vuex';
import { mapGetters } from 'vuex';
import PaymentProcess from '@/store/modules/payment.js';

export default {

    name: 'AddressInput',

    computed: mapGetters(['offerArtist']),

    components: {
        AddressData, ArtistCard
    },

    data() {
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
            totalPrice: undefined,
            nextStep: '/eventInput/',
            startHour: undefined,
            selector_filters:[
                {id: 0, text: "Zones", filterName: "zone", value: 0, data: [
                {id: 0, text: "España", value: "0", depth: 0},
                {id: 0, text: "Andalucia", value: "1", depth: 1},
                {id: 0, text: "Sevilla", value: "2", depth: 2}
                ]},
            ], 
        }
    },

    methods: {
        ...mapActions(['setEventAddress']),
        addressSelected(address) {
            this.setEventAddress(address).then(() => {
                // If VueX has correcty saved the address
                this.$router.push(this.nextStep)
            }).catch( e => {
                console.log('Error: Could not set address in VueX');
                console.log(e);
            });
        },
    },

    created() {
        // Retreive store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.artistId = this.$route.params['artistId'];

        if(!this.$gsecurity.hasRole('CUSTOMER')) {
            console.log("Error: You are not a customer so you can't hire an artist");
            location.replace("/#/*")
        }

        if(!this.artistId){
            console.log("Error: ArtistId not provided");
            location.replace("/")
        }

        if(!PaymentProcess.checkStepRequirements(PaymentProcess.state, 'FARE', 3)){
            console.log('Error: Direct access to the view was detected')
            location.replace("/#/hiringType/" + this.artistId + "/")
        }
    },
    beforeMount() {
        // Obtain zones tree...
        GAxios.get(endpoints.zones, {
        params: {
            'tree': true
        }
        }).then(response => {

        var root = response.data;
        var tree = Array();

        tree.push({id:root['id'], text: root['name'], value: root['name'], depth: 0})

        for(var i=0; i < root['children'].length; i++){
            // For each Comunidad Autónoma
            var ca = root['children'][i];
            tree.push({id:ca['id'], text: ca['name'], value: ca['name'], depth: 1})

            for(var j=0; j < ca['children'].length; j++){
            // For each provincia
            var provincia = ca['children'][j];
            tree.push({id:provincia['id'], text: provincia['name'], value: provincia['name'], depth: 2})
            }
        }
        this.selector_filters[0].data = tree;
        
        })
    },
    mounted() {
        // Artist Data
        this.artistData.artistId = this.$store.getters.offerArtist.artistId;
        this.artistData.artisticName = this.$store.getters.offerArtist.artisticName;
        this.artistData.photo = this.$store.getters.offerArtist.photo;
        this.artistData.genres = this.$store.getters.offerArtist.genres;

        this.hiringType = this.$store.getters.offer.hiringType;

        if(this.hiringType && this.hiringType == 'FARE')
            this.totalPrice = this.$store.getters.offer.totalPrice;

        this.nextStep += this.artistData.artistId;
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
            font-weight: bold;
        }
        
    }

</style>
