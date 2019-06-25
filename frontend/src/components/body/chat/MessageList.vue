<template>
    <div v-auto-bottom="msgs" class="chat-wrap">
        <div
                v-for="(msg,index) in msgs"
                :key="index"
                class="chat-line"
        >
            <span class="chat-id">{{ msg.nickname }}</span>: <span class="chat-msg">{{ msg.message }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MessageList',
    props: ['msgs']
};
</script>

<style>
.chat-wrap {
    background-color: rgba(100, 200, 180, 0.1);
}

.chat-line {
    word-break: break-all;
    width: auto;
    margin: 12px;
}

.chat-id {
    border: 1px solid olivedrab;
}
</style>