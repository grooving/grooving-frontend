<template>
<div class="prueba">
    <div id="errorsDiv" class="validationErrors vertical-center">
        <p style="margin: 0px;">{{errors}}</p>
    </div>
    <div class="everything">
            <div class="contentDelete">
                <p>{{gtrans.translate('deleteZoneWarning')}}</p>
                <h1 style="font-weight:bold; margin-top: 10px;">{{zoneName}}</h1>
                <p style="margin-top: 20px;">{{gtrans.translate('deleteZoneInfo_1')}}<strong>{{gtrans.translate('deleteZoneInfo_2')}}</strong></p>
                <hr>
                <div class="contentButtons">
                    <router-link v-bind:to="'manageZones/'+ parentZoneId" class="btn btn-primary editButton"><span class="hireText">{{gtrans.translate('cancel')}}</span></router-link>
                    <a  v-on:click="deleteZone()" class="btn btn-primary deleteButton"><span class="hireText">{{gtrans.translate('deleteZone')}}</span></a>
                </div>
            </div>
    </div>
</div>
</template>

<script>
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js";

export default {
    name: 'DeleteZone',

    props: {
        zone: Object,
    },
    
    data: function() {
        return {
            gsecurity: GSecurity,
            parentZoneId: undefined,
            zoneId: undefined,
            zoneName: undefined,
            gtrans: undefined,   
            errors: "",
        }
    },

    beforeMount() {
        if (!this.gsecurity.isAuthenticated()) {
            this.$router.push({name: "error"});
        } else {
            this.gsecurity = GSecurity
            var GAxiosToken = this.gsecurity.getToken();
            var authorizedGAxios = GAxios;
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token '+GAxiosToken;

            this.gtrans = new GTrans(this.gsecurity.getLanguage());
                
            // Podemos cambiar el lenguaje así para debug...
            //this.gtrans.setLanguage('es')
            //this.gtrans.setLanguage('en')
        }
    },


    methods:{
        deleteZone() {

            NProgress.start();
            GAxios.delete(endpoints.manageZone +this.zoneId +'/', {
            }).then(response => {
                console.log(response);
                this.$router.push('/manageZones/'+this.parentZoneId);
            }).catch(error => {
                if (error.response.data.error == null){
                    this.errors = error.message;
                } else {
                    this.errors = error.response.data.error;
                }  
                document.getElementById("errorsDiv").style.display = "block";
                window.scrollTo(0,0);
                NProgress.done();
            });
        },
    },

    mounted: function() {
        if (!this.gsecurity.hasRole('ADMIN')) {
            this.$router.push({name: "error"});
        } else  {
            this.gsecurity = GSecurity;
            this.gsecurity.obtainSavedCredentials();

            if(this.zone != undefined) {
                this.parentZoneId = this.zone.parent;
                this.zoneId = this.zone.id;
                this.zoneName = this.zone.name;
            }
        }
    },
}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

    .validationErrors{
        background-color:#f50057;
        border-radius: 5px;
        box-shadow: 0px 2px 8px 2px rgba(255, 0, 0, .3);      
        color:white;
        display: none;
        font-weight: bold;
        height: 100%;
        margin-bottom: 14px;
        padding: 10px;
        padding-top: 12px;
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
