import Vue from 'vue';

const loadData = ({ commit }) => {
  Vue.http.get('data.json')
    .then(response => response.json())
    .then((data) => {
      if (data) {
        const events = data.events;
        const bananaMeister = data.bananaMeister;

        // eslint-disable-next-line
        console.log('BM', bananaMeister);

        commit('SET_EVENTS', events);
        commit('SET_BM', bananaMeister);
      }
    });
};

export default loadData;
