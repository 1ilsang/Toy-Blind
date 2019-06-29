<template>
    <div class="comment_write">
        <div class="write_btn" />
        <label>
            <button @click="submitComment">전송</button>
            <input
                    v-model="description"
                    type="text"
                    placeholder="댓글을 입력해 주세요."
                    @keyup.13="submitComment"
            >
        </label>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {EventBus} from '../../../../utils/event-bus';

export default {
    name: 'WriteComment',
    props: ['boardSeq'],
    data() {
        return {
            description: ''
        };
    },
    computed: {
        ...mapGetters([
            'getUserData'
        ])
    },
    methods: {
        submitComment() {
            if (this.description.trim() === '') return false;

            const self = this;
            let data = {
                'user_seq': this.getUserData.seq,
                'board_seq': this.boardSeq,
                'description': this.description,
                'parent': 0
            };

            this.$store.dispatch('WRITE_COMMENT', data)
                .then(res => res ? self.init() : EventBus.$emit('openModal', 'ErrorModal'));
        },
        init() {
            this.description = '';
            this.$emit('updateComments', {'isEnd': false, 'commentSeq': 0});
        }
    }
};
</script>

<style>
.comment_write {
    border: 1px solid #da3228;
    background-color: white;
    position: fixed;
    width: 100%;
    bottom: 0;
}

.comment_write .write_btn {
    width: 10px;
    height: 50px;
    background-color: #da3238;
    opacity: 0.2;
    float: right;
}

.comment_write input[type='text'] {
    width: 70%;
    margin-left: 10px;
    line-height: 50px;
}

.comment_write button {
    float: left;
    color: white;
    background-color: #da3238;
    font-weight: bold;
    width: 50px;
    height: 50px;
    border: 0;
}

</style>