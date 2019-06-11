<template>
    <div class="room-list">
        <ul>
            <li v-for="(item, idx) in 5" @click="openRoom(idx)">test{{idx + 1}}</li>
        </ul>
        <button>Create</button>
    </div>
</template>

<script>
    export default {
        name: 'RoomList',
        methods : {
            openRoom(idx) {
                this.$emit('openRoom', idx);
            }
        }
    }
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