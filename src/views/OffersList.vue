<template>
  <div>
    <div v-if="errors" class="validationErrors vertical-center">
        <p>{{errors}}</p>
    </div>
    <hr />
    <TabbedSubMenu @selectedTab="setSelectedTab"/>
    <div class="container-fluid" style="padding-top: 20px">
      <div class="container">
          <div id="results" class="col-12 col-lg-9 col-xl-10 results">
            <span v-if="selectedTab == 0">
            <div class="row">
              <div v-for="oferta in pendingOffers" :key="oferta.offerID" class="tarjeta col-12 col-md-6 col-xl-6">
                <Offer :offerID="oferta.offerID" :confirmURI="oferta.confirmURI" :date="oferta.date" :price="oferta.price" 
                  :place="oferta.place" :userIcon="oferta.userIcon" :userName="oferta.userName"  :offerStatus="oferta.offerStatus" :imageURI="oferta.imageURI" :customerSurnames="oferta.customerSurnames" :artistId="oferta.artistId" :reason="oferta.reason"/>
              </div>
            </div>
            <div v-if="pendingOffers.length == 0 && availableData" class="error">
              <h1 class="oops">{{gtrans.translate('loading')}}</h1>
            </div>
            <div v-if="pendingOffers.length == 0 && !availableData" class="error">
              <h1 class="oops">{{gtrans.translate('oops')}} ☹</h1>
            </div>
            </span>
            <span v-if="selectedTab == 1">
            <div class="row">
              <div v-for="oferta in acceptedOffers" :key="oferta.offerID" class="tarjeta col-12 col-md-6 col-xl-6">
                <Offer @offerRated="offerRated" @openChat="chat" :offerID="oferta.offerID" :confirmURI="oferta.confirmURI" :date="oferta.date" :price="oferta.price" 
                  :rating="oferta.rating" :place="oferta.place" :userIcon="oferta.userIcon" :userName="oferta.userName"  :offerStatus="oferta.offerStatus" :imageURI="oferta.imageURI" :customerSurnames="oferta.customerSurnames" :artistId="oferta.artistId" :reason="oferta.reason"/>
              </div>
                <Chat :offerId="chatOfferId" :chatActive="chatActive" v-if="chatReady" @closeChat="chatReady=false" :key="chatOfferId" style="z-index: 8000; position:absolute"/>
            </div>
            <div v-if="acceptedOffers.length == 0 && availableData" class="error">
              <h1 class="oops">{{gtrans.translate('loading')}}</h1>
            </div>
            <div v-if="acceptedOffers.length == 0 && !availableData" class="error">
              <h1 class="oops">{{gtrans.translate('oops')}} ☹</h1>
            </div>
            </span>
            <span v-if="selectedTab == 2">
            <div class="row">
              <div v-for="oferta in rejectedOffers" :key="oferta.offerID" class="tarjeta col-12 col-md-6 col-xl-6">
                <Offer :offerID="oferta.offerID" :confirmURI="oferta.confirmURI" :date="oferta.date" :price="oferta.price" 
                  :place="oferta.place" :userIcon="oferta.userIcon" :userName="oferta.userName"  :offerStatus="oferta.offerStatus" :imageURI="oferta.imageURI" :customerSurnames="oferta.customerSurnames" :artistId="oferta.artistId" :reason="oferta.reason"/>
              </div>
            </div>
            <div v-if="rejectedOffers.length == 0 && availableData" class="error">
              <h1 class="oops">{{gtrans.translate('loading')}}</h1>
            </div>
            <div v-if="rejectedOffers.length == 0 && !availableData" class="error">
              <h1 class="oops">{{gtrans.translate('oops')}} ☹</h1>
            </div>
            </span>
            
          </div>
        </div>
      </div>
  </div>
  
</template>

<script>

import Offer from '@/components/Offer.vue';
import TabbedSubMenu from '@/components/menus/TabbedSubMenu.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js";
import Chat from '@/components/Chat.vue';

var acceptURI = '/offerDetails/';

