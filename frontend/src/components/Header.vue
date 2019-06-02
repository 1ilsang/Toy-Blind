<template>
    <header>
        <h2 class="h_blind">
            <router-link to="/">Toy-blind</router-link>
        </h2>
        <Gnb v-if="!allMenuToggle"></Gnb>
        <Aside></Aside>
        <Hamburger v-if="allMenuToggle"></Hamburger>
    </header>
</template>

<script>
    import Gnb from './header/Gnb';
    import Aside from './header/Aside';
    import Hamburger from "./sideMenu/Hamburger";
    import {EventBus} from "../utils/event-bus";

    export default {
        name: 'Header',
        components: {
            Gnb,
            Aside,
            Hamburger
        },
        data() {
            return {
                allMenuToggle: false
            }
        },
        created() {
            EventBus.$on('toggleAllMenu', () => this.allMenuToggle = !this.allMenuToggle);
            EventBus.$on('closeAllMenu', () => this.allMenuToggle = false);
        }
    }
</script>

<style>
    header {
        z-index: 9999;
        border-bottom: 1px solid #eceef3;
    }

    .h_blind {
        display: inline-block;
        margin: 0;
        padding: 20px 30px 0;
        vertical-align: top;
    }
</style>
