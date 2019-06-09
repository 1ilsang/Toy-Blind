<template>
    <div class="write_area">
        <div class="btn_add_comment" v-if="!getUserData">
            Want to comment?
            <a @click="openModal('Login')"><strong class="point">LOG IN</strong></a>
            or
            <a @click="openModal('SignUp')"><strong class="point">SIGN UP</strong></a>
        </div>
        <div v-else>
            Comment write area
        </div>
    </div>
</template>

<script>
    import {EventBus} from "../../utils/event-bus";
    import {mapGetters} from "vuex";

    export default {
        name: 'WriteComment',
        computed: {
            ...mapGetters([
                'getUserData'
            ])
        },
        methods: {
            openModal(target) {
                EventBus.$emit('openModal', target);
            }
        }
    }
</script>

<style>

    .topic_comments div.btn_add_comment {
        cursor: default;
    }

    .topic_comments .btn_add_comment {
        display: block;
        padding-left: 30px;
        border-bottom: 1px solid #dfe1e4;
        background: #fff;
        font-size: 14px;
        font-weight: 400;
        height: 68px;
        box-sizing: border-box;
        padding-top: 26px;
        cursor: pointer;
    }

    .topic_comments .btn_add_comment:before {
        content: "";
        display: inline-block;
        width: 22px;
        height: 17px;
        vertical-align: middle;
        margin-right: 14px;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-set.png?20180406=) no-repeat;
        background-size: 325px 420px;
        background-position: -159px -143px;
        margin-top: -3px;
    }

    .topic_comments div.btn_add_comment a {
        cursor: pointer;
    }

    .point {
        color: #da3238;
    }
</style>