<template>
    <div class="content">
    <form v-on:submit.prevent.prevent="addressDataSelected()">
        <div class="form-row" style="margin-top:15px">
            <div class="form-group col-12">
                <input v-model="street" type="text" maxlength="100" class="form-control" v-bind:placeholder="gtrans.translate('addressData_address')" required>
            </div>  
        </div>
        <div class="form-row">
            <div class="form-group col-7">
                <input v-model="location" type="text" maxlength="100" class="form-control" v-bind:placeholder="gtrans.translate('addressData_town')" required>
            </div>  
            <div class="form-group col-5">
                <input v-model="zipcode" type="number" maxlength="50" min="0" class="form-control" v-bind:placeholder="gtrans.translate('addressData_zipcode')" required>
            </div>  
        </div>
        <!-- <div class="form-row">
            <div class="form-group col-12">
                <input v-model="location" type="text" class="form-control" placeholder="Location" required>
            </div>  
        </div> -->
        
            <div class="row filter-item " style="margin-bottom: 15px">
                <b-form-select v-model="singleSelectorValue" style="width:90%; margin:0 auto;" required>
                    <option :value="undefined" disabled>{{gtrans.translate('addressData_artistProvinces')}}</option>
                    <option v-for="zone in zones" :key="zone.name" :value="zone.id">
                        
                        <span>{{zone.name}}</span>
                    </option>
                </b-form-select>
            </div>

        <button class="btn btn-primary continueButton" >
                <span class="continueText">{{gtrans.translate('continueButton')}}</span></button>
    </form>
    </div>
</template>


<script>

import GTrans from "@/utils/GTrans.js";
import GSecurity from '@/security/GSecurity.js';

export default {
    name: "AddressData",
    props: {
        nextStep: {
            type: String,
            default: '',
        },
        selector_filters: Array,
        zones: Array,
        
    },
    data() {
        return {
            location: undefined,
            zipcode: undefined,
            street: undefined,
            singleSelectorValue: undefined,
            gtrans: undefined,
        }
    },
    mounted() {
        this.nextStep = '/eventInput/' + this.$route.params['artistId']
    },
    methods: {
        addressDataSelected(){
            this.$emit('addressSelected', [this.location, this.zipcode, this.street, this.singleSelectorValue]);
        },
    },

    created() {

        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
        
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')
    }
}
</script>

<style scoped>
    
    input:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .3) !important;
    }

    select:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .5) !important;
    }

    input:focus{
        border-color: #00fb82;
        font-weight: semibold;
        color:black;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        
    }

    select:focus{
        border-color: #00fb82;
        font-weight: semibold;
        color:black;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        
    }

    .continueButton {
        font-size: 18px;
        padding-left: 4%;
        padding-right: 4%;
        border: none;
        border-radius: 30px;
        width: fit-content;
        margin-top: 2%;
        font-weight: bold;
    
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .continueButton:hover{
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    

    @media (max-width:767px)  {
        .content{
            padding-top: 5%;
            margin-right: 3%;
            margin-left: 3%;
    }
    }

    @media (min-width:768px)  {

        .continueButton{
            
            margin-right: 25%;
            margin-left: 25%;
        }
        
        form{
            margin-top:5px;
            width: 320px;
            margin-right: 4%;
            margin-left: 4%;
            margin-bottom: 0;
        }

        .content{
            margin-left: 3%;
            height: 290px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
            
            
        }

        .entrada{
            width: 5px !important;
        }
    }


</style>
