<template>
    <div style="border-top: 10px solid #eceef3;">
        <div class="inner-wrap">
            <span class="back" @click="closeRoom">< Back </span>
            <MessageList :msgs="msgDatas" class="msg-list"></MessageList>
            <MessageForm v-on:submitMessage="sendMessage" class="msg-form"></MessageForm>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from 'vuex';
    import MessageList from './MessageList.vue';
    import MessageForm from './MessageForm.vue';
    import {DELETE_MSG_DATA, PUSH_MSG_DATA} from '../../../store/const/socket-type';

    export default {
        name: 'Room',
        data() {
            return {
                datas: [],
            };
        },
        components: {
            MessageList,
            MessageForm,
        },
        computed: {
            ...mapState({
                'msgDatas': state => state.socket.msgDatas,
            }),
            ...mapGetters([
                'getUserData'
            ])
        },
        methods: {
            ...mapMutations({
                'pushMsgData': PUSH_MSG_DATA,
                'deleteMsgData': DELETE_MSG_DATA
            }),
            sendMessage(msg) {
                this.pushMsgData({
                    from: {
                        name: '나',
                    },
                    message: msg,
                });
                this.$sendMessage({
                    name: this.getUserData.nickname,
                    message: msg,
                });
            },
            closeRoom() {
                this.$emit('closeRoom');
            }
        },
        created() {
            const $ths = this;
            this.$socket.on('chat', (data) => {
                this.pushMsgData(data);
                $ths.datas.push(data);
            });
        },
        destroyed() {
            this.deleteMsgData();
        }
    };
</script>

<style>
    .msg-form {
        bottom: 0;
        position: absolute;
        left: 0;
        right: 0;
    }

    .inner-wrap > .back {
        margin-left: 5px;
    }

    .msg-list {
        position: absolute;
        width: 100%;
        top: 142px;
        left: 0;
        right: 0;
        bottom: 60px;
        overflow-x: visible;
        overflow-y: scroll;
    }
</style>