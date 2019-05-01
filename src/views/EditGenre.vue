<template>
<div class="prueba">
    <div class="everything">
        <div class="paymentSelect">
          <div class="paymentOptions"><EditGenreForm :genreName="genre.name" :parentName="parentName" :genreId="genre.id" :parentId="parentId"/></div>
        </div>
    </div>
</div>
</template>

<script>
import EditGenreForm from '@/components/EditGenreForm.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';

export default {
    name: 'EditGenre',

    components: {
        EditGenreForm
    },
    
    data: function() {
        return {
            gsecurity: GSecurity,
            parentName: undefined,
            parentId: undefined,
            genre: undefined


        }
    },

    beforeMount: function(){
        if (!this.gsecurity.isAuthenticated()) {
            this.$router.push({name: "error"});
        } 

        else if (!this.gsecurity.hasRole('ADMIN')) {
            this.$router.push({name: "error"});
        }

    },

    mounted: function() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        

        if(this.$attrs.parentGenreId == undefined){
            this.$router.push('/manageGenres/all');
        }
        else{
            this.parentId = (this.$attrs.parentGenreId);
            this.parentName = (this.$attrs.parentGenreName);
            this.genre = (this.$attrs.genre);
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
