<template>
     <div class="content">
        <form>
            <div class="align-items-center">
                <div class="col-auto">
                    <div class="input-group mb-2">
                        <input v-model="minutes" type="number" min="00" max="23" class="form-control" placeholder="HH" maxlength="2" onchange="if(parseInt(this.value,10)<10)this.value='0'+this.value;">
                        <div class="input-group-text">h</div>
                        
                        <span style="padding-left: 10px; padding-right: 10px;">:</span>
                        <input v-model="hour" type="number" min="00" max="59" class="form-control" placeholder="MM" maxlength="2" onchange="if(parseInt(this.value,10)<10)this.value='0'+this.value;">
                        <div class="input-group-text">min</div>
                    </div>
                </div>
            </div>
            <div class="align-items-center">
                 <div class="btn btn-primary continueButton" @click="getDateInputs(hour, minutes)"><span class="continueText">CONTINUE</span></div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "StartingDatePicker",
    data (){
        return {
            hour: undefined,
            minutes: undefined,
        }
    },
    props: {
        hour: {
            type: Number
        },
        minutes: {
            type: Number
        }
    },
    components: {
    },
    methods: {
        getDateInputs(hour, minutes) {
            this.$emit('startingHour', hour, minutes);
        }
    }
}
</script>

<style scoped>
    .content{
        display: flex;
        align-content: center;
        justify-content: center;
    }

    .continueButton {
        margin-top: 50px;
        font-size: 22px;
        font-weight: bold;
        border: none;
        border-radius: 30px;
        width: 45%;
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .continueButton:hover{
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
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

    input{
        border-radius: 3px !important;
        margin-right: 3px;
        text-align: center;
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
            padding-top: 10%;
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
            margin-bottom: 10px;
            margin-left: 3%;
            border-radius: 10px;
            display: flex;
            align-items: center;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
            height: 303.75px;
        }
    }

</style>
