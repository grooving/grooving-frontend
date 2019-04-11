<template>
<div class="hiringProcessContainer">
    <div v-if="errors == true" class="validationErrors">
        <p>Sorry! Something went wrong. Try again later.</p>
    </div>
    <div class="title"><p>Payment</p></div>
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
import {mapGetters} from 'vuex';
import PaymentProcess from '@/store/modules/payment.js';
import { error } from 'util';

export default {

    name: 'payment',

    components: {
        CreditCardPayment, ArtistCard
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


            packageId: undefined,
            creditCard: {
                number: undefined, 
                name: undefined, 
                month: undefined, 
                year: undefined, 
                cvv: undefined, 
            },
            preparedDate: {
                fecha: undefined, 
                startHour: undefined, 
                duration: undefined,
            },
            preparedOffer: {
                artistId: undefined, 
                hiringType: undefined, 
                location: undefined, 
                zipcode: undefined, 
                street: undefined, 
                description: undefined,
                zoneId: undefined,
            },

        }
    },

     methods: {
         
        gpay(creditCard) {
            
            NProgress.start();

            // Obtenemos los datos de Tarjeta introducidos
            this.creditCard.number = creditCard[0];
            this.creditCard.name = creditCard[1];
            this.creditCard.month = creditCard[2];
            this.creditCard.year = creditCard[3];
            this.creditCard.cvv = creditCard[4];

            // Preparamos una oferta con los campos de VueX, que usaremos para redactar el 
            // cuerpo de la petición
            this.preparedOffer.artistId = this.$store.getters.offerArtist.artistId,
            this.preparedOffer.hiringType = this.$store.getters.offer.hiringType,
            this.preparedOffer.location = this.$store.getters.offerEvent.location,
            this.preparedOffer.zipcode = this.$store.getters.offerEvent.zipcode,
            this.preparedOffer.street = this.$store.getters.offerEvent.street,
            this.preparedOffer.description = this.$store.getters.offerEvent.description,
            this.preparedOffer.zoneId = this.$store.getters.offerEvent.zone,

            console.log("Oferta preparada: ", this.preparedOffer);

            // Preparamos una fecha con los campos de VueX, que usaremos para redactar el 
            // cuerpo de la petición
            this.preparedDate.startHour = this.$store.getters.offerDate.hour,
            this.preparedDate.fecha = this.$store.getters.offerDate.date,
            this.preparedDate.duration = this.$store.getters.offerDate.duration;

            // Retrieve the PackageID the user selected, by means 
            // of the hiringType
            if(this.hiringType == "FARE")
                this.packageId = this.$store.getters.offerFarePack.packageId;
            else if(this.hiringType == "CUSTOM")
                this.packageId = this.$store.getters.offerCustomPack.packageId;

            // Preparamos el cuerpo genérico de las peticiones
            let body_eventLocation = {
                "name": this.preparedOffer.location,
                "equipment": null,
                "description": this.preparedOffer.description,
                "address": this.preparedOffer.street + ', ' + this.preparedOffer.zipcode,
                "zone_id": this.preparedOffer.zoneId,
            }

            let body_offer = {
                'description': this.preparedOffer.description,
                'date': this.preparedDate.fecha + 'T' + this.preparedDate.startHour + ':00',
                'hours': this.preparedDate.duration,
                'paymentPackage_id': this.packageId,
                'eventLocation_id' : 1,
                'transaction': {
                    'holder': this.creditCard.name,
                    'number': this.creditCard.number,
                    'expirationDate': this.creditCard.month + this.creditCard.year,
                    'cvv': this.creditCard.cvv,
                },
            }
            
            // *** Realizamos dos peticiones secuenciales ***
            var authorizedGAxios = GAxios;
            var GAxiosToken = this.gsecurity.getToken();
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

            // Completamos el cuerpo genérico con los campos restantes para cada tipo
            if(this.hiringType == "CUSTOM"){
                this.packageId = this.$store.getters.offerCustomPack.packageId;
                body_offer['price'] = this.$store.getters.offer.totalPrice;
            }

            authorizedGAxios.post(endpoints.eventlocation, body_eventLocation)
            .then((res) => {

                console.log("Event Location Created...")
                console.log(res)
                
                // Reference the brand-new eventLocation
                body_offer['eventLocation_id'] = res.data.id;

                // Una vez creado el eventLocation, procedemos a crear la oferta
                authorizedGAxios.post(endpoints.offer, body_offer)
                .then((res) => {
                    console.log("Offer Created...")
                    console.log(res)
                    this.$router.push({path: this.nextStep})
                })
                .catch(error => {
                    console.log("Error while creating the Offer")
                    this.errors = true;
                })
                
            })
            .catch(error => {
                console.log("Error while creating the EventLocation")
                this.errors = true;
            }).then(() => {
                NProgress.done()
            });
        },
    },

    props: {
        errors: {
            type: Boolean,
            default: false
        }
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
        if(!PaymentProcess.checkViewRequirements(PaymentProcess.state, this.hiringType, "Payment")){
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
            this.cardPrice = this.$store.getters.offerCustomPack.cardPrice;

        // Actualizamos el siguiente paso
        this.nextStep = '/sentOffer/';
    
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

        .hiringProcessContainer{
            margin-bottom: 5%;
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

        .validationErrors{
            background-color:#f50057;
            box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);
            
            color:white;
            font-weight: bold;
            height: 100%;
            padding-top: 12px;
        }
        
    }

</style>
