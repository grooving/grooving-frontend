<template>
    <div class="content">
        <form>
            <div class="form-row">
                <div class="form-group col-12">
                    <span class="card-title" style="font-weight:bold;font-size:30px;margin-bottom:12px">{{gtrans.translate('performance_title')}}</span>
                    
                    <router-link v-bind:to="{name: 'editPerformance', params: {description, duration, fixedPrice, packageId, performanceId}}" style="height: 28px; width: 28px; margin-bottom:12px;">
                        <i class="material-icons iconOffer">create</i>
                    </router-link>
                    <h6 class="card-subtitle mb-2 text-muted">{{gtrans.translate('performance_subtitle')}}</h6>
                    <div style="width:100%;margin-top:25px;overflow:auto;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('performance_description')}}</p>
                        <p class="card-text" style="float:right;">{{description}}</p>
                    </div>
                    <hr/>
                    <div style="width:100%;margin-top:25px;overflow:auto;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('performance_duration')}}</p>
                        <p class="card-text" style="float:right;">{{duration}} h</p>
                    </div>
                    <hr/>
                    <div style="width:100%;margin-top:25px;overflow:auto;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">{{gtrans.translate('performance_fixedPrice')}}</p>
                        <p class="card-text" style="float:right;">{{fixedPrice}} €</p>
                    </div>
                </div>  
            </div>
        </form>
    </div>
</template>

<script>
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js";

export default {
    name: "PerformanceHiring",
    data () {
        return {
            gsecurity: GSecurity,
            gtrans: undefined,
        }
    },
    props: {
        description: {},
        duration: {},
        fixedPrice: {},
        packageId: {},
        performanceId: {}
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

    a.router-link-active {
        color: #187fe6 !important;
    }

    .content {
        padding: 10px;
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