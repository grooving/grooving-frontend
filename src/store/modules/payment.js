const state = {
    address: {
        location: 'Sevilla',
        zipcode: 40200,
        street: 'C/ Reina Mercedes, 88', 
        description: undefined,
    },
    date: {
        date: undefined,
        hour: undefined,
        duration: undefined,
    },
};

const getters = {
    offerAddress: state => state.address,
    offerDate: state => state.date,
    offerHour: state => state.hour,
};

const actions = {
    setAddress (state, address) {
        state.commit('setAddress', address)
    },
    setDate (state, date) {
        state.commit('setDate', date)
    },
    setTime (state, time) {
        state.commit('setTime', time)
    },
};

const mutations = {
    setAddress(state, address) {
        state.address = address
    },
    setDate(state, date) {
        state.date.date = date;
    },
    setTime(state, time) {
        state.date.hour = time.start;
        state.date.duration = time.duration;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}