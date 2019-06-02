<template>
    <div id="modal" class="v--modal-overlay" v-if="currentView !== ''">
        <component v-bind:is="currentView"></component>
    </div>
</template>

<script>
    import {EventBus} from "../utils/event-bus";
    import SignUp from "./modal/SignUp";
    import Login from './modal/Login';

    export default {
        name: 'Wrap',
        data() {
            return {
                currentView: ''
            }
        },
        components: {
            SignUp,
            Login
        },
        created() {
            EventBus.$on('openModal', command => {
                this.currentView = command;
            });
            EventBus.$on('closeModal', () => {
                this.currentView = '';
            });
        }
    }
</script>

<style>
    .v--modal-overlay {
        position: fixed;
        box-sizing: border-box;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 10001;
        opacity: 1;
        font-size: 0;
        text-align: center;
        -webkit-tap-highlight-color: transparent;
    }
</style>
