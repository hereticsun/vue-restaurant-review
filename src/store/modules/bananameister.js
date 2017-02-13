const state = {
    bananaMeister: 'Nauris',
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
    SET_BM: (dataState, bananaMeister) => {
        dataState.bananaMeister = bananaMeister;
    },
};

const actions = {
    initMeister: ({ commit }, bananaMeister) => {
        commit('SET_BM', bananaMeister);
    },
};

const getters = {
    currentMeister: (dataState) => {
        const bananaMeister = dataState.bananaMeister;
        return bananaMeister;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
