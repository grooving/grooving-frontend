const state = {
    genres: {
        allGenres: undefined, 
        currentGenres: undefined,
        newGenres: Array(),
    },
    zones: {
        allZones: undefined,
        currentZones: undefined,
        newZones: Array(),
    }
};

const getters = {
    genres: state => state.genres,
    zones: state => state.zones,
};

const actions = {
    setAllGenres (state, allGenres) {
        state.commit('setAllGenres', allGenres)
    },
    setNewGenres (state, newGenres) {
        state.commit('setNewGenres', newGenres)
    },
    setCurrentGenres (state, currentGenres) {
        state.commit('setCurrentGenres', currentGenres)
    },
    setAllZones (state, allZones) {
        state.commit('setAllZones', allZones)
    },
    setNewZones (state, newZones) {
        state.commit('setNewZones', newZones)
    },
    setCurrentZones (state, currentZones) {
        state.commit('setCurrentZones', currentZones)
    },
    setFinal (state) {
        state.commit('setFinal')
    },
};

const mutations = {
    setNewGenres(state, newGenres) {
        
        if(newGenres)
            state.genres.newGenres = newGenres;
        else
            state.genres.newGenres = Array();
    },
    setCurrentGenres(state, currentGenres) {
        state.genres.currentGenres = currentGenres;
    },
    setAllGenres(state, allGenres) {
        state.genres.allGenres = allGenres;
    },

    setNewZones(state, newZones) {
        
        if(newZones)
            state.zones.newZones = newZones;
        else
            state.zones.newZones = Array();
    },
    setCurrentZones(state, currentZones) {
        state.zones.currentZones = currentZones;
    },
    setAllZones(state, allZones) {
        state.zones.allZones = allZones;
    },

    setFinal(state) {

        // Reset store
        state.genres.currentGenres = undefined;
        state.genres.allGenres = undefined;
        state.genres.newGenres = Array();
        state.zones.currentZones = undefined;
        state.zones.allZones = undefined;
        state.zones.newZones = Array();

    },
};

export default {
    state,
    getters,
    actions,
    mutations
}