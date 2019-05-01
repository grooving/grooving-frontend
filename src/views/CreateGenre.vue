<template>
<div class="prueba">
    <div class="everything">
        <div class="paymentSelect">
          <div class="paymentOptions"><CreateGenreForm :parentGenreId="parentGenreId" :parentGenreName="parentGenreName"/></div>
        </div>
    </div>
</div>
</template>

<script>
import CreateGenreForm from '@/components/CreateGenreForm.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';

export default {
    name: 'CreateGenre',

    components: {
        CreateGenreForm,
    },
    
    data: function() {
        return {
            gsecurity: GSecurity,
            packages: Array(),
            parentGenreId: undefined,
            parentGenreName: undefined,
        }
    },


    beforeMount() {
        if (!this.gsecurity.isAuthenticated()) {
            this.$router.push({name: "error"});
        } 

        else if (!this.gsecurity.hasRole('ADMIN')) {
            this.$router.push({name: "error"});
        }
    },

    created() {
            this.gsecurity = GSecurity;
            this.gsecurity.obtainSavedCredentials();
     },

    mounted: function() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        if(this.$attrs.parentGenreId == undefined){
            this.$router.push('/manageGenres/all');
        }
        else{
            this.parentGenreId = (this.$attrs.parentGenreId);
            this.parentGenreName = (this.$attrs.parentGenreName);
        }
        
    },
}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

    @media (min-width:768px)  {
      
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
    }

</style>
