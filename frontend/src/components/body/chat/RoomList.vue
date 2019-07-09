<template>
    <div class="room-list">
        <ul>
            <li v-for="(item, idx) in 5" @click="openRoom(idx)">test{{idx + 1}}</li>
        </ul>
        <button>Create</button>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'RoomList',
    computed: {
        ...mapGetters([
            'getUserData'
        ])
    },
    methods: {
        openRoom(roomSeq) {
            this.$store.dispatch('IS_VALIDATION_TOKEN')
                .then((token) => {
                    if (token) {
                        const msg = {
                            token: token,
                            nickname: this.getUserData.nickname,
                            roomSeq: roomSeq,
                            message: `${this.getUserData.nickname}님이 입장하셨습니다.`,
                        };
                        this.$join(msg);
                        this.$emit('openRoom', roomSeq);
                    }
                });
        }
    }
};
</script>

<style>
.room-list li {
    margin-top: 20px;
    border: 1px solid gold;
    border-radius: 7px 7px 7px 7px;
    width: 30%;
    padding: 3px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}

.room-list > ul > li:hover {
    background-color: gold;
}

.room-list button {
    border: 1px solid salmon;
    background-color: white;
    margin-top: 20px;
    margin-left: 70%;
}
</style>