export default {
  name: 'OffersList',

  components: {
    Offer,
    TabbedSubMenu,
    Chat,
  },
  data: function() {
    return {
      gsecurity: GSecurity,
      gtrans: undefined,
      errors: undefined,
      chatReady: false,
      chatOfferId: undefined,
      chatActive: undefined,
      datos_prueba: [
        {
          offerID:  1, 
          date: 'January 1, 2019',
          price: 89.00,
          place: 'Pilas',
          confirmURI: 'offerDetails',
          userIcon: 'https://i.imgur.com/zg5UgRb.jpg',
          userName: 'Laika',
        },
        {
          offerID: 3, 
          date: 'February 19, 2019',
          price: 38.00,
          place: 'La Algaba',
          confirmURI: 'offerDetails',
          userIcon: 'https://i.imgur.com/Y6UhVQF.jpg',
          userName: 'Dobby',
        },
        {
          offerID: 5, 
          date: 'June 28, 2019',
          price: 120.00,
          place: 'Espartinas',
          confirmURI: 'offerDetails',
          userIcon: 'https://i.imgur.com/C0EXLuU.jpg',
          userName: 'Otto',
        },
        {
          offerID: 7, 
          date: 'July 14, 2019',
          price: 3.50,
          place: 'Huelva',
          confirmURI: 'offerDetails',
          userIcon: 'https://i.imgur.com/asPcsKa.jpg',
          userName: 'Alicia',
        },
      ],
      selectedTab: 0,
      offers: Array(),
      availableData: true,
    }
  },

  computed: {

    pendingOffers: function() {
      return this.offers.filter(item => (item.offerStatus == "PENDING" || item.offerStatus == "NEGOTIATION"));
    },
    acceptedOffers: function() {
      return this.offers.filter(item => (item.offerStatus == "CONTRACT_MADE" || item.offerStatus == "PAYMENT_MADE"));
    },
    rejectedOffers: function() {
      return this.offers.filter(item => (item.offerStatus == "WITHDRAWN" || item.offerStatus == "REJECTED" || item.offerStatus == "CANCELLED_ARTIST" || item.offerStatus == "CANCELLED_CUSTOMER"));
    }
  },

  methods: {
    chat(payload) {
      this.chatOfferId = payload[0];
      this.chatActive = payload[1];
      this.chatReady = true;
    },

    offerRated(offerId,rating) {
      console.log(offerId,rating)
      for(let i=0; i < this.offers.length; i++){
        if(this.offers[i].offerID == offerId) {
          this.offers[i].rating = rating;
        }
      }
    },
    setSelectedTab(status) {
      this.selectedTab = status;
    },
  },

  created() {
    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();

    this.gtrans = new GTrans(this.gsecurity.getLanguage());
    
    // Podemos cambiar el lenguaje así para debug...
    //this.gtrans.setLanguage('es')
    //this.gtrans.setLanguage('en')

    if(!this.$gsecurity.isAuthenticated()) {
      console.log('Error')
      location.replace("/#/*")
    }
    
  },

  beforeMount: function() {
    NProgress.start();
    var authorizedGAxios = GAxios;
    var GAxiosToken = this.gsecurity.getToken();
    authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;
    var URI;

    if (this.gsecurity.hasRole('ARTIST')) {
      URI = endpoints.artistOffers;
    } else if (this.gsecurity.hasRole('CUSTOMER')) {
      URI = endpoints.customerOffers;
    }

    authorizedGAxios.get(URI)
    .then(response => {
      console.log(response);
      var offers = response.data.results;

      var name;
      var icon;
      var link;
      var customerSurnames = '';
      var artistId = '';
      var rating;

      for(var i = 0; i < offers.length; i++){
        var d = offers[i].date.split("T",2);
        if (this.gsecurity.hasRole('ARTIST')) {
          if (offers[i].eventLocation.customer != null) {
            name = offers[i].eventLocation.customer.user.first_name;
            icon = offers[i].eventLocation.customer.photo;
            link = 'customerInfo';
            customerSurnames = offers[i].eventLocation.customer.user.last_name;
          } else {
            name = this.gtrans.translate('account_deleted');
            icon = null;
            link = null;
            customerSurnames = null;
          }
        } else if (this.gsecurity.hasRole('CUSTOMER')) {
          if (offers[i].artist != null) {
            name = offers[i].artist.portfolio.artisticName;
            icon = offers[i].artist.portfolio.artist.photo;
            link = 'showPortfolio';
            artistId = offers[i].artist.portfolio.artist.id;
          } else {
            name = this.gtrans.translate('account_deleted');
            icon = null;
            link = null;
            artistId = null;
          }
        }
        if(offers[i].status == "PAYMENT_MADE") {
          try {
            rating = offers[i].rating.score;
          } catch {
            rating = null;
          }
        }
        this.offers.push({
          offerID: offers[i].id,
          offerStatus: offers[i].status,
          date: d[0],
          place: offers[i].eventLocation.zone.name,
          userName: name,
          userIcon: icon,
          price: offers[i].price,
          confirmURI: acceptURI + offers[i].id,
          imageURI: link,
          customerSurnames: customerSurnames,
          artistId: artistId,
          reason: offers[i].reason,
          rating: rating,       
        });
      }
    }).catch(ex => {
        console.log(ex);
        try {
          this.errors = ex.response.data.error;
        } catch {}
    }).then(() => {
      if(this.offers.length == 0) {
        this.availableData = false;
      }
      NProgress.done()
    });
  },
}
</script>

<style scoped>

.validationErrors{
        background-color:#f50057;
        box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);
        
        color:white;
        font-weight: bold;
        height: 100%;
        padding-top: 12px;
    }

  .error{
    padding-top: 50px;
  }

  hr {
    margin: 0px;
  }

  .oops{
    font-size: 80px !important;
    font-weight: bold;
    color: rgba(0,0,0,.4);
  }

  .results{
    margin: 0 auto; 
    padding: 0px;
  }    

  .tarjeta{
    padding-bottom: 20px;
  }

</style>
