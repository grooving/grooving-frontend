<template>
    <div>
        <div>
            <vuejs-datepicker v-if="this.gtrans.getLanguage() == 'es'" @input="datePickerDate" :value="model.date" v-model="model.date" :disabledDates="disabledDates"  :monday-first="true" :full-month-name="true" :inline="true" :language="es"></vuejs-datepicker>
            <vuejs-datepicker v-if="this.gtrans.getLanguage() == 'en'" @input="datePickerDate" :value="model.date" v-model="model.date" :disabledDates="disabledDates"  :full-month-name="true" :inline="true" ></vuejs-datepicker>
            
        </div>
    </div>
</template>

<script>

var today = new Date();
var yesterday = new Date();
yesterday.setFullYear(today.getFullYear(), today.getMonth(), today.getDate() - 1)
yesterday.setHours(23)
yesterday.setMinutes(59)
yesterday.setSeconds(59)
yesterday.setMilliseconds(999)

import GSecurity from "@/security/GSecurity.js"
import GTrans from "@/utils/GTrans.js"
import { es } from 'vuejs-datepicker/dist/locale'

export default {
    name: "Calendar",

    data () {
        return {
            model: {
                date: "",
            },
            currentDate: new Date(),
            disabledDates: {},
            gtrans:undefined,
            gsecurity: undefined,
            es: es
        }
    },

    props: {
        availableDates: Array,
        stringToDates: Array,
    },

    components: {
        vuejsDatepicker
    },

    methods:{
        datePickerDate(){
            var fecha = this.model.date.getFullYear() + '-' + (this.model.date.getMonth()+1) + '-' + this.model.date.getDate();

            this.$emit('datePickerDate', fecha);
        }
    },

    created: function() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
        
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es');
        //this.gtrans.setLanguage('en')


        var res = Array();

        for (var i = 0; i < this.availableDates.length; i++) { 
            res.push(new Date(this.availableDates[i]));
        }

        this.stringToDates = res;

        this.disabledDates = {
            to: yesterday,
            dates: this.stringToDates,
        }
    }
}
</script>

<style>

    .vdp-datepicker__calendar header span {
        font-weight: bold;
    }

    .vdp-datepicker__calendar .cell.day-header {
        color: #187FE6;
        font-weight: bold;
    }

    .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
        border: none !important;
    }

    .vdp-datepicker__calendar .cell.selected {
        background-image: linear-gradient(to right, #00fb82, #187fe6);
        
        border: none;
        border-radius: 30px;

        color: #ffffff;
    }

    .vdp-datepicker__calendar .cell.selected:hover {
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .vdp-datepicker__calendar .cell.selected.cell.highlighted {
        background-image: linear-gradient(to right, #00fb82, #187fe6) !important;
        color: white !important;
        font-weight: bolder;
        border: solid white;
        /*box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .5) !important;*/
    }

    .vdp-datepicker__calendar .cell.highlighted {
        background-image: linear-gradient(to right, #92ffca, #8dc4fc) !important;
        border-radius: 25px;
        border: solid white;
    }

    .vdp-datepicker__calendar .cell.highlighted:hover{
        background-image: linear-gradient(to right, #e57373, #ffcc80) !important;
    }

    .vdp-datepicker__calendar .cell.selected.cell.highlighted:hover{
        background-image: linear-gradient(to right, #c62828, #ef6c00) !important;
        border: solid white;
    }

</style>

<style scoped>
    * {
        color: #000000;
    }
</style>

