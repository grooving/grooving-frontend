const state = {
    sideMenus: {
        leftMenu: undefined, 
        rightMenu: undefined,
        url: undefined,
    }
};

const getters = {
    sideMenus: state => state.sideMenus,
};

const actions = {
    setRightMenu (state, right) {
        state.commit('setRightMenu', right)
    },
    setLeftMenu (state, left) {
        state.commit('setLeftMenu', left)
    },
    clearStore (state) {
        state.commit('clearStore')
    },
    setURL (state, url) {
        state.commit('setURL', url)
    },
};

const mutations = {
    setRightMenu(state, right) {
        state.sideMenus.rightMenu = right;
    },
    setLeftMenu(state, left) {
        state.sideMenus.leftMenu = left;
    },
    clearStore(state) {
        state.sideMenus.rightMenu = false;
        state.sideMenus.leftMenu = false;
    },
    setURL (state, url) {
        state.sideMenus.url = url;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}