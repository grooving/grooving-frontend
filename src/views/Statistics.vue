<template>
    <div id="statsMainWrapper" class="container mt-5 px-0">
        <h1 class="titleView">{{gtrans.translate('statistics_title')}}</h1>
        <div class="container row vertical-center mx-0 px-0">
            <div v-for="graph in circleProgressGraphs" :key="graph.id" class="tarjeta col-12 col-md-6 col-xl-4">
                <CircleProgressGraph :graphTitle="graph.title" :graphId="graph.id" :percentageTotal="graph.percentageTotal" :percentageLastMonth="graph.percentageLastMonth" :key="graph.percentageTotal"/>
            </div>
            <div v-for="graph in barGraphs" :key="graph.title" class="tarjeta col-12 col-md-6 col-xl-4">
                <BarGraph :key="barGraphUpdated" :data1="graph.data1" :data2="graph.data2" :label1="graph.label1" :label2="graph.label2" :title="graph.title" :id="'sp_' + graph.title"/>
            </div>
        </div>
    </div>
</template>

<script>
import GSecurity from "@/security/GSecurity.js"
import GTrans from "@/utils/GTrans.js"
import GAxios from '@/utils/GAxios.js'
import endpoints from '@/utils/endpoints.js'
import BarGraph from '@/components/statistics/BarGraph.vue'
import CircleProgressGraph from '@/components/statistics/CircleProgressGraph.vue'

