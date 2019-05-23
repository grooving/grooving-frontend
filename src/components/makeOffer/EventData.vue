<template>
    <div class="content">
    <form v-on:submit.prevent.prevent="eventDataSelected()">
        <div class="form-row">
            <div class="form-group col-12">
                <textarea v-model="description" type="text" class="form-control" style="resize: none;" maxlength="500"
                    v-bind:placeholder="this.gtrans.translate('description_placeholder')" rows="7" required></textarea>
            </div>  
        </div>
        <button class="btn btn-primary continueButton"><span class="continueText">{{gtrans.translate('continueButton')}}</span>
        </button>
    </form>
    </div>
</template>

<script>
import GSecurity from "@/security/GSecurity.js"
import GTrans from "@/utils/GTrans.js"

export default {
    name: "EventData",
    data() {
        return {
            description: undefined,
            gsecurity: GSecurity,
            gtrans: undefined,
        }
    },
    props: {
        continueURI: {
            type: String,
            default: 'paymentSelector'
        },
        nextStep: {
            type: String,
            default: '',
        },
    },
    methods: {
        eventDataSelected(){
            this.$emit('eventDataSelected', this.description);
        }
    },
    created: function(){
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
    
    textarea:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .3) !important;
    }

    select:hover{
        border-color: #187fe6;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .5) !important;
    }

    textarea:focus{
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
            height: 305px;
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
