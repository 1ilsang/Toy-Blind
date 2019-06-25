<template>
    <header>
        <h2
                class="h_blind"
                @click="closeAll"
        >
            <router-link to="/">
                Toy-blind
            </router-link>
        </h2>
        <Gnb v-if="!hamburgerMenu" />
        <Aside :active="isActive" />
        <Hamburger v-if="hamburgerMenu" />
    </header>
</template>

<script>
import Gnb from './header/Gnb';
import Aside from './header/Aside';
import Hamburger from './sideMenu/Hamburger';
import {EventBus} from '../utils/event-bus';

export default {
    name: 'Header',
    components: {
        Gnb,
        Aside,
        Hamburger
    },
    data() {
        return {
            hamburgerMenu: false,
            isActive: ''
        };
    },
    created() {
        EventBus.$on('toggleHamburgerMenu', () => {
            this.hamburgerMenu = !this.hamburgerMenu;
            if (this.isActive === '') this.isActive = 'active';
            else this.isActive = '';
        });
        EventBus.$on('closeHamburgerMenu', () => {
            this.hamburgerMenu = false;
            this.isActive = '';
        });
    },
    methods: {
        closeAll() {
            EventBus.$emit('closeHamburgerMenu');
        }
    }
};
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
