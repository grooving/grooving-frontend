<template>
    <div>
        <div class="card tarjeta">
            <div id="title"><strong>{{title}}</strong></div>
            <div id="graphWrapper" class="vertical-center">
                <div id="graphContainer" class="graphContainer">
                    <div :class="graphClassIdentifier"></div>
                </div>
            </div>
            <div class="vertical-center px-0">
                <button class="btn-primary gButton" v-on:click="toggleData()"><span class="continueText">{{buttonTitle}}</span></button>
            </div>
        </div>
    </div>
</template>

<script>
import GSecurity from "@/security/GSecurity.js"
import GTrans from "@/utils/GTrans.js"

export default {
    name: "CircleProgressGraph",

    data: function(){
        return{
            gsecurity: GSecurity,
            gtrans: undefined,

            bar: undefined,
            isDisplayingTotal: true,
        }
    },

    computed: {

        graphClassIdentifier: function(){
            return 'cpg-' + this.$props.graphId;
        },

        title: function(){

            var res = this.$props.graphTitle;

            if(!this.isDisplayingTotal)
                res += " - " + this.gtrans.translate('statistics_showLastMonth');

            return res;
        },

        buttonTitle: function(){
            var res = ''

            if(this.gtrans){
                if(this.isDisplayingTotal)
                    res = this.gtrans.translate('statistics_showLastMonth');
                else
                    res = this.gtrans.translate('statistics_showTotal');                    
            }

            return res;
        }

    },

    props: {
        
        graphTitle:{
            type: String,
            required: true,
        },

        graphId:{
            type:String,
            required: true,
        },

        percentageTotal:{
            type: Number,
            default: 0.0,
        },

        percentageLastMonth:{
            type: Number,
            default: 0.0,
        }
    },

    methods:{

        toggleData(){

            this.bar.set(0);


            if(this.isDisplayingTotal){
                // Cambiamos a LastMonth
                this.bar.animate(this.$props.percentageLastMonth);
            }else{
                // Cambiamos a Total
                this.bar.animate(this.$props.percentageTotal);
            }

            this.isDisplayingTotal = !this.isDisplayingTotal;

        },

    },

    created: function() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
    
        // Podemos cambiar el lenguaje así para debug...
        // this.gtrans.setLanguage('es')
        // this.gtrans.setLanguage('en')
    },

    mounted: function() {
        
        var ProgressBar = require('progressbar.js')
        this.bar = new ProgressBar.Circle('.' + this.graphClassIdentifier, {
        color: 'url(#gradient)',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 10,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        // Set default step function for all animate calls
        step: function(state, circle) {

            var value = Math.round(circle.value() * 100);
            
            circle.setText(value + '%');
            

        }
        });
        this.bar.text.style.fontSize = '2rem';

        this.bar.animate(this.$props.percentageTotal);  // Number from 0.0 to 1.0

        let linearGradient = `
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="20%" stop-color="#00fb82"/>
            <stop offset="50%" stop-color="#187fe6"/>
            </linearGradient>
        </defs>
        `

        this.bar.svg.insertAdjacentHTML('afterBegin', linearGradient);

    }
}
</script>

<style scoped>
    .tarjeta {
        max-width: 400px;
        width: 95%;
        min-width: 290px;
        margin: 0 auto !important;
        border-radius: 20px;
        box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
        padding: 15px;
        margin-bottom: 15px !important;
    }

    .graphContainer{
        margin: 20px;
        width: 200px;
        height: 200px;
        position: relative;
    }

    .gButton {
        font-size: 24px;
        font-weight:bold;
        max-width: 200px;
        min-width: 150px;

        
        border: none;
        border-radius: 30px;

        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .vertical-center {
    display: flex;
    align-items: center; /*Aligns vertically center */
    justify-content: center; /*Aligns horizontally center */
    }
</style>

