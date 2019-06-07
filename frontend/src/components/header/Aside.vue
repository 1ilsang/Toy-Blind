<template>
    <div class="aside">
        <ul>
            <li @click="closeHamburgerMenu">
                <router-link to="/search" class="btn_srch" title="search"></router-link>
            </li>
            <li @click="closeHamburgerMenu">
                <router-link to="/writepost" title="write a post" class="btn_writePost"></router-link>
            </li>
            <li>
                <button type="button" class="btn_menu" @click="toggleHamburgerMenu" v-bind:class="isActive">
                    <span class="ico_hamburger"></span>
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
    import {EventBus} from "../../utils/event-bus";

    export default {
        name: 'Aside',
        props: ['active'],
        data() {
            return {
                isActive: this.active
            }
        },
        components: {},
        methods: {
            closeHamburgerMenu() {
                EventBus.$emit('closeHamburgerMenu');
            },
            toggleHamburgerMenu() {
                EventBus.$emit('toggleHamburgerMenu');
            }
        }
    }
</script>

<style>
    .aside {
        position: absolute;
        top: 19px;
        right: 28px;
        z-index: 2;
        font-size: 12px;
        background: #fff;
    }

    .aside > ul li {
        position: relative;
        z-index: 2;
        float: left;
        margin-left: 18px;
    }

    .aside > ul li .btn_srch {
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-set-v3.png?20180801=) no-repeat;
        background-size: 325px 450px;
        background-position: -9px -9px;
    }

    .aside > ul li .btn_srch, .aside > ul li .btn_writePost {
        position: relative;
        display: inline-block;
        width: 22px;
        height: 22px;
        vertical-align: top;
        font-size: 12px;
        cursor: pointer;
    }

    .aside > ul li .btn_writePost {
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-set-v3.png?20180801=) no-repeat;
        background-size: 325px 450px;
        background-position: -34px -9px;
    }

    .btn_menu {
        position: relative;
        vertical-align: top;
        display: inline-block;
        width: 22px;
        height: 22px;
        padding: 2px;
        outline: none;
        box-sizing: border-box;
        cursor: pointer;
        background-color: transparent;
        border-style: none;
    }
    .btn_menu.active .ico_hamburger {
        height: 0;
    }
    .btn_menu .ico_hamburger {
        width: 100%;
        height: 2px;
        background: #222;
        display: block;
        transition: height .1s cubic-bezier(.19, 1, .22, 1) .2s;
    }
    .btn_menu.active .ico_hamburger:after {
        top: -2px;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .btn_menu.active .ico_hamburger:before {
        top: 0;
        -webkit-transform: rotate(-45deg);
         transform: rotate(-45deg);
    }

    .btn_menu .ico_hamburger:after, .btn_menu .ico_hamburger:before {
        content: " ";
        width: 100%;
        height: 2px;
        background: #222;
        display: block;
        position: relative;
        top: 4px;
        transition: top .3s cubic-bezier(.19, 1, .22, 1) .2s, -webkit-transform .3s cubic-bezier(.19, 1, .22, 1);
        transition: top .3s cubic-bezier(.19, 1, .22, 1) .2s, transform .3s cubic-bezier(.19, 1, .22, 1);
        transition: top .3s cubic-bezier(.19, 1, .22, 1) .2s, transform .3s cubic-bezier(.19, 1, .22, 1), -webkit-transform .3s cubic-bezier(.19, 1, .22, 1);
    }

    .btn_menu .ico_hamburger:before {
        top: -6px;
    }
</style>
