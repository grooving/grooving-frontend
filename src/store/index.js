import Vuex from 'vuex';
import Vue from 'vue';
import Payment from './modules/payment'
import PaymentConfirmation from './modules/paymentConfirmation'
import EditPortfolio from './modules/editPortfolio'
import Header from './modules/header'


// Load Vuex

Vue.use(Vuex);

// Create store

export default new Vuex.Store ({
    modules: {
        Payment, PaymentConfirmation, EditPortfolio, Header
    }
})