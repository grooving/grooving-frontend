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
    offer: state => state.offer,
    offerArtist: state => state.artist,
    offerFarePack: state => state.farePackage,
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
        state.commit('setFarePackage', fareP)
    },
    setArtist (state, artist) {
        state.commit('setArtist', artist)
    },
    setFinal (state) {
        state.commit('setFinal')
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

        // Calculate offer total price
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

        // Set artist data
        state.artist.artistId = artist.artistId;
        state.artist.artisticName = artist.artisticName;
        state.artist.main_photo = artist.main_photo;
        state.artist.genres = artist.genres;

        // Reset store
        state.farePackage.packageId = undefined;
        state.farePackage.priceHour = undefined;
        state.date.hour = undefined;
        state.date.date = undefined;
        state.date.duration = undefined;
        state.offer.totalPrice = undefined;
        state.offer.hiring = undefined;
        state.address.zipcode = undefined;
        state.address.location = undefined;
        state.address.street = undefined;
        state.address.description = undefined;

    },
    setFinal(state) {

        // Reset store
        state.farePackage.packageId = undefined;
        state.farePackage.priceHour = undefined;
        state.date.hour = undefined;
        state.date.date = undefined;
        state.date.duration = undefined;
        state.offer.totalPrice = undefined;
        state.offer.hiring = undefined;
        state.address.zipcode = undefined;
        state.address.location = undefined;
        state.address.street = undefined;
        state.address.description = undefined;

    },
};

export default {
    state,
    getters,
    actions,
    mutations
}