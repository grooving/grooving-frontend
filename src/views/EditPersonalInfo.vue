<template>
<div class="prueba">
    <div class="everything">
        <div class="paymentSelect">
          <div class="paymentOptions"><EditProfileInfo :name="name" :surnames="userSurnames" :artisticName="artisticName" :email="userEmail" :phoneNumber="userPhoneNumber" :username="username"/></div>
        </div>
    </div>
</div>
</template>

<script>
import EditProfileInfo from '@/components/EditProfileInfo.vue';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';

export default {
    name: 'EditPersonalInfo',
    components: {
        EditProfileInfo
    },
    
    data: function() {
        return {
            gsecurity: GSecurity,

            name: '',
            userSurnames: '',
            username: '',
            userEmail: '',
            userPhoneNumber: '',
            artisticName: '',
        };
    },

    beforeMount: function(){

        if (!this.gsecurity.isAuthenticated() || this.gsecurity.hasRole('ADMIN')) {
            this.$router.push({name: "error"});

        } else {        
            this.gsecurity = GSecurity
            var GAxiosToken = this.gsecurity.getToken();


            var authorizedGAxios = GAxios;
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token '+GAxiosToken;

            var role = this.gsecurity.getRole();

            
            if(role=='CUSTOMER'){
                NProgress.start();
                //alert(GAxiosToken)
                authorizedGAxios.get(endpoints.customerPersonalInformation)
                    .then(response => {
                        var personalInformation = response.data.user;
                        //console.log(personalInformation);
                        //console.log(response);
                        
                        this.name=personalInformation['first_name']
                        this.userSurnames = personalInformation['last_name'];
                        this.userEmail=personalInformation['email'];
                        this.userPhoneNumber = response.data.phone;
                        this.username = personalInformation['username'];                    
                }).then(() => {
                    NProgress.done()
                });
            }

            

            if(role=='ARTIST'){
                NProgress.start();
                //alert(GAxiosToken)
                authorizedGAxios.get(endpoints.artistPersonalInformation)
                    .then(response => {
                        var personalInformation = response.data.user;
                        //console.log(personalInformation);
                        //console.log(response);
                        
                        this.name=personalInformation['first_name']
                        this.userSurnames = personalInformation['last_name'];
                        this.userEmail=personalInformation['email'];
                        this.userPhoneNumber = response.data.phone;
                        this.username = personalInformation['username'];  
                        this.artisticName = response.data.artisticName['artisticName'];

                }).then(() => {
                    NProgress.done()
                });
            }
        }
    }
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
