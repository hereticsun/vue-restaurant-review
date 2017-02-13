const state = {
    events: [],
};
/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
    SET_EVENTS: (dataState, events) => {
        dataState.events = events;
    },
};

const actions = {
    addEvent: ({ commit }, event) => {
        commit('ADD_EVENT', event);
    },
    initEvents: ({ commit }, events) => {
        commit('SET_EVENTS', events);
    },
};

const getters = {
    events: (dataState) => {
        const events = dataState.events;
        return events;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
