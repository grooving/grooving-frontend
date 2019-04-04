<template>
<div class="prueba">
    <div class="title"><p>Payment</p></div>
    <div v-if="errors === true" class="validationErrors">
        <p>Sorry! Something went wrong. Try again later.</p>
        <!--<p>Error en el numero</p>
        <p>Error en el mes</p>-->
    </div>
    <div class="everything">
        <div class="tarjeta">
            <a v-bind:href="artistURI"><img v-bind:src="artistImage" class="card-img-top artistImage" alt="Artist's Image"></a>
            <div class="card-body cuerpoTarjeta">
                <div class="leftContent">
                    <h5 class="card-title artistName">{{ artistName }}</h5>
                    <span class="card-text artistGenres">{{ genresToString() }}</span>
                </div>
                <div class="rightContent">
                    <p class="price">{{ price }}</p>
                </div>
            </div>
        </div>
        <div class="paymentDiv">
          <div class="creditCardPayment"><CreditCardPayment @finishPayment="gpay"/></div>
        </div>
    </div>
</div>
</template>

<script>
import CreditCardPayment from '@/components/makeOffer/CreditCardPayment.vue'
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';
import { mapGetters } from 'vuex';

export default {
  name: 'payment',
  computed: mapGetters(['offerAddress', 'offerDate', 'offer']),
  components: {
    CreditCardPayment
  },
  data () {
      return {
          creditCard: {
              number, name, month, year, cvv, 
          },
          date: {
              date, startHour, duration
          },
          offer: {
              artistId, hiringType, location, zipcode, street, description,
          },
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
        continueURI: {
            type: String,
            default: '#'
        },
        price: {
          type: String,
          default: '$63.00/h'
        },
        errors: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        genresToString() {

            var res = "";
            var i = 0;

            for (i = 0; i < this.artistGenres.length; i++) { 
                if (i != this.artistGenres.length - 1) {
                    res += this.artistGenres[i] + ", ";
                } else {
                    res += this.artistGenres[i];
                }
            }

            return res;
        },
        gpay(creditCard) {
            console.log(creditCard)
            this.creditCard = creditCard,

            this.offer.artistId = offer.artistId,
            console.log('hi')
            this.offer.hiringType = offer.hiring,
            this.offer.location = offerAddress.location,
            this.offer.zipcode = offerAddress.zipcode,
            this.offer.street = offerAddress.street,
            this.offer.description = offerAddress.description,

            this.date.startHour = offerDate.hour,
            this.date.date = offerDate.date,
            this.date.duration = offerDate.duration;

            var authorizedGAxios = GAxios;
            var GAxiosToken = this.gsecurity.getToken();
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

            let body = {
                'description': this.offer.description,
                'date': this.date.date + 'T' + this.date.startHour,
                'hours': this.date.duration,
                'paymentPackage_id': 1,
                'eventLocation_id' : 1,
            }
            console.log(body)

            authorizedGAxios.post('/offer/', body)
            .then(response => {
            console.log(response.data);
            var offers = response.data.results;

            }).catch(ex => {
                console.log(ex);
            });

        },
    }
}
</script>

<style>

.vdp-datepicker__calendar {
  width: 100%;
  border: 0px;
  margin-top: 10px;
}

</style>

<style scoped>
    * {
        font-family: "Archivo"
    }
    .card-img-top {
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
    }

    .tarjeta {
        width: 100%;
        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
    }

    .artistImage {
        object-fit: cover;
        max-height: 200px;
    }

    .cuerpoTarjeta {
        display: flex;
        align-items: center;
    }

    .leftContent {
        text-align: left;
        overflow: auto;
    }

    .artistName {
        font-size: 32px;
        margin-bottom: 0px;
        padding-bottom: 0px;
        word-wrap: break-word;
    }

    .artistGenres {
        color: #187FE6;
        font-size: 18px;
        word-wrap: break-word;
    }

    .rightContent {
        padding-left: 20px;
        margin-left: auto;
        margin-right: 0px;
    }

    .price {
        font-size: 35px;
        margin-bottom: 0px;
        color: #187FE6;
    }

    .continueButton {
        font-size: 22px;
                
        border: none;
        border-radius: 30px;
        width: 65%;

        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .continueButton:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .continueButtonDiv {
        margin-top: 30px;
        margin-bottom: 10%;
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

        .tarjeta {
            min-width: 335px;
            width: 25%;
            border-radius: 10px;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
            margin-right: 10px;
        }

        .calendarButton  {
            margin-left: 5%;
            width: 50%;
            margin-top: 0%;
            margin-right: 0%;
            display: inline-block;
        }
      
        .continueButtonDiv {
            margin-top: 15px;
        }


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
            margin-left: 10%;
            margin-right: 10%;
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
