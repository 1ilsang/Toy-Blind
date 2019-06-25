<template>
    <div class="inner-wrap">
        <label>
            <input
                    v-model="msg"
                    type="text"
                    placeholder="보낼 메세지를 입력하세요."
                    @keyup.13="submitMessageFunc"
            >
        </label>
        <button @click="submitMessageFunc">Submit</button>
    </div>
</template>

<script>
export default {
    name: 'MessageForm',
    data() {
        return {
            msg: '',
        };
    },
    methods: {
        submitMessageFunc() {
            if (this.msg.length === 0) return false;
            this.$emit('submitMessage', this.msg);
            this.msg = '';
            return true;
        },
    },
};
</script>

<style>
.inner-wrap input {
    line-height: 50px;
    width: 75%;
    text-align: center;
}

.inner-wrap button {
    width: 20%;
    height: 50px;
    vertical-align: center;
}
</style>