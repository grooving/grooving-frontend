<template>
  <div class="PaymentNotif">
      <div class="tarjeta">
        <div class="hello">
        <div class="confirmation"><img class="tick" src="@/assets/img/approved_tick.png"/>
            <p class="price">{{sentText}}</p>
        </div>
        <p class="notice">{{noticeText}}</p>
        </div>
    </div>
  </div>
</template>

<script>
import GSecurity from "@/security/GSecurity.js";
import GTrans from "@/utils/GTrans.js";

export default {
    name: 'PaymentNotif',
    data() {
        return {
            gsecurity: GSecurity,
            gtrans: undefined,
            sentText: "",
            noticeText: "",
        }
    },
    created() {
      this.gsecurity = GSecurity;
      this.gsecurity.obtainSavedCredentials();
      this.gtrans = new GTrans(this.gsecurity.getLanguage());
        
      // Podemos cambiar el lenguaje así para debug...
      //this.gtrans.setLanguage('es')
      //this.gtrans.setLanguage('en')

      this.sentText = this.gtrans.translate('sentText');
      this.noticeText = this.gtrans.translate('noticeText');
    }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

* {
        font-family: "Archivo"
    }
    .notice {
        color: grey; 
        font-weight: bold; 
        font-size: 125%; 
        padding-bottom: 10px; 
        margin-left: 3%; 
        margin-right: 3%;
    }
    .tick{
        width: 140px;
        margin-top: 10px;
    }

    .confirmation {
        padding-top: 10%;
        padding-bottom: 10%;
        width: 100%;
    }

    .card-img-top {
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
    }

    .tarjeta {
        display: inline-block;
        width: 100%;
    }

    .artistImage {
        object-fit: cover;
        max-height: 200px;
    }

    .cuerpoTarjeta {
        display: flex;
        align-items: center;
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

    @media (min-width:768px)  {
        .tarjeta {
            height: 305px;
            box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
            border-radius: 10px;
            display: inline-block;
        }
        .everything {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 10%;
            text-align: center;
            padding: 15px;
        }

        .confirmation {
            padding-top: 2.5%;
            padding-bottom: 2.5%;
            width: 100%
        }

        .notice {
            color: grey; 
            font-weight: bold; 
            font-size: 125%; 
            width: 80%;
            display: inline-block;
        }
    }

</style>
