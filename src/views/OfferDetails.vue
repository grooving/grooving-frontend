<template>
    <div>
        <hr />
        <div style="width:100%">
            <ExtendedOffer :offerID="offer[0].offerID" :date="offer[0].date" :endingHour="offer[0].endingHour" :price="offer[0].price"
             :address="offer[0].address" :description="offer[0].description" :confirmURI="offer[0].confirmURI" :packageDescription="offer[0].packageDescription"
             :status="offer[0].status" />
        </div>
    </div>
</template>

<script>

import TabbedSubMenu from '@/components/menus/TabbedSubMenu.vue';
import ExtendedOffer from '@/components/ExtendedOffer.vue'
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';

var acceptURI= "/acceptedOffer/";

export default {
  name: 'OfferDetails',
  
  components: {
    ExtendedOffer,
  },

  data: function(){
    return {
      gsecurity: GSecurity,
      offer: Array(),
      }
  },
  beforeMount: function() {
    if (!(this.gsecurity.hasRole('ARTIST') || this.gsecurity.hasRole('CUSTOMER'))) {
      this.$router.push({name: "error"});
      //console.log("holes")

    } else {
      NProgress.start();
      var authorizedGAxios = GAxios;
      var GAxiosToken = this.gsecurity.getToken();
      authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;
      authorizedGAxios.get(endpoints.offer + this.$route.params['offerId'] + '/')
      .then(response => {
        //console.log(response);
        var off = response.data;
        
        this.offer.push({
          offerID: off.id,
          date: off.date,
          endingHour: off.hours,
          description: off.description,
          address: off.eventLocation.address,
          price: off.price,
          confirmURI: acceptURI + off.id,
          packageDescription: off.paymentPackage.description,
          status: off.status,
        });
      }).catch(ex => {
          //console.log(ex);
      }).then(() => {
        NProgress.done()
      });
    }
  },
}
</script>

<style scoped>
    hr {
      margin: 0px;
    }
</style>

<style>
</style>


