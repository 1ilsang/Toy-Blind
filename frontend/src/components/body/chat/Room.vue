<template>
    <div style="border-top: 10px solid #eceef3;">
        <div class="inner-wrap">
            <span class="back" @click="closeRoom"> :: Back </span>
            <MessageList :msgs="msgDatas" class="msg-list" />
            <MessageForm @submitMessage="sendMessage" class="msg-form" />
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
    components: {
        MessageList,
        MessageForm,
    },
    props: ['roomSeq'],
    data() {
        return {
            datas: [],
        };
    },
    computed: {
        ...mapGetters([
            'getUserData',
            'msgDatas'
        ])
    },
    beforeCreate() {
        const $ths = this;
        this.$socket.on('chat', (data) => {
            this.pushMsgData(data);
            $ths.datas.push(data);
        });
    },
    destroyed() {
        this.deleteMsgData();
        this.$leave({
            roomSeq: this.roomSeq,
            nickname: this.getUserData.nickname
        });
        this.$sendMessage({
            nickname: '= SYSTEM =',
            message: `${this.getUserData.nickname}님이 나가셨습니다.`,
            roomSeq: this.roomSeq
        });
        this.$socket.off('chat');
    },
    methods: {
        ...mapMutations({
            'pushMsgData': PUSH_MSG_DATA,
            'deleteMsgData': DELETE_MSG_DATA
        }),
        sendMessage(msg) {
            this.$sendMessage({
                nickname: this.getUserData.nickname,
                message: msg,
                roomSeq: this.roomSeq
            });
        },
        closeRoom() {
            this.$emit('closeRoom');
        }
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