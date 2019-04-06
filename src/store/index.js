import Vuex from 'vuex';
import Vue from 'vue';
import Payment from './modules/payment'
import PaymentConfirmation from './modules/paymentConfirmation'


// Load Vuex

Vue.use(Vuex);

// Create store

export default new Vuex.Store ({
    modules: {
        Payment, PaymentConfirmation
    }
})