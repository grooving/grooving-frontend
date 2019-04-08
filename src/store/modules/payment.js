const state = {

    artist: {
        artistId: undefined, 
        artisticName: undefined, 
        photo: undefined, 
        genres: undefined,
    },

    offer: {
        hiringType: undefined,
        totalPrice: undefined,
    },

    date: {
        date: undefined,
        hour: undefined,
        duration: undefined,
    },

    event: {
        // Address
        location: undefined,
        zipcode: undefined,
        street: undefined,
        zone: undefined, 

        // Description
        description: undefined,
        
    },

    // Payment Packages

    farePackage: {
        packageId: undefined, 
        priceHour: undefined,
    }

};

const getters = {
    offerArtist: state => state.artist,
    offer: state => state.offer,
    offerDate: state => state.date,
    offerEvent: state => state.event,
    offerFarePack: state => state.farePackage,
};

const actions = {

    setArtist (state, artist) {
        state.commit('setArtist', artist)
    },

    setOffer (state, hiringType, totalPrice = undefined){
        state.commit('setOffer', hiringType, totalPrice)
    },

    setDateDate (state, date) {
        state.commit('setDateDate', date)
    },

    setDateTime (state, time) {

        state.commit('setDateTime', time);

        if(state.state.offer.hiringType == 'FARE')
            state.commit('setOfferTotalPrice_FarePackage');
    },

    setEventAddress (state, address) {
        state.commit('setEventAddress', address)
    },

    setEventDescription (state, description) {
        state.commit('setEventDescription', description)
    },

    setFarePackage (state, farePackage) {
        state.commit('setFarePackage', farePackage)
    },

    //Other methods

    clearState (state) {
        state.commit('clearState')
    },

};

const mutations = {

    setArtist(state, artist) {

        if(artist){
            // Set artist data
            state.artist.artistId = artist.artistId;
            state.artist.artisticName = artist.artisticName;
            state.artist.photo = artist.photo;
            state.artist.genres = artist.genres;
        }

    },

    setOffer (state, hiringType, totalPrice = undefined){
        
        state.offer.hiringType = hiringType;
        state.offer.totalPrice = totalPrice;

    },

    setDateDate(state, date) {
        state.date.date = date;
    },

    setDateTime(state, time) {

        if(time){
            state.date.hour = time.hour;
            state.date.duration = time.duration;
        }

    },

    setOfferTotalPrice_FarePackage(state){

        var pricePerHour = parseFloat(state.farePackage.priceHour);
        var duration = state.date.duration;

        if(duration && pricePerHour){
            state.offer.totalPrice = Math.trunc(duration * pricePerHour);
        }

    },

    setEventAddress(state, address) {

        if(address){
            state.event.location = address.location;
            state.event.zipcode = address.zipcode;
            state.event.street = address.street;
            state.event.zone = address.zone;
        }

    },

    setEventDescription(state, description) {
        state.event.description = description;
    },

    setFarePackage(state, farePackage) {

        if(farePackage){
            state.farePackage.packageId = farePackage.packageId;
            state.farePackage.priceHour = farePackage.priceHour;
        }
        
    },

    clearState(state) {

        //Artist
        state.artist.artistId = undefined;
        state.artist.artisticName = undefined;
        state.artist.photo = undefined;
        state.artist.genres = undefined;

        //Offer
        state.offer.hiringType = undefined;
        state.offer.totalPrice = undefined;
    
        //Date
        state.date.date = undefined;
        state.date.hour = undefined;
        state.date.duration = undefined;

        //Event
        state.event.location = undefined;
        state.event.zipcode = undefined;
        state.event.street = undefined;
        state.event.zone = undefined;
        state.event.description = undefined;
    
        // Payment Packages
        state.farePackage.packageId = undefined;
        state.farePackage.priceHour = undefined;

    },
};

function checkStepRequirements(state, hiring, step){
        
    var res = false;

    if (hiring == 'FARE'){

        if (step >= 1){

            // ArtistData
            res = state.artist.artistId != undefined && state.artist.artisticName != undefined;

            // Offer hiringType
            res = res && state.offer.hiringType != undefined && state.offer.hiringType == 'FARE';

            // Fare Package
            res = res && state.farePackage.packageId != undefined && state.farePackage.priceHour != undefined;
        } else if (step >= 2){

            // Date
            res = res && state.date.date != undefined && state.date.date != '';
        } else if (step >= 3){

            // Time
            res = res && state.date.hour;
        } else if (step >= 4){

            //Address
            res = res && state.event.location != undefined && state.event.street != undefined && state.event.zipcode != null;
        }else if(step >= 5){

            // EventLocation Description
            res = res && state.event.description;
        }

    }

    console.log('here', res)

    return res;

}

export default {
    state,
    getters,
    actions,
    mutations,
    checkStepRequirements
}