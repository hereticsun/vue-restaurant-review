import Vue from 'vue';
import Vuex from 'vuex';

import events from './modules/events';
import bananaMeister from './modules/bananameister';
import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    modules: {
        events,
        bananaMeister,
    },
});
