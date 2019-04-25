<template>
    <div>
        <div class="card tarjeta">
            <canvas id="horizontal-graph" width="800" height="450"></canvas>
        </div>
    </div>
</template>

<script>
import GSecurity from "@/security/GSecurity.js"
import GTrans from "@/utils/GTrans.js"
import Chart from 'chart.js'

export default {
    name: "BarGraph",

    data: function() {
        return {
            gsecurity: GSecurity,
            gtrans: undefined,
        }
    },

    props: {
        data1: {
            type: Number,
        },
        data2: {
            type: Number,
        },
        label1: {
            type: String,
        },
        label2: {
            type: String,
        },
        title: {
            type: String,
        },
        graph_id: {
            type: String,
        }
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
        new Chart(document.getElementById("horizontal-graph"), {
            type: 'horizontalBar',
            data: {
                labels: [this.label1, this.label2],
                datasets: [{
                    backgroundColor: ["#00fb82", "#187fe6"],
                    data: [this.data1, this.data2]
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: this.title,
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero:true,
                        }
                    }]
                }
            },
            scaleOptions: {
                ticks: {
                    beginAtZero: true,
                }
            }
        });
    },
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
    }
</style>

