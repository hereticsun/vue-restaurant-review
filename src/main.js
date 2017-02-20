// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueFire from 'vuefire';
// import Firebase from 'firebase';

import routes from './routes';
import App from './App';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueFire);

Vue.http.options.root = 'https://tech-lunch-bdc82.firebaseio.com';

Vue.filter('formattedDate', (value) => {
    const d = new Date(value);
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/');
});

const router = new VueRouter({
    mode: 'history',
    routes,
});


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App),
});
