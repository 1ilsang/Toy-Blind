<template>
    <div id="app">
        <Header />
        <div>
            <router-view />
        </div>
        <a
                v-if="isBottom"
                href="javascript:window.scrollTo(0,0);"
                class="top_btn"
                style="bottom: 20px; display: block;"
        >
            <span class="blind">Top</span>
        </a>
        <Modal />
    </div>
</template>

<script>
import Modal from './components/Modal.vue';
import Header from './components/Header';

export default {
    name: 'App',
    components: {
        Header,
        Modal
    },
    data() {
        return {
            isBottom: false
        };
    },
    mounted() {
        this.topVisible();
    },
    methods: {
        topVisible() {
            window.addEventListener('scroll', () => {
                this.isBottom = !!document.documentElement.scrollTop;
            });
        }
    }
};
</script>

<style>
body {
    overflow-y: scroll;
    touch-action: none;
    padding: 0;
    margin: 0;
}

body, button, input, select, textarea {
    font-family: Roboto, Malgun Gothic, 맑은 고딕, Apple SD Gothic Neo, Dotum, 돋움, sans-serif;
    font-weight: 300;
}

.top_btn {
    display: none;
    position: fixed;
    width: 40px;
    height: 40px;
    right: 15px;
    z-index: 10;
    bottom: 15px;
    transition: bottom 1s;
    opacity: .9;
    background-size: 325px 420px;
    background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-set.png?20180406=) no-repeat -272px -290px;
}

.blind {
    overflow: hidden;
    position: absolute;
    top: -999em;
    left: -999em;
    width: 1px;
    height: 1px;
    font-size: 1px;
    line-height: 0;
    margin: 0 !important;
    padding: 0 !important;
    white-space: nowrap;
    z-index: -1;
    visibility: hidden;
}

div {
    margin: 0;
    padding: 0;
}

a {
    color: #333;
    cursor: pointer;
    text-decoration: none;
}
</style>
