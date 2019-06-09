<template>
    <div class="write-post">
        <div v-if="isLoading">
            Loading...
        </div>
        <div v-else>
            <label for="title">Title: </label><input id="title" type="text" v-model="title" placeholder="Title"><br>
            <label for="description">Description: </label><input id="description" type="text" v-model="description" placeholder="Description"><br>
            <label for="img">Img: </label><input id="img" type="file" ref="file"><br>
            <fieldset>
                <legend>Select Topic</legend><br>
                <input type="radio" id="all" value="all" v-model="topic">
                <label for="all">all</label>
                <input type="radio" id="IPO" value="IPO" v-model="topic">
                <label for="IPO">IPO</label>
                <input type="radio" id="Tech-Careers" value="Tech-Careers" v-model="topic">
                <label for="Tech-Careers">Tech-Careers</label><br><br>
                <input type="radio" id="Misc" value="Misc" v-model="topic">
                <label for="Misc">Misc</label><br><br>
            </fieldset>
            <button @click="submit">Submit</button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {EventBus} from "../../utils/event-bus";

    export default {
        name: 'WritePost',
        computed: {
            ...mapGetters([
                'getUserData'
            ])
        },
        data() {
            return {
                title: '',
                description: '',
                img: '',
                topic: '',
                isLoading: false
            }
        },
        methods: {
            submit(e) {
                if (this.title.trim() === '' || this.description.trim() === '' || this.getUserData.seq === undefined || this.topic.trim() === '') {
                    alert('문항을 다 채워주세요');
                    return;
                }

                const file = this.$refs.file.files[0];
                let data = new FormData();

                if (file) {
                    if (file.size > 1024 * 1024 * 5 || !(file.type === 'image/png' || file.type === 'image/jpeg')) {
                        e.preventDefault();
                        alert('사진은 5MB 이하의 jpg, png 만 가능합니다.');
                        return;
                    }
                }
                this.isLoading = true;
                const config = {
                    header: {
                        'Content-Type': 'multipart/form-data'
                    }
                };

                if (file) data.append('userfile', file);
                data.append('title', this.title);
                data.append('description', this.description);
                data.append('topic', this.topic);
                data.append('userSeq', this.getUserData.seq);

                this.$store.dispatch('WRITE_POST', {data, config})
                    .then(() => {
                        this.isLoading = false;
                        EventBus.$emit('closeModal');
                        this.$router.push('/');
                    });
            }
        },
        created() {
        }
    }
</script>

<style>
    .write-post {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 10px;
    }
    .write-post fieldset {
        margin: 10px;
    }
    .write-post input {
        border: 1px solid blanchedalmond;
        margin: 5px;
        padding: 5px;
    }
    .write-post input[type="text"]{
        width: 200px;
    }

    .write-post button {
        border: 1px solid cornflowerblue;
        color: black;
        background-color: blanchedalmond;
    }
    a {
        color: #333;
        cursor: pointer;
        text-decoration: none;
    }

</style>