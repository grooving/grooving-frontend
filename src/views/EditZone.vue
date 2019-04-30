<template>
<div class="prueba">
    <div class="everything">
        <div class="editZoneForm">
          <div><EditZoneForm :key="zone" :zone="zone" :parentName="parentName" @error="error"/></div>
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
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();
        this.zone = (this.$attrs.zone);
        this.parentName = (this.$attrs.parentName);
    },
    methods: {
        error(error) {
            console.log(error)
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
