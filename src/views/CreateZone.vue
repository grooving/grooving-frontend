<template>
<div class="prueba">
    <div class="everything">
        <div>
          <div class="zoneForm"><CreateZoneForm :key="parentZone" :parentZone="parentZone"/></div>
        </div>
    </div>
</div>
</template>

<script>
import CreateZoneForm from '@/components/CreateZoneForm.vue';
import GSecurity from '@/security/GSecurity.js';

export default {
    name: 'CreateZone',
    components: {
        CreateZoneForm,
    },
    data: function() {
        return {
            gsecurity: GSecurity,
            parentZone: undefined,
        }
    },
    mounted: function() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        if(this.$attrs.parentZone == undefined){
            this.$router.push('/manageZones/all');
        }
        else{
            this.parentZone = (this.$attrs.parentZone);
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
