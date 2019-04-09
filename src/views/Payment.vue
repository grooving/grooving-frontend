<template>
<div class="prueba">
    <div class="title"><p>Payment</p></div>
    <div v-if="errors == true" class="validationErrors">
        <p>Sorry! Something went wrong. Try again later.</p>
        <!--<p>Error en el numero</p>
        <p>Error en el mes</p>-->
    </div>
    <div class="everything">
        <div class="artistCard"><ArtistCard :artistName="this.artistData.artisticName" :artistImage="this.artistData.photo" 
            :artistGenres="this.artistData.genres" :artistId="this.artistData.artistId" :totalPrice="this.totalPrice"/>
        </div>
        <div class="paymentDiv">
          <div class="creditCardPayment" style="min-width:400px;"><CreditCardPayment @finishPayment="gpay" /></div>
        </div>
    </div>
</div>
</template>

<script>
import CreditCardPayment from '@/components/makeOffer/CreditCardPayment.vue'
import ArtistCard from '@/components/makeOffer/ArtistCard.vue'
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';
import { mapGetters } from 'vuex';
import PaymentProcess from '@/store/modules/payment.js';
import { error } from 'util';

export default {

    name: 'payment',

    components: {
        CreditCardPayment, ArtistCard
    },

    data() {
        return {
            gsecurity: GSecurity,
            artistId: undefined,
            hiringType: undefined,
            creditCard: {
                number: undefined, 
                name: undefined, 
                month: undefined, 
                year: undefined, 
                cvv: undefined, 
            },
            date: {
                fecha: undefined, 
                startHour: undefined, 
                duration: undefined,
            },
            offer: {
                artistId: undefined, 
                hiringType: undefined, 
                location: undefined, 
                zipcode: undefined, 
                street: undefined, 
                description: undefined,
                zoneId: undefined,
            },
            artistData: {
                artistId: undefined,
                artisticName: undefined,
                photo: undefined, 
                genres: undefined,
            },
            totalPrice: undefined,
            nextStep: '/sentOffer/',
            packageId: undefined,
        }
    },

    props: {
        errors: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        gpay(creditCard) {

            this.creditCard = Array();
            this.creditCard.number = creditCard[0],
            this.creditCard.name = creditCard[1],
            this.creditCard.month = creditCard[2],
            this.creditCard.year = creditCard[3],
            this.creditCard.cvv = creditCard[4],

            this.offer.artistId = this.$store.getters.offerArtist.artistId,
            this.offer.hiringType = this.$store.getters.offer.hiringType,
            this.offer.location = this.$store.getters.offerEvent.location,
            this.offer.zipcode = this.$store.getters.offerEvent.zipcode,
            this.offer.street = this.$store.getters.offerEvent.street,
            this.offer.description = this.$store.getters.offerEvent.description,
            this.offer.zoneId = this.$store.getters.offerEvent.zone,

            console.log(this.offer)

            this.date = Array();
            this.date.startHour = this.$store.getters.offerDate.hour,
            this.date.fecha = this.$store.getters.offerDate.date,
            this.date.duration = this.$store.getters.offerDate.duration;

            if(this.hiringType == "FARE")
                this.packageId = this.$store.getters.offerFarePack.packageId;
            else if(this.hiringType == "CUSTOM")
                this.packageId = this.$store.getters.offerCustomPack.packageId;

            var authorizedGAxios = GAxios;
            var GAxiosToken = this.gsecurity.getToken();
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

            let body_eventLocation = {
                "name": this.offer.location,
                "equipment": null,
                "description": this.offer.description,
                "address": this.offer.street + ', ' + this.offer.zipcode,
                "zone_id": this.offer.zoneId
            }

            let body_offer = {
                'description': this.offer.description,
                'date': this.date.fecha + 'T' + this.date.startHour + ':00',
                'hours': this.date.duration,
                'eventLocation_id' : 1,
                'transaction': {
                    'holder': this.creditCard.name,
                    'number': this.creditCard.number,
                    'expirationDate': this.creditCard.month + this.creditCard.year,
                    'cvv': this.creditCard.cvv,
                },
            }

            if(this.hiringType == "FARE"){
                this.packageId = this.$store.getters.offerFarePack.packageId;
            }
            else if(this.hiringType == "CUSTOM"){
                this.packageId = this.$store.getters.offerCustomPack.packageId;
                body_offer['price'] = this.$store.getters.offer.totalPrice;

            }
            
            body_offer['paymentPackage_id'] = this.packageId;

            authorizedGAxios.post('/eventlocation/', body_eventLocation)
            .then((res) => {
                console.log("Event Location Created...")
                console.log(res)
                
                // Reference the brand-new eventLocation
                body_offer['eventLocation_id'] = res.data.id;
                console.log('Body', body_offer)

                authorizedGAxios.post('/offer/', body_offer)
                .then((res) => {
                    console.log("Offer Created...")
                    console.log(res)
                    this.$router.push({path: this.nextStep})
                })
                .catch(error => {
                    console.log("Error while processing one of the requests")
                    this.errors = true;
                    
                })
                
            })
            .catch(error => {
                console.log("Error while processing one of the requests")
                console.log(err)
            })


        },
    },

    created() {
        // Retreive store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.artistId = this.$route.params['artistId'];
        // Retrieve the type of hiring in order to ensure access permission
        this.hiringType = this.$store.getters.offer.hiringType;

        if(!this.$gsecurity.hasRole('CUSTOMER')) {
            console.log("Error: You are not a customer so you can't hire an artist");
            location.replace("/#/*")
        }

        if(!this.artistId){
            console.log("Error: ArtistId not provided");
            location.replace("/")
        }

        var stepNumber;
        if(this.hiringType == 'FARE')
            stepNumber = 6;
        else if(this.hiringType == 'CUSTOM'){
            stepNumber = 7;
        }

        if(!this.hiringType || !PaymentProcess.checkStepRequirements(PaymentProcess.state, this.hiringType, stepNumber)){
            console.log('Error: Direct access to the view was detected')
            location.replace("/#/hiringType/" + this.artistId + "/")
        }
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
