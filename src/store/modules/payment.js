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
        totalPrice: undefined,
    },
    artist: {
        artistId: undefined, 
        artisticName: undefined, 
        main_photo: undefined, 
        genres: undefined,
    },
    farePackage: {
        packageId: undefined, 
        priceHour: undefined,
    }
};

const getters = {
    offerAddress: state => state.address,
    offerDate: state => state.date,
    offerHour: state => state.hour,
    offerFarePack: state => state.farePackage,
    offerArtist: state => state.artist,
    offer: state => state.offer,
};

const actions = {
    setAddress (state, address) {
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
    setFarePackage (state, fareP) {
        console.log(fareP);
        state.commit('setFarePackage', fareP)
    },
    setArtist (state, artist) {
        console.log('Hi');
        state.commit('setArtist', artist)
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
        var d = state.date.duration;
        var p = parseFloat(state.farePackage.priceHour);
        state.offer.totalPrice = d*p;
    },
    setHiring(state, hiring) {
        state.offer.hiring = hiring;
    },
    setFarePackage(state, fareP) {
        state.farePackage.packageId = fareP.id;
        state.farePackage.priceHour = fareP.priceHour;
    },
    setArtist(state, artist) {
        state.artist.artistId = artist.artistId;
        state.artist.artisticName = artist.artisticName;
        state.artist.main_photo = artist.main_photo;
        state.artist.genres = artist.genres;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}