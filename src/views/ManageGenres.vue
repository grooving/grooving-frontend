<template>
    <div class="hell">
        <GenresList/>
    </div>
</template>

<script>
import GenresList from '@/components/GenresList.vue'
import GSecurity from '@/security/GSecurity.js';
import GAxios from '@/utils/GAxios.js';

export default {

    name: 'ManageGenres',
    components: {
        GenresList, 
    },
    data() {
        return {

            //Hiring Process...
            gsecurity: GSecurity,
        }
    },

    mounted() {

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
