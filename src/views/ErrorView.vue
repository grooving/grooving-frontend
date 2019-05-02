<template>
  <div class="error">
    <h1 class="oops">{{gtrans.translate('error_oops')}} ☹</h1>
    <h4>{{gtrans.translate('error_something')}}</h4>
    <h4>{{gtrans.translate('error_try')}}</h4>
  </div>
</template>

<script>

import GSecurity from "@/security/GSecurity.js";
import GTrans from "@/utils/GTrans.js";

export default {
  name: 'ErrorView',
  props: {
    message:{
      type: String,
      default: "Try again later."
    }
  },
  data() {
    return {
      gsecurity: GSecurity,
      gtrans: GTrans,
    }  
  },

  beforeCreate() {
    // Retreive store credentials
    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();
    this.gtrans = new GTrans(this.gsecurity.getLanguage());
  },

  created(){
    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();
    this.gtrans = new GTrans(this.gsecurity.getLanguage());

  }
}
</script>

<style scoped>
  .error{
    padding-top: 50px;
  }

  .oops{
    font-size: 100px !important;
    font-weight: bold;
  }
</style>