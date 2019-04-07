<template>
    <div class="content">
        <form>
            <div class="form-row">
                <div class="form-group col-12">
                    <span class="card-title" style="font-weight:bold;font-size:30px;margin-bottom:12px">Fare Hiring </span>
                    <router-link v-if="!empty" v-bind:to="{name: 'editFare', params: {fixedPrice, packageId, fareId}}" style="height: 28px; width: 28px; margin-bottom:12px;">
                        <i class="material-icons iconOffer">create</i>
                    </router-link>
                    <h6 class="card-subtitle mb-2 text-muted">You can set a fixed price you'll gain per hour. </h6>
                    <div v-if="!empty" style="width:100%;margin-top:25px;overflow:auto;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">FIXED PRICE</p>
                        <p class="card-text" style="float:right;">{{fixedPrice}} €/h</p>
                    </div>
                    <router-link v-else v-bind:to="{name: 'createFare'}">
                        <div class="continueButtonDiv">
                            <b-button class="continueButton" variant="primary" size="sm" type="submit">ADD NEW</b-button>
                        </div>
                    </router-link>
                </div>  
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "FareHiring",

    props: {
        fixedPrice: {},
        packageId: {},
        fareId: {},
        empty: {
            default: false
        }
        
    },
}
</script>

<style scoped>

    a.router-link-active {
        color: #187fe6 !important;
    }

    .content {
        padding: 10px;
    }

    .continueButton {
        font-size: 22px;
        font-weight: bold;
        border: none;
        border-radius: 30px;
        width: 45%;
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .continueButton:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .continueButtonDiv {
        margin-top: 30px;
        margin-bottom: 5%;
        display: flex;
        justify-content: center;
    }


    .form-group.col-12 {
        margin-bottom: 0px;
        min-height: 170px;
    }

    .iconOffer  {
         font-size: 28px;
         float: right;
    }

    @media (max-width:767px)  {
        .content{
            padding-top: 5%;
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
            margin-top: 10% !important;
            margin-left: 3%;
            border-radius: 10px;
            display: flex;
            align-items: center;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
        }
    }

</style>