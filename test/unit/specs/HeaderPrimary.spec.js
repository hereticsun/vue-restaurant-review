import Vue from 'vue';
import HeaderPrimary from 'src/components/common/header-primary/HeaderPrimary';

describe('HeaderPrimary.vue', () => {
    it('should render correct content', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: (h) => h(HeaderPrimary),
        });
        expect(vm.$el.querySelector('.header-primary h1').textContent)
            .to.be.a('string');
        expect(vm.$el.querySelector('.header-primary h1').textContent)
            .to.equal('Tech Lunch');
    });
});
