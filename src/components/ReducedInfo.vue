<template>
    <div class="content">
        <form>
            <div class="form-row">
                <div class="form-group col-12">
                    <h5 class="card-title" style="font-weight:bold;font-size:30px;">Profile</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Some basic info about the customer:</h6>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">NAME</p>
                        <p class="card-text" style="float:right;">{{name}}</p>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">SURNAMES</p>
                        <p class="card-text" style="float:right;">{{surnames}}</p>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">ZONE</p>
                        <p class="card-text" style="float:right;">{{zone}}</p>
                    </div>
                </div>  
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "ReducedInfo",

    components: {
    },

    data: function() {
        return {
        };
    },


    props: {
        name: {
            type: String,
            default: ''
        },
        surnames: {
            type: String,
            default: ''
        },
        zone: {
            type: String,
            default: ''
        },
    },

    beforeMount: function() {
        if (this.name == '') {
            this.$router.push({name: "error"});
        }
    },
}
</script>

<style scoped>
    
    .content {
        padding: 10px;
    }

    .form-group.col-12 {
        margin-bottom: 0px;
    }

    @media (max-width:767px)  {
        .content{
            padding-top: 5%;
            margin-right: 3%;
            margin-left: 3%;
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
