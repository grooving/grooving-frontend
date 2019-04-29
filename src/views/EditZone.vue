<template>
<div class="prueba">
    <div class="everything">
        <div class="paymentSelect">
          <div class="paymentOptions"><EditZoneForm :key="zone" :zone="zone" :parentName="parentName"/></div>
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
        }
    },
    mounted: function() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();
        this.zone = (this.$attrs.zone);
        this.parentName = (this.$attrs.parentName);
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
