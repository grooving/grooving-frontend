<template>
    <div class="aboutContent">
        <p class="title">{{gtrans.translate('about_title')}}</p>
            <span class="text"><AboutText :aboutUs="this.aboutUs" /></span>
        </div>
    </div>
</template>

<script>
import AboutText from '@/components/AboutText.vue'
import GSecurity from '@/security/GSecurity.js';
import GAxios from '@/utils/GAxios.js';
import GTrans from "@/utils/GTrans.js";

export default {

    name: 'AboutView',
    components: {
        AboutText, 
    },
    data() {
        return {

            //Hiring Process...
            gsecurity: GSecurity,
            aboutUs: undefined,
            gtrans: GTrans,
        }
    },

    mounted() {

        NProgress.start();

        GAxios.get('/about')
        .then(response => {

        this.aboutUs = response.data;
        
        }).then( () => {NProgress.done()});

    },

    created() {

        // Retrieve store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
    }
    
}
</script>

<style>

    
    * {
        font-family: "Archivo"
    }

    .aboutContent{
        margin-left: 20%;
        margin-right: 20%;
        padding-top: 30px;
    }

    .title{
        font-size: 50px;
        font-weight: bold;
    }

    

</style>
