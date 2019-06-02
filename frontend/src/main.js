import Vue from 'vue'
import App from './App.vue'
import store from './store/index';
import axios from 'axios';
import router from './router';

Vue.prototype.$http = axios;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

// TODO Change :: import Swiper Module
let mySwiper = new Swiper('.swiper-container-free-mode', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    freeMode: true
});
mySwiper.on('transitionEnd', (e) => {
    // FIXME -1800 이거 때문에 우->좌 이동 경계 이상함. 동적 할당필요
    if (mySwiper.getTranslate() >= 1 || mySwiper.getTranslate() <= -1800) {
        mySwiper.setTranslate(0);
    }
    return true;
});