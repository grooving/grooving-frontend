const state = {
    genres: {
        allGenres: undefined, 
        currentGenres: undefined,
        newGenres: Array(),
    }
};

const getters = {
    genres: state => state.genres,
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
    setFinal(state) {

        // Reset store
        state.genres.currentGenres = undefined;
        state.genres.allGenres = undefined;
        state.genres.newGenres = Array();

    },
};

export default {
    state,
    getters,
    actions,
    mutations
}