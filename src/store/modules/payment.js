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
    },

    customPackage: {
        packageId: undefined,
        minimumPrice: undefined,
    },

    performancePackage: {
        packageId: undefined,
        duration: undefined,
        priceHour: undefined,
    }

};

const getters = {
    offerArtist: state => state.artist,
    offer: state => state.offer,
    offerDate: state => state.date,
    offerEvent: state => state.event,
    offerFarePack: state => state.farePackage,
    offerCustomPack: state => state.customPackage,
    offerPerformancePack: state => state.performancePackage,
};

const actions = {

    setArtist (state, artist) {
        state.commit('setArtist', artist)
    },

    setOffer (state, hiringType, totalPrice = undefined){
        state.commit('setOffer', hiringType, totalPrice)
    },

    setOfferPrice (state, totalPrice){
        state.commit('setOfferPrice', totalPrice)
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
        state.commit('setEventAddress', address);
    },

    setEventDescription (state, description) {
        state.commit('setEventDescription', description)
    },

    setFarePackage (state, farePackage) {
        state.commit('setFarePackage', farePackage)
    },

    setCustomPackage (state, customPackage) {
        state.commit('setCustomPackage', customPackage)
    },

    setPerformancePackage(state, performancePackage){
        state.commit('setPerformancePackage', performancePackage)
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

    setOfferPrice (state, totalPrice){
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
            var n = duration * pricePerHour;
            state.offer.totalPrice = n.toFixed(2);
        }
    },

    setEventAddress(state, address) {

        if(address){
            state.event.location = address[0];
            state.event.zipcode = address[1];
            state.event.street = address[2];
            state.event.zone = address[3];
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

    setCustomPackage(state, customPackage) {

        if(customPackage){
            state.customPackage.packageId = customPackage.packageId;
            state.customPackage.minimumPrice = customPackage.minimumPrice;
        }
        
    },

    setPerformancePackage(state, performancePackage) {

        if(performancePackage){
            state.performancePackage.packageId = performancePackage.packageId;
            state.performancePackage.duration = performancePackage.duration;
            state.performancePackage.priceHour = performancePackage.priceHour;
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
        state.customPackage.packageId = undefined;
        state.customPackage.minimumPrice = undefined;
        state.performancePackage.packageId = undefined;
        state.performancePackage.duration = undefined;
        state.performancePackage.priceHour = undefined;
        
    },
};

function checkStepRequirements(state, hiring, step){
        
    var res = false;

    if (hiring == 'FARE'){

        if (step >= 0){
            
            // TYPEOFHIRING

            // ArtistData
            res = state.artist.artistId != undefined && state.artist.artisticName != undefined;
            // Offer hiringType
            res = res && state.offer.hiringType != undefined && state.offer.hiringType == 'FARE';
            // Fare Package
            res = res && state.farePackage.packageId != undefined && state.farePackage.priceHour != undefined;

        }
        
        if(step >= 1){

            // DATESELECTION
            res = res && state.date.date != undefined && state.date.date != '';
            
        }
        
        if(step >= 2){

            // TIMESELECTION
            res = res && state.date.hour;

        }
        
        if(step >= 3){

            // ADDRESSINPUT
            res = res && state.event.location != undefined && state.event.street != undefined && state.event.zipcode != null;

        }
        
        if(step >= 4){

            // EVENT_DESCRIPTION
            res = res && state.event.description;

        }
        
        if(step >= 5){

            // PAYMENTSELECTION: Por ahora solo soportamos creditcard, 
            // redirección automática

        }

    }else if (hiring == 'CUSTOM'){

        if (step >= 0){

            // TYPEOFHIRING

            // ArtistData
            res = state.artist.artistId != undefined && state.artist.artisticName != undefined;
            // Offer hiringType
            res = res && state.offer.hiringType != undefined && state.offer.hiringType == 'CUSTOM';
            // Fare Package
            res = res && state.customPackage.packageId != undefined && state.customPackage.minimumPrice != undefined;

        }
        
        if(step >= 1){

            // DATESELECTION
            res = res && state.date.date != undefined && state.date.date != '';

        } 
        
        if(step >= 2){

            // TIMESELECTION
            res = res && state.date.hour;

        } 
        
        if(step >= 3){

            // CUSTOM_PRICE
            res = res && state.offer.totalPrice != undefined;

        } 
        
        if(step >= 4){

            // ADDRESSINPUT
            res = res && state.event.location != undefined && state.event.street != undefined && state.event.zipcode != null;

        }
        
        if(step >= 5){

            // EVENT_DESCRIPTION
            res = res && state.event.description;

        }
        
        if(step >= 6){

            // PAYMENTSELECTION: Por ahora solo soportamos creditcard, 
            // redirección automática

        }
    }

    else if (hiring == 'PERFORMANCE'){

    if (step >= 0){

        // TYPEOFHIRING

        // ArtistData
        res = state.artist.artistId != undefined && state.artist.artisticName != undefined;
        // Offer hiringType
        res = res && state.offer.hiringType != undefined && state.offer.hiringType == 'PERFORMANCE';
       
    }
    
    if(step >= 1){
        // PERFORMANCE SELECTION
        res = res && state.performancePackage.packageId != undefined && state.performancePackage.priceHour != undefined;

    } 
    
    if(step >= 2){

        // DATE SELECTION
        res = res && state.date.date != undefined && state.date.date != '';

    } 
    
    if(step >= 3){

        // STARTING DATE
        res = res && state.date.hour;

    } 
    
    if(step >= 4){

        // ADDRESSINPUT
        res = res && state.event.location != undefined && state.event.street != undefined && state.event.zipcode != null;

    }
    
    if(step >= 5){

        // EVENT_DESCRIPTION
        res = res && state.event.description;

    }
    
    if(step >= 6){

        // PAYMENTSELECTION: Por ahora solo soportamos creditcard, 
        // redirección automática

    }
}


    return res;

}

function checkViewRequirements(state, hiring, view){
    
    var res = false;

    if(state && hiring && view){

        var viewsAndSteps = []

        if(hiring == 'FARE'){

            viewsAndSteps = ["DateSelection", "TimeSelection", "AddressInput", "EventInput", "PaymentSelector", "Payment"];

        } else if(hiring == 'CUSTOM'){

            viewsAndSteps = ["DateSelection", "TimeSelection" , "PriceSelector", "AddressInput", "EventInput", "PaymentSelector", "Payment"];

        } else if(hiring == 'PERFORMANCE'){

            viewsAndSteps = ["PerformanceSelector", "DateSelection", "StartingDate" , "AddressInput", "EventInput", "PaymentSelector", "Payment"];

        }

        if(viewsAndSteps.includes(view)){
            res = checkStepRequirements(state, hiring, viewsAndSteps.indexOf(view));
        }

    }

    return res;
}

export default {
    state,
    getters,
    actions,
    mutations,
    checkViewRequirements,
}
