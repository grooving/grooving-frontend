<template>
<div class="prueba">
    <div class="everything">
            <div class="contentDelete">
                <p>{{gtrans.translate('genres_deleteQuestion')}}</p>
                <h1 style="font-weight:bold; margin-top: 10px;">{{genre.name}}</h1>
                <p style="margin-top: 20px;">{{gtrans.translate('genres_deleteMsg')}} <strong>{{gtrans.translate('genres_undone')}}</strong></p>
                <hr>
                <div class="contentButtons">
                    <router-link v-bind:to="'manageGenres/'+cancelButtonId" class="btn btn-primary editButton"><span class="hireText">{{gtrans.translate('genres_cancel')}}</span></router-link>
                    <a  v-on:click="deleteGenre()" class="btn btn-primary deleteButton"><span class="hireText">{{gtrans.translate('genres_delete')}}</span></a>
                </div>
            </div>
    </div>
</div>
</template>

<script>
import EditGenreForm from '@/components/EditGenreForm.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js";


export default {
    name: 'DeleteGenre',

    components: {
    },
    
    data: function() {
        return {
            gsecurity: GSecurity,
            genre: undefined,
            parentGenreId: undefined,
            cancelButtonId: undefined,
            gtrans: undefined,
        }
    },

    beforeMount() {
        if (!this.gsecurity.hasRole('ADMIN')) {
            this.$router.push({name: "error"});
        } else {
            this.gsecurity = GSecurity
            var GAxiosToken = this.gsecurity.getToken();
            var authorizedGAxios = GAxios;
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token '+GAxiosToken;
        }
    },


    methods:{
        deleteGenre() {

            NProgress.start();
            GAxios.delete(endpoints.createGenre+this.genre.id+'/', {
            }).then(response => {
                //console.log(response);
                this.$router.push('/manageGenres/'+this.cancelButtonId);
            }).catch(ex => {
                //console.log(ex);
                //console.log(ex.response.data.error);
                this.errors = ex.response.data.error;
                document.getElementById("errorsDiv").style.display = "block";
            }).then( () => {
                NProgress.done();
            })
        },
    },

    mounted: function() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();
        this.genre = this.$attrs.genre;
        this.parentGenreId = this.$attrs.parentGenreId;

        if(this.parentGenreId == 1){
            this.cancelButtonId = 'all';
        }
        else{
            this.cancelButtonId = this.parentGenreId;
        }

        if(this.parentGenreId == undefined){
            this.$router.push('/manageGenres/all');
        }
        
    },

    created() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
    },
}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

     @media (min-width:768px)  {
         .contentDelete{
            border-radius: 10px;
            box-shadow: 0px 2px 8px 0px rgba(251, 77, 8, 0.801) !important;
            padding: 40px !important;
            width: 50%;
        }

        .everything {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5%;
            text-align: center;
            padding: 15px;
            padding-top: 30px;
            margin-left: 10%;
            margin-right: 10%;
            margin-top:0%;
        }


     }

     .everything {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5%;
            text-align: center;
            padding: 15px;
            padding-top: 30px;
            margin-left: 3%;
            margin-right: 3%;
            margin-top:0%;
        }

    .hireText {
        padding: 0px 10px 0px 10px;
        color: white !important;
    }

    .contentButtons{
        display:flex;
        justify-content: center;
        align-content: center;
        margin-top: 30px;
    }

    .contentDelete{
        padding: 10px;
    }

    .editButton {
    font-size: 18px;
    font-weight:bold;
    color: white !important;
    margin-left: 5px;
    margin-right: 5px;
    border: none;
    border-radius: 30px;

    background-image: linear-gradient(to right, #a2a2a2, #474747);
  }

  .editButton:hover{
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.7) !important;
    background-image: linear-gradient(to right, #515151, #232323) !important;
}

.deleteButton {
    font-size: 18px;
    font-weight:bold;
    color: white !important;
    margin-left: 5px;
    margin-right: 5px;
    border: none;
    border-radius: 30px;

    background-image: linear-gradient(to right, #FB8600, #FF0000);
}

.deleteButton:hover{
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.7) !important;
    background-image: linear-gradient(to right, #ED7F00, #A20101) !important;
}   

    


</style>
