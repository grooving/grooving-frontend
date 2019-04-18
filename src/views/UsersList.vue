<template>
    <div class="container-fluid">
        <div class="container mt-5">
            <UserList :listTitle="'All Users'" :users="datos" />
        </div>
    </div>
</template>

<script>
  
import UserList from '@/components/UserList.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';

export default {
    name: 'UsersList',

    components: {
        UserList
    },

    data: function(){
        return{
            datos: Array(),
        }
    },

    methods:{
        getUsers: function(){
            NProgress.start();

            GAxios.get(endpoints.users, {
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

    beforeMount(){
        this.getUsers();
    },
}
</script>
