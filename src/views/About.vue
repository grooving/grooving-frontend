<template>
  <div class="about">
    <h2>{{gtrans.translate('prueba_test')}}</h2>
  </div>
</template>

<script>
import GSecurity from "@/security/GSecurity.js"
import GTrans from "@/utils/GTrans.js"

export default {

  name: "About",

  data: function(){
    return{
      gsecurity: GSecurity,
      gtrans: undefined,
    }
  },

  created: function(){
    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();

    this.gtrans = new GTrans(this.gsecurity.getLanguage());
    
    // Podemos cambiar el lenguaje así para debug...
    //this.gtrans.setLanguage('es')
    //this.gtrans.setLanguage('en')

  }

}
</script>
