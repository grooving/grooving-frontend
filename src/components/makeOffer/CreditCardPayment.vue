<template>
    <div class="content">
    <form>
        <div class="form-row">
            <div class="form-group col-8">
                <input v-model="number" maxlength="16" type="text" class="form-control" placeholder="Card number">
            </div>
            <div class="form-group col-4">
                <select id="inputState" class="form-control">
                    <option v-if="creditCardBrand === 'VISA'" selected>VISA</option>
                    <option v-else>VISA</option>
                    <option v-if="creditCardBrand === 'MASTERCARD'" selected>Master Card</option>
                    <option v-else>Master Card</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-12">
                <input v-model="name" type="text" class="form-control" placeholder="Name">
            </div>
            
        </div>

        <div class="form-row">
            <div class="form-group col entrada">
                <input v-model="month" min="1" max="12" type="number" class="form-control" placeholder="Month">
            </div>
            <div class="form-group col entrada">
                <input v-model="year" min="19" maxlength="2" type="number" class="form-control" placeholder="Year">
            </div>
            <div class="form-group col entrada">
                <input v-model="cvv" maxlength="3" type="text" class="form-control" placeholder="CVV">
            </div>
        </div>
        <div class="btn btn-primary continueButton" @click="finishPayment"><span class="continueText">SUBMIT</span></div>

    </form>
    </div>
</template>

<script>
export default {
    name: "CreditCardPayment",
    data (){
        return {
            number: undefined,
            make: undefined,
            month,
            year,
            cvv,
            name,
        }
    },
    props: {
        number: {
            type: String,
            default: '1111222233334444'
        },
        creditCardBrand: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: 'John Doe'
        },
        month: {
            type: String,
            default: '01'
        },
        year: {
            type: String,
            default: '20'
        },
        cvv: {
            type: String,
            default: '754'
        },
        continueURI: {
            type: String,
            default: 'sentOffer'
        } 
    },
    components: {
    },
    methods: {
        finishPayment() {
            this.$emit('finishPayment', [this.number, this.name, this.month, this.year, this.cvv ])
        }
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
            margin-top: 2%;
            margin-bottom: 2%;
        }
    }

    @media (min-width:768px)  {

        .continueButton{
            margin-right: 25%;
            margin-left: 25%;
            margin-top: 5px;
            margin-bottom: 5px;
        }
        
        form{
            margin-right: 4%;
            margin-left: 4%;
        }

        .content{
            margin-left: 3%;
            height: 300px;
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
