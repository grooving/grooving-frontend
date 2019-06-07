<template>
<div class="prueba">
    <div id="errorsDiv" class="validationErrors vertical-center">
        <p style="margin: 0px;">{{errors}}</p>
    </div>
    <div class="everything">
        <div class="editZoneForm">
          <div><EditZoneForm v-if="zone" :key="zone" :zone="zone" :parentName="parentName" @error="error"/></div>
        </div>
    </div>
</div>
</template>

<script>
import EditZoneForm from '@/components/EditZoneForm.vue';
import GSecurity from '@/security/GSecurity.js';

export default {
    name: 'EditZone',

    components: {
        EditZoneForm
    },
    
    data: function() {
        return {
            gsecurity: GSecurity,
            parentName: undefined,
            zone: undefined,
            errors : "",
        }
    },
    mounted: function() {
        if (!this.gsecurity.hasRole('ADMIN')) {
            this.$router.push({name: "error"});
        } else  {
            this.gsecurity = GSecurity;
            this.gsecurity.obtainSavedCredentials();
            this.zone = (this.$attrs.zone);
            this.parentName = (this.$attrs.parentName);
        }

        if(this.zone == undefined){
            this.$router.push('/manageZones/all');
        }
    },
    methods: {
        error(error) {
            //console.log(error)
            this.errors = error;

            document.getElementById("errorsDiv").style.display = "block";
            window.scrollTo(0,0);
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
        margin-bottom: 14px;
        padding: 10px;
        padding-top: 12px;
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
