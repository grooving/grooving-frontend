<template>
<div class="prueba">
    <div class="title"><p>Payment</p></div>
    <div v-if="errors === true" class="validationErrors">
        <p>Sorry! Something went wrong. Try again later.</p>
        <!--<p>Error en el numero</p>
        <p>Error en el mes</p>-->
    </div>
    <div class="everything">
        <div class="artistCard"><ArtistCard :artistName="this.artistData.artisticName" :artistImage="this.artistData.main_photo" 
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

export default {
    name: 'payment',
    computed: mapGetters(['offerAddress', 'offerDate', 'offer', 'offerArtist', 'offerFarePack']),
    components: {
        CreditCardPayment, ArtistCard
    },
    data () {
        return {
            gsecurity: GSecurity,
            creditCard: {
                numbe: undefined, 
                name: undefined, 
                month: undefined, 
                year: undefined, 
                cvv: undefined, 
            },
            date: {
                now: undefined, 
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
            },
            artistData: {
                artistId: undefined,
                artisticName: undefined,
                main_photo: undefined, 
                genres: undefined,
            },
            totalPrice: undefined,
            nextStep: undefined,
            farePackageId: undefined,
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

            this.offer.artistId = this.$store.getters.offer.artistId,
            this.offer.hiringType = this.$store.getters.offer.hiring,
            this.offer.location = this.$store.getters.offerAddress.location,
            this.offer.zipcode = this.$store.getters.offerAddress.zipcode,
            this.offer.street = this.$store.getters.offerAddress.street,
            this.offer.description = this.$store.getters.offerAddress.description,

            this.date = Array();
            this.date.startHour = this.$store.getters.offerDate.hour,
            this.date.now = this.$store.getters.offerDate.date,
            this.date.duration = this.$store.getters.offerDate.duration;

            this.farePackageId = this.$store.getters.offerFarePack.packageId;

            var authorizedGAxios = GAxios;
            var GAxiosToken = this.gsecurity.getToken();
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

            let body_eventLocation = {
                "name": this.offer.location,
                "equipment": null,
                "description": this.offer.description,
                "address": this.offer.street + ', ' + this.offer.zipcode,
                "zone_id": 4
            }

            let body_offer = {
                'description': this.offer.description,
                'date': this.date.now + 'T' + this.date.startHour + ':00',
                'hours': this.date.duration,
                'paymentPackage_id': this.farePackageId,
                'eventLocation_id' : 1,
                'transaction': {
                    'holder': this.creditCard.name,
                    'number': this.creditCard.number,
                    'expirationDate': this.creditCard.month + this.creditCard.year,
                    'cvv': this.creditCard.cvv,
                },
            }

            console.log(body_offer)

            authorizedGAxios.post('/eventlocation/', body_eventLocation)
            .then((res) => {
                console.log("Event Location Created...")
                console.log(res)
                
                // Reference the brand-new eventLocation
                body_offer['eventLocation_id'] = res.data.id

                return authorizedGAxios.post('/offer/', body_offer);
            })
            .then((res) => {
                console.log("Offer Created...")
                console.log(res)
            })
            .catch((err) => {
                console.log("Error while processing one of the requests")
                console.log(err)
            })
            .then(()=> {
                this.$router.push({path: this.nextStep})
                    
            });
        },
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
        this.offer.location = this.$store.getters.offerAddress.location;

        this.nextStep = '/sentOffer/' + this.artistData.artistId;

        if(!this.$gsecurity.hasRole('CUSTOMER') || this.artistData.artistId != this.$route.params['artistId'] 
            || !this.offer.location) {
                
            console.log('Error')
            location.replace("/#/*")
        }        
    },
    created() {
        // Retreive store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        if(!this.$gsecurity.isAuthenticated()) {
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
