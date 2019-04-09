<template>
  <div>
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
            <div v-if="pendingOffers.length == 0" class="error">
              <h1 class="oops">Nothing to show ☹</h1>
            </div>
            </span>
            <span v-if="selectedTab == 1">
            <div class="row">
              <div v-for="oferta in acceptedOffers" :key="oferta.offerID" class="tarjeta col-12 col-md-6 col-xl-6">
                <Offer :offerID="oferta.offerID" :confirmURI="oferta.confirmURI" :date="oferta.date" :price="oferta.price" 
                  :rating="oferta.rating" :place="oferta.place" :userIcon="oferta.userIcon" :userName="oferta.userName"  :offerStatus="oferta.offerStatus" :imageURI="oferta.imageURI" :customerSurnames="oferta.customerSurnames" :artistId="oferta.artistId" :reason="oferta.reason"/>
              </div>
            </div>
            <div v-if="acceptedOffers.length == 0" class="error">
              <h1 class="oops">Nothing to show ☹</h1>
            </div>
            </span>
            <span v-if="selectedTab == 2">
            <div class="row">
              <div v-for="oferta in rejectedOffers" :key="oferta.offerID" class="tarjeta col-12 col-md-6 col-xl-6">
                <Offer :offerID="oferta.offerID" :confirmURI="oferta.confirmURI" :date="oferta.date" :price="oferta.price" 
                  :place="oferta.place" :userIcon="oferta.userIcon" :userName="oferta.userName"  :offerStatus="oferta.offerStatus" :imageURI="oferta.imageURI" :customerSurnames="oferta.customerSurnames" :artistId="oferta.artistId" :reason="oferta.reason"/>
              </div>
            </div>
            <div v-if="rejectedOffers.length == 0" class="error">
              <h1 class="oops">Nothing to show ☹</h1>
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

var acceptURI = '/offerDetails/';

export default {
  name: 'OffersList',

  components: {
    Offer,
    TabbedSubMenu,
  },

  data: function() {
    return {
      gsecurity: GSecurity,
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
    toggleFilterSelectionModal: function () {
      this.showFilterSelectionModal = !this.showFilterSelectionModal;
    },

    updateFilters: function() {
      var selected = Array();

      for(var i = 0; i < arguments[0].length; i++){
        selected.push(arguments[0][i]);
      }

      for(var j = 0; j < this.filter_parameters.length; j++){
        if(selected.includes(this.filter_parameters[j].id)){
          this.filter_parameters[j].selected = true;
        }
      }        
    },

    setSelectedTab(status) {
      this.selectedTab = status;
    },
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
          name = offers[i].eventLocation.customer.user.first_name;
          icon = offers[i].eventLocation.customer.photo;
          link = 'customerInfo';
          customerSurnames = offers[i].eventLocation.customer.user.last_name;
        } else if (this.gsecurity.hasRole('CUSTOMER')) {
          name = offers[i].paymentPackage.portfolio.artisticName;
          icon = offers[i].paymentPackage.portfolio.main_photo;
          link = 'showPortfolio';
          //artistId = offers[i].paymentPackage.portfolio.artist.id;
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
    });
    NProgress.done();
  },
  mounted: function() {
        NProgress.done();
  }
}
</script>

<style scoped>

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
