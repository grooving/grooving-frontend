<template>
    <div class="content">
        <form>
            <label for="" class="subtitle" style="font-weight:bold;">{{gtrans.translate('perfomanceDuration')}} </label>
            <label for="" class="subtitle">&nbsp;{{duration}}h</label>
            <div class="input-group">
                <input v-model="priceHour" type="number" class="form-control" :min="minPrice" step="0.01" v-on:change="priceSelected()">
                <div class="input-group-append">
                    <span class="input-group-text">€/h</span>
                </div>
            </div>
            <div class="continueButtonDiv">
                <div @click="confirmPrice()" class="btn btn-primary continueButton">
                    <span class="continueText">{{gtrans.translate('continueButton')}}</span>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import GSecurity from "@/security/GSecurity.js";
import GTrans from "@/utils/GTrans.js";

export default {
    name: "CustomPrice",

    components: {
    },

    data: function() {
        return {
            priceHour: 8,
            emitPrice: undefined,
            gsecurity: GSecurity,
            gtrans: undefined,
        };
    },

    methods: {
        priceSelected() {
            if(this.priceHour < parseFloat(this.minPrice)) {
                this.priceHour = this.minPrice;
            } 
            this.$emit('priceSelected', Math.round(this.priceHour * this.duration * 100) / 100);
            this.totalPrice();
        },

        totalPrice: function() {
            var res = Math.round(this.priceHour * this.duration * 100) / 100;
            this.emitPrice = res;
            return res;
        },

        confirmPrice: function(){
            this.$emit('confirmPrice');
        }
    },

    props: {
        duration: {
            type: Number,
            default: 3.5,
        },
        minPrice: {
            type: Number,
            default: 0.01,
        }
    },
    created() {
      this.gsecurity = GSecurity;
      this.gsecurity.obtainSavedCredentials();
      this.gtrans = new GTrans(this.gsecurity.getLanguage());
        
      // Podemos cambiar el lenguaje así para debug...
      //this.gtrans.setLanguage('es')
      //this.gtrans.setLanguage('en')

    },
    mounted: function() {
        this.priceHour = this.$props.minPrice;
        this.totalPrice();
        this.priceSelected();
    },
}
</script>

<style scoped>

    .continueButton {
        background-image: linear-gradient(to right, #00fb82, #187fe6);
        border: none;
        border-radius: 30px;
        font-size: 18px;
        font-weight: bold;
        padding-left: 4%;
        padding-right: 4%;
        width: fit-content;
    }

    .continueButton:hover {
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
    }

    input:focus {
        border-color: #00fb82;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        color:black;
        font-weight: semibold;
    }

    .input-group {
        max-width: 500px;
        margin: 0 auto; 
        padding-top: 25px; 
        padding-bottom: 25px;
    }
    
    input:hover {
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .3) !important;
    }

    select:focus {
        border-color: #00fb82;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        color:black;
        font-weight: semibold;
    }

    select:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .5) !important;
    }
    
    .subtitle {
        font-size: 24px;
        margin-bottom: 0;
    }

    @media (max-width:767px)  {
        .content {
            margin-left: 3%;
            margin-right: 3%;
            padding-top: 5%;
        }
    }

    @media (min-width:768px)  {

        .content{
            align-items: center;
            border-radius: 10px;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
            display: flex;
            height: 305px;
            margin-left: 3%;
        }

        .continueButton {
            margin-left: 25%;
            margin-right: 25%;
        }
        
        form{
            margin-bottom: 0;
            margin-left: 4%;
            margin-right: 4%;
            margin-top:5px;
            width: 320px;
        }
    }
</style>
