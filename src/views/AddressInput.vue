<template>
    <div class="hell">
        <div class="title"><p>Address information</p></div>

    <div class="everything">
        <div class="artistCard"><ArtistCard 
            :artistName="this.artistData.artisticName" :artistImage="this.artistData.photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :totalPrice="this.totalPrice"/>
        </div>
        <div class="addDiv">
          <div class="addressData"><AddressData :nextStep="this.nextStep" @addressSelected="addressSelected" /></div>
        </div>
    </div>
    </div>
</template>

<script>
import AddressData from '@/components/makeOffer/AddressData.vue'
import ArtistCard from '@/components/makeOffer/ArtistCard.vue'
import GSecurity from '@/security/GSecurity.js';
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
import PaymentProcess from '@/store/modules/payment.js';

export default {

    name: 'AddressInput',

    computed: mapGetters(['offerArtist']),

    components: {
        AddressData, ArtistCard
    },

    data() {
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

            startHour: undefined,
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

        // Retrieve store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        // The artist to whom the offer is created
        this.artistId = this.$route.params['artistId'];
        // Retrieve the type of hiring
        this.hiringType = this.$store.getters.offer.hiringType;

        // ###### SECURITY ACCESS CHECKS ###### 

        if(!this.gsecurity.hasRole('CUSTOMER')) {
            console.log("Error: You are not a customer so you can't hire an artist");
            location.replace("/#/*")
        }

        if(!this.artistId){
            console.log("Error: ArtistId not provided");
            location.replace("/")
        }

        // Check the user does not access the view directly
        if(!PaymentProcess.checkViewRequirements(PaymentProcess.state, this.hiringType, "AddressInput")){
            console.log('Error: Direct access to the view was detected')
            location.replace("/#/hiringType/" + this.artistId + "/")
        }

        // ###### END OF SECURITY ACCESS CHECKS ###### 

    },

    beforeMount() {

        // ###### VUEX RESTORE ###### 

        this.artistData = this.$store.getters.offerArtist;

        // ###### END OF VUEX RESTORE ###### 


        // Obtenemos el precio de la tarjeta izq   
        if(this.hiringType && this.hiringType == 'FARE')
            this.cardPrice = this.$store.getters.offerFarePack.priceHour;

        // Actualizamos el siguiente paso
        if(this.hiringType == 'FARE'){
            this.nextStep = '/addressInput/';
        }else if(this.hiringType == 'CUSTOM'){
            this.nextStep = '/priceSelector/';
        }

        this.nextStep = "/eventInput/";
        this.nextStep += this.artistId;

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
