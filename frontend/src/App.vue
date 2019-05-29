<template>
    <div id="app">
        <Wrap></Wrap>
        <a href="javascript:window.scrollTo(0,0);" class="top_btn" style="bottom: 20px; display: block;">
            <span class="blind">Top</span>
        </a>
        <Modal></Modal>
    </div>
</template>

<script>
    import Wrap from './components/Wrap';
    import Modal from './components/Modal.vue';
    export default {
        name: 'App',
        components: {
            Wrap,
            Modal
        },
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<style>
body {
    overflow-y: scroll;
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
    background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-set.png?20180406=) no-repeat;
    background-size: 325px 420px;
    background-position: -272px -290px;
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
    margin: 0!important;
    padding: 0!important;
    white-space: nowrap;
    z-index: -1;
    visibility: hidden;
}
</style>
