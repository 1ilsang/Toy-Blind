<template>
    <div>
        <RoomList v-if="!open" v-on:openRoom="openRoom"></RoomList>
        <Room v-else v-on:closeRoom="closeRoom"></Room>
    </div>
</template>

<script>
    import Room from "./chat/Room";
    import RoomList from "./chat/RoomList";

    export default {
        name: 'Chat',
        components: {
            Room,
            RoomList
        },
        data() {
            return {
                open: false
            }
        },
        methods: {
            openRoom(idx) {
                this.open =  !this.open;
            },
            closeRoom() {
                this.open = false;
            }
        }
    }
</script>