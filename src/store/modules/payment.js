const state = {
    address: {
        location: undefined,
        zipcode: undefined,
        street: undefined, 
        description: undefined,
    },
    date: {
        date: undefined,
        hour: undefined,
        duration: undefined,
    },
    offer: {
        hiring: undefined,
        artistId: undefined,
    }
};

const getters = {
    offerAddress: state => state.address,
    offerDate: state => state.date,
    offerHour: state => state.hour,
    offer: state => state.offer,
};

const actions = {
    setAddress (state, address) {
        console.log('Ma', arguments)
        state.commit('setAddress', address)
    },
    setEventDescription (state, description) {
        state.commit('setEventDescription', description)
    },
    setDate (state, date) {
        state.commit('setDate', date)
    },
    setTime (state, time) {
        state.commit('setTime', time)
    },
    setHiring (state, hiring) {
        state.commit('setHiring', hiring)
    },
    setArtistId (state, artistId) {
        state.commit('setArtistId', artistId)
    },
};

const mutations = {
    setAddress(state, address) {
        state.address.location = address[0];
        state.address.zipcode = address[1];
        state.address.street = address[2];
    },
    setEventDescription(state, description) {
        state.address.description = description
    },
    setDate(state, date) {
        state.date.date = date;
    },
    setTime(state, time) {
        state.date.hour = time.start;
        state.date.duration = time.duration;
    },
    setHiring(state, hiring) {
        state.offer.hiring = hiring;
    },
    setArtistId(state, artistId) {
        state.offer.artistId = artistId;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}