<template>
    <div class="content">
        <form>
            <div class="form-row">
                <div class="form-group col-12">
                    <h5 class="card-title" style="font-weight:bold;font-size:30px;">{{gtrans.translate('profile_title')}}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{gtrans.translate('info_subtitle')}}:</h6>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('user_firstName')}}</p>
                        <p class="card-text" style="float:right;">{{name}}</p>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('user_lastName')}}</p>
                        <p class="card-text" style="float:right;">{{surnames}}</p>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('customer_zone')}}</p>
                        <p class="card-text" style="float:right;">{{zone}}</p>
                    </div>
                </div>  
            </div>
        </form>
    </div>
</template>

<script>
import GSecurity from "@/security/GSecurity.js"
import GTrans from "@/utils/GTrans.js"

export default {
    name: "ReducedInfo",

    components: {
    },

    data: function() {
        return {
            gsecurity: GSecurity,
            gtrans: undefined,
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

    created: function(){
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
        
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')
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
