<template>
    <div>
        <RoomList v-if="!open" v-on:openRoom="openRoom"></RoomList>
        <Room v-else v-on:closeRoom="closeRoom" :room-seq="roomSeq"></Room>
    </div>
</template>

<script>
    import Room from "./chat/Room";
    import RoomList from "./chat/RoomList";
    import {mapGetters} from "vuex";

    export default {
        name: 'Chat',
        components: {
            Room,
            RoomList
        },
        computed: {
            ...mapGetters([
                'getUserData'
            ])
        },
        data() {
            return {
                open: false,
                idx: ''
            }
        },
        methods: {
            openRoom(roomSeq) {
                this.open =  !this.open;
                this.roomSeq = roomSeq;
            },
            closeRoom() {
                this.open = false;
            }
        }
    }
</script>