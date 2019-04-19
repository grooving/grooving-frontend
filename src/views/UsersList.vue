<template>
    <div class="container-fluid">
        <div class="container mt-5">
            <UserList :listTitle="this.gtrans.translate('usersList')" :users="datos" />
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

    data: function(){
        return{
            datos: Array(),
            gsecurity: GSecurity,
            gtrans: undefined,
        }
    },

    methods:{
        getUsers: function(){
            NProgress.start();

            console.log(this.gsecurity.getRole());
            var GAxiosToken = this.gsecurity.getToken();
            var authorizedGAxios = GAxios;
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token '+ GAxiosToken;
            authorizedGAxios.get(endpoints.users, {
            }).then(response => {
                console.log(response);

                var users = response.data;

                for (var i = 0; i < users.length; i++) {
                    this.datos.push({
                        userId: users[i].id,
                        userImage: users[i].photo,
                        userName: users[i].user.username,
                        userIsActive: users[i].user.is_active,
                    });
                }
            }).catch(ex => {
                console.log(ex);
            }).then(() => {
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
        this.getUsers();
    },
}
</script>
