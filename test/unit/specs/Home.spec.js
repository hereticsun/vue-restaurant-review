import Vue from 'vue';
import Home from 'src/components/pages/home/Home';

describe('Home.vue', () => {
    it('should render correct content', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(Home),
        });
        expect(vm.$el.querySelector('.header-primary h1').textContent)
            .to.equal('Tech Lunch');
    });
});
