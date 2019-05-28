<template>
    <div class="container-fluid px-0">
        <div v-if="errors != ''" id="errorsDiv" class="validationErrors vertical-center">
            <p style="margin: 0px;">{{errors}}</p>
        </div>
        <div class="container mt-5">
            <UserList :availableData="availableData" :key="availableData" :listTitle="titleBasedOnQueries" :users="datos" @haveError="haveError"/>
        </div>
    </div>
</template>

<script>
  
import UserList from '@/components/UserList.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js"

export default {
    name: 'UsersList',

    components: {
        UserList
    },

    computed:{
        titleBasedOnQueries: function(){
            let res;

            if(!this.$route.query['username'])
                res = this.gtrans.translate('usersList')                
            else
                res = this.gtrans.translate('search_title')

            return res;
        }
    },

    data: function(){
        return{
            datos: Array(),
            gsecurity: GSecurity,
            gtrans: undefined,
            errors: "",
            availableData: true,
        }
    },

    methods:{
        haveError(error) {
            
            this.errors = error;
            //console.log('2',this.errors)
        },
        getUsers: function(){
            NProgress.start();

            var GAxiosToken = this.gsecurity.getToken();
            var authorizedGAxios = GAxios;
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token '+ GAxiosToken;
            authorizedGAxios.get(endpoints.users, {
                params: this.$route.query,
            }).then(response => {
                //console.log(response);

                var users = response.data;

                for (var i = 0; i < users.length; i++) {
                    this.datos.push({
                        userId: users[i].user.id,
                        userImage: users[i].photo,
                        userName: users[i].user.username,
                        userIsActive: users[i].user.is_active,
                    });
                }
            }).catch(error => {
                try {
                    if (error.response.data.error == null){
                        this.errors = error.message;
                    } else {
                        this.errors = error.response.data.error;
                    }  
                } catch {}

            }).then(() => {
            if(this.datos.length == 0) {
                this.availableData = false;
            }
            NProgress.done()
            });
        }
    },

    created() {
        // Retreive store credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
    
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')
    },

    beforeMount(){
        if (!this.gsecurity.hasRole('ADMIN')) {
            this.$router.push({name: "error"});
        } else {
            this.getUsers();
        }
    },
}
</script>

<style scoped>

.validationErrors{
    background-color:#f50057;
    box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);      
    color:white;
    font-weight: bold;
    padding: 10px;
    padding-top: 12px;
    width: 100% !important;
}

</style>

