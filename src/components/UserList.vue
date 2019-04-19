<template>
  <div id="results" class="container-fluid px-0 mt-0">
    <h1 class="titleView">{{listTitle}}</h1>
    <div class="row">
      <div v-for="user in users" :key="user.userURI" class="tarjeta col-12 col-md-6 col-xl-4">
        <UserCard :userImage="user.userImage" :userName="user.userName" :userId="user.userId" :userIsActive="user.userIsActive"/>
      </div>
      <div v-if="users.length == 0" class="error">
        <h1 class="oops">{{gtrans.translate('oops')}} ☹</h1>
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from '@/components/UserCard.vue';
import GAxios from '@/utils/GAxios.js';
import GSecurity from "@/security/GSecurity.js"
import GTrans from "@/utils/GTrans.js"

export default {
  name: 'UserList',

  data: function(){
    return{
      gsecurity: GSecurity,
      gtrans: undefined,
    }
  },

  components: {
    UserCard,
  },

  props:{

    listTitle:{
      type: String,
    },

    users:{
      type: Array,
      required: true,
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

<style scoped>

  .error{
    padding-top: 50px;
  }

  .oops{
    font-size: 80px !important;
    font-weight: bold;
    color: rgba(0,0,0,.4);
  }

  @media (min-width:768px)  {
    .titleView{
      text-align: left;
      font-weight: bold;

    }

    .oops{
      margin-left: 50px;
    }
  }

  @media (max-width: 768px){
    .titleView{
      text-align: center;
      font-weight: bold;
      margin-bottom: 30px;

    }
  }

  .container-fluid{
    margin-top: 50px;
    margin-bottom: 30px;
  }

  @media (max-width: 576px) {
    .tarjeta{
      padding-bottom: 20px;
      padding-right: 0px;
      padding-left: 0px;
    }
  }

  @media (min-width: 576px) {
    .tarjeta{
      padding-bottom: 20px;
    }
  }

</style>

