<template>
    <div class="hell">
        <GenresList :depth="depth" :genreBackLink="genreBackLink" :parentGenreName="genreParentName" :parentGenreId="genreParentId" :grandParentGenreId="grandParentId" :genres="genreChildren" />
    </div>
</template>

<script>
import GenresList from '@/components/GenresList.vue'
import GSecurity from '@/security/GSecurity.js';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';

export default {

    name: 'ManageGenres',
    components: {
        GenresList, 
    },
    data() {
        return {
            gsecurity: GSecurity,
            genreParentId: undefined,
            genreParentName: undefined,
            grandParentId: undefined,
            genreBackLink: undefined,
            genreChildren: Array(),
            depth: undefined,

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

    mounted() {
        NProgress.start();
        this.genreId = this.$route.params['genreId'];
        //alert(this.genreId);
        if(this.genreId=='all'){
            this.genreId='true';
        }
        else if(this.genreId=='1'){
            this.$router.push('/error');
        }
        
        GAxios.get(endpoints.listGenres+this.genreId)
            .then(response => {
                //console.log(response);
                this.depth = response.data.depth;
                if(this.depth > 2){
                    //console.log('Error: You cannot access to this list.');
                    this.$router.push('/error');
                }
                else{
                    if(this.genreId!='true'){
                        this.genreParentName = response.data.name;
                        this.genreParentId = response.data.id;
                        this.grandParentId = response.data.parent;
                        
                        if(this.grandParentId == 1){
                            this.genreBackLink = 'all'
                        }
                        else{
                            this.genreBackLink = this.grandParentId;
                        }
                        this.genreChildren = response.data.children;


                    }
                    else{
                        this.genreParentId = response.data.id;
                    if(this.genreParentId == null){
                        this.genreParentId = 1;
                    }
                    this.genreChildren = response.data.children;
                }

                }
                
        }).catch(ex => {
            //console.log(ex);
            this.$router.push('/error');
        }).then( () => {
            NProgress.done();
        });

    },
    
}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

    .title {
        display: none;
    }

    @media (min-width:768px)  {
      
        .everything {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5%;
            text-align: center;
            padding: 15px;
            margin-left: 35%;
            margin-right: 35%;
            margin-top:0%;
        }
        .title {
            display: inline-block;
            margin-right: 12%;
            margin-left: 10%;
            text-align: left;
            font-size: 50px;
            margin-top: 5%;
            font-weight: bold;
        }
        
    }

</style>