export default {
    name: "Statistics",

    components: {
        BarGraph, CircleProgressGraph
    },

    data: function() {
        return {
            gsecurity: GSecurity,
            gtrans: undefined,

            barGraphs: {
                registers: {
                    data1: 0,
                    label1: "",
                    data2: 0,
                    label2: "",
                    title: "",
                },
                registersLastMonth: {
                    data1: 0,
                    label1: "",
                    data2: 0,
                    label2: "",
                    title: "",
                },
                money: {
                    data1: 0,
                    label1: "",
                    data2: 0,
                    label2: "",
                    title: "",
                },
                moneyLastMonth: {    
                    moneyEarnedLastMonth: 0,
                    label1: "",
                    moneyMovedLastMonth: 0,
                    label2: "",
                    title: "",
                }
            },

            circleProgressGraphs:{

                acceptedOffers:{
                    id: 'acceptedOffers',
                    title: '',
                    percentageTotal: 0.0,
                    percentageLastMonth: 0.0,
                },

                rejectedOffers:{
                    id: 'rejectedOffers',
                    title: '',
                    percentageTotal: 0.0,
                    percentageLastMonth: 0.0,
                },


                pendingOffers:{
                    id: 'pendingOffers',
                    title: '',
                    percentageTotal: 0.0,
                    percentageLastMonth: 0.0,
                },

                paidOffers:{
                    id: 'paidOffers',
                    title: '',
                    percentageTotal: 0.0,
                    percentageLastMonth: 0.0,
                },

            },

            successfulContractsMoney: 0,
            successfulContractsMoneyLastMonth: 0,
            totalContractOffers: 0,
            totalContractOffersLastMonth: 0,
            totalPaymentOffers: 0,
            totalPaymentOffersLastMonth: 0,
            totalPendingOffers: 0,
            totalPendingOffersLastMonth: 0,
            totalRejectedOffers: 0,
            totalRejectedOffersLastMonth: 0,

            barGraphUpdated: 0,
        }
    },

    created: function() {
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
        
        // Podemos cambiar el lenguaje así para debug...
        // this.gtrans.setLanguage('es')
        // this.gtrans.setLanguage('en')

        // Bar Graphs
        this.barGraphs.registers.label1 = this.gtrans.translate('registered_artists');
        this.barGraphs.registers.label2 = this.gtrans.translate('registered_customers');
        this.barGraphs.registers.title = this.gtrans.translate('registers');

        this.barGraphs.registersLastMonth.label1 = this.gtrans.translate('registered_artists');
        this.barGraphs.registersLastMonth.label2 = this.gtrans.translate('registered_customers');
        this.barGraphs.registersLastMonth.title = this.gtrans.translate('registers_lm');

        this.barGraphs.money.label1 = this.gtrans.translate('money_earned');
        this.barGraphs.money.label2 = this.gtrans.translate('money_moved');
        this.barGraphs.money.title = this.gtrans.translate('money');

        this.barGraphs.moneyLastMonth.label1 = this.gtrans.translate('money_earned');
        this.barGraphs.moneyLastMonth.label2 = this.gtrans.translate('money_moved');
        this.barGraphs.moneyLastMonth.title = this.gtrans.translate('money_lm');

        // Circle Progress Graph
        this.circleProgressGraphs.acceptedOffers.title = this.gtrans.translate('accepted_offers_ratio');
        this.circleProgressGraphs.rejectedOffers.title = this.gtrans.translate('rejected_offers_ratio');
        this.circleProgressGraphs.pendingOffers.title = this.gtrans.translate('pending_offers_ratio');
        this.circleProgressGraphs.paidOffers.title = this.gtrans.translate('paid_offers_ratio');

    },

    beforeMount: function() {
        if (!this.gsecurity.hasRole('ADMIN')) {
            this.$router.push({name: "error"});
        } else {
            NProgress.start();
            var authorizedGAxios = GAxios;
            var GAxiosToken = this.gsecurity.getToken();
            authorizedGAxios.defaults.headers.common['Authorization'] = 'Token ' + GAxiosToken;

            authorizedGAxios.get(endpoints.statistics)
            .then(response => {
                //console.log(response);
                var statistics = response.data;

                // BarGraph
                this.barGraphs.registers.data1 = statistics.totalArtists;
                this.barGraphs.registers.data2 = statistics.totalCustomers;

                this.barGraphs.registersLastMonth.data1 = statistics.totalArtistsLastMonth;
                this.barGraphs.registersLastMonth.data2 = statistics.totalCustomersLastMonth;

                this.barGraphs.money.data1 = statistics.moneyEarned;
                this.barGraphs.money.data2 = statistics.successfulContractsMoney;

                this.barGraphs.moneyLastMonth.data1 = statistics.moneyEarnedLastMonth;
                this.barGraphs.moneyLastMonth.data2 = statistics.successfulContractsMoneyLastMonth;

                // Circle Progress Bar
                this.circleProgressGraphs.acceptedOffers.percentageTotal = statistics.totalContractOffers;
                this.circleProgressGraphs.acceptedOffers.percentageLastMonth = statistics.totalContractOffersLastMonth;

                this.circleProgressGraphs.rejectedOffers.percentageTotal = statistics.totalRejectedOffers;
                this.circleProgressGraphs.rejectedOffers.percentageLastMonth = statistics.totalRejectedOffersLastMonth;

                this.circleProgressGraphs.pendingOffers.percentageTotal = statistics.totalPendingOffers;
                this.circleProgressGraphs.pendingOffers.percentageLastMonth = statistics.totalPendingOffersLastMonth;

                this.circleProgressGraphs.paidOffers.percentageTotal = statistics.totalPaymentOffers;
                this.circleProgressGraphs.paidOffers.percentageLastMonth = statistics.totalPaymentOffersLastMonth;

                this.barGraphUpdated += 1;
            }).catch(ex => {
                //console.log(ex);
            }).then(() => {
                NProgress.done()
            });
        }
    },
}
</script>

<style scoped>

    .results{
        margin: 0 auto;
        padding: 0px;
    }  

    @media (min-width:768px)  {
        .titleView{
            text-align: left;
            font-weight: bold;
        }
    }

    @media (max-width: 768px){
        .titleView{
            text-align: center;
            font-weight: bold;
            margin-bottom: 30px;
        }
    }

    .container-fluid{
        margin-top: 50px;
        margin-bottom: 30px;
    }

    .tarjeta{
        padding-bottom: 20px;
        padding-right: 0px;
        padding-left: 0px;
    }

    .vertical-center{
        align-items: center;  /*Aligns vertically center */
        justify-content: center; /*Aligns horizontally center */
    }

</style>
