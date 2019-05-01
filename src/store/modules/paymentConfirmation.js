const state = {
    paymentConfirmation: {
        userPicture: undefined,
        userName: undefined,
        offerPrice: undefined
    }
};

const getters = {
    paymentConfirmation: state => state.paymentConfirmation
};

const actions = {
    setPaymentConfirmation (state, offer) {
        state.commit('setPaymentConfirmation',offer)
    }
};

const mutations = {
    setPaymentConfirmation(state, offer) {
        if(offer){
            state.paymentConfirmation.userPicture = offer[0];
            state.paymentConfirmation.userName = offer[1];
            state.paymentConfirmation.offerPrice = offer[2];
        }else{
            state.paymentConfirmation.userName = undefined;
            state.paymentConfirmation.userPicture = undefined;
            state.paymentConfirmation.offerPrice = undefined;
        }

    }
};

export default {
    state,
    getters,
    actions,
    mutations
}