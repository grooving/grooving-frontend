<template>
    <div class="content">
        <form v-on:submit="updateZone">
            <div class="form-row">
                <div class="form-group col-12">
                    <span style="font-weight:bold;font-size:30px;">{{gtrans.translate('titleEditZone')}}</span>
                    <router-link v-bind:to="'/manageZones/'+ parentZoneId" style="height: 28px; width: 28px">
                        <i class="material-icons iconOffer">clear</i>
                    </router-link>
                    <h6 v-if="parentZoneName != ''" class="card-subtitle mb-2 text-muted">{{gtrans.translate('subtitleEditZone_1')}}<strong>{{parentZoneName}}.</strong></h6>
                    <h6 v-else class="card-subtitle mb-2 text-muted">{{gtrans.translate('subtitleEditZone_1')}}<strong>{{gtrans.translate('subtitleEditZone_2')}}</strong></h6>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('nameZone')}}</p>
                        <div class="input-group">
                            <input v-model="zoneName" type="text" class="form-control" required>
                            <div class="input-group-append">
                                <span class="input-group-text">Aa</span>
                            </div>
                        </div>
                    </div>
                    <div class="continueButtonDiv">
                        <b-button class="continueButton" variant="primary" size="sm" type="submit">{{gtrans.translate('save')}}</b-button>
                    </div>
                </div>  
            </div>
        </form>
    </div>
</template>

<script>
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js";

export default {
    name: "EditGenreForm",

    data: function() {
        return {
            errors: "",
            gsecurity: GSecurity,
            gtrans: undefined,
            tree: Array(),
            parentZoneId: undefined,
            parentZoneName: undefined,
            zoneId: undefined,
            zoneName: undefined,
        }
    },


    props: {
        zone: Object,
        parentName: String,
    },

    methods: {
        updateZone() {
            NProgress.start();

            var authorizedGAxios = GAxios;
            var GAxiosToken = this.gsecurity.getToken();
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token '+GAxiosToken;
            authorizedGAxios.put(endpoints.manageZone + this.zoneId + '/', {
                "name": this.zoneName,
                "parentZone":this.parentZoneId
            }).then(response => {
                console.log(response);
                if(this.parentId==1){
                    this.$router.push('manageZones/all');
                }
                else{
                    this.$router.push('manageZones/'+this.parentZoneId);
                }
            }).catch(ex => {
                console.log(ex);
            }).then( () => {
                NProgress.done();
            })
        },

    },

    created() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();
    
        this.gtrans = new GTrans(this.gsecurity.getLanguage());
            
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')
    },

    beforeMount: function() {
        if (!this.gsecurity.isAuthenticated()) {
            this.$router.push({name: "error"});
        } else {
            this.gsecurity = GSecurity
            var GAxiosToken = this.gsecurity.getToken();
            
        } 
    },
    mounted() {
        if(this.zone != undefined && this.parentName != undefined) {
            this.parentZoneId = this.zone.parent;
            console.log(this.parentName) 
            this.parentZoneName = this.parentName;
            this.zoneId = this.zone.id;
            this.zoneName = this.zone.name;
        }
    }
}
</script>

<style scoped>

    .content {
        padding: 10px;
    }

    .continueButton {
        font-size: 22px;
        font-weight: bold;
        border: none;
        border-radius: 30px;
        width: 45%;
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .continueButton:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .continueButtonDiv {
        margin-top: 30px;
        margin-bottom: 5%;
        display: flex;
        justify-content: center;
    }

    .iconOffer  {
         font-size: 28px;
         float: right;
    }

    input:focus{
        border-color: #00fb82;
        font-weight: semibold;
        color:black;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;   
    }

    input:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .3) !important;
    }

    select:focus{
        border-color: #00fb82;
        font-weight: semibold;
        color:black;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;   
    }

    select:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .5) !important;
    }

    @media (max-width:767px)  {
        .content{
            padding-top: 5%;
            margin-right: 3%;
            margin-left: 3%;
        }

        .iconOffer  {
            font-size: 50px;
            float: right;
        }
    }

    @media (min-width:768px)  {
        form{
            margin-top:5px;
            width: 320px;
            margin-right: 4%;
            margin-left: 4%;
            margin-bottom: 0;
        }

        .content{
            margin-top: 10% !important;
            margin-left: 3%;
            border-radius: 10px;
            display: flex;
            align-items: center;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
        }
    }

</style>