<template>
    <div class="everything">
        <div class="title"><p>Your account has been successfully created</p></div>
        <div class="tarjeta">
            <div class="confirmation"><img class="tick" src="@/assets/img/approved_tick.png"/>
                <p class="sentText">{{sentText}}</p>
            </div>
            <p class="notice">{{noticeText}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegisterConfirmation',

    components: {
    },

    data: function() {
        return {
        };
    },

    props: {
        sentText: {
            type: String,
            default: 'Thank You',
        },
        noticeText: {
            type: String,
            default: "You will receive a welcome email shortly.",
        },
        created: false,
    },

    beforeMount: function() {
        if (!this.created) {
            this.$router.push({name: "error"});
        }
    },
}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

    .everything{
        margin-top: 75px;
        align-items: center;  /*Aligns vertically center */
        justify-content: center; /*Aligns horizontally center */
    }

    .confirmation {
        padding-bottom: 10%;
        padding-top: 10%;
        width: 100%;
    }

    .notice {
        color: grey; 
        font-size: 125%; 
        font-weight: bold; 
        margin-left: 3%; 
        margin-right: 3%; 
        padding-bottom: 10px;
    }

    .sentText {
        font-size: 35px;
        margin-bottom: 0px;
        color: #187FE6;
    }

    .tarjeta {
        align-items: center;
        border-radius: 10px;
        box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
        display: flex;
        justify-content: center;
        margin-left: 10px;
        margin-right: 10px;
        min-height: 370px;
        min-width: 335px;
        width: 25%;
    }

    .tick{
        margin-top: 10px;
        width: 140px;
    }

    .title {
        display: block;
        font-size: 50px;
        font-weight: bold;
        margin-bottom: 0%;
        margin-left: 10%;
        margin-right: 12%;
    }

    @media (min-width:768px)  {

        .everything{
            margin-bottom: 5%;
        }

        .tarjeta {
            border-radius: 10px;
            box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
            display: inline-block;
            height: 305px;
        }

        .confirmation {
            padding-bottom: 2.5%;
            padding-top: 2.5%;
            width: 100%
        }

        .notice {
            color: grey; 
            display: inline-block;
            font-size: 125%; 
            font-weight: bold; 
            width: 80%;
        }
    }

    @media (max-width:767px)  {

        .confirmation {
            padding: 0px;
        }
        
        .notice {
            color: grey; 
            font-weight: bold;
            margin: auto;
            width: 80%;
        }

        .tarjeta {
            border-radius: 0px;
            box-shadow: none;
            display: block;
            margin: 0px;
            min-width: 320px;
            min-height: 200px;
            text-align: center;
            width: 100%;
            margin-bottom: 5%;
        }

        .title {
            font-size: 40px;
        }
    }

</style>
