<template>
    <div id="wrap">
        <section id="container" role="main">
            <Lnb></Lnb>
            <ListArea v-if="!isDetail"></ListArea>
            <ListCardDetail v-if="isDetail"></ListCardDetail>
        </section>
    </div>
</template>

<script>
    import Lnb from './body/Lnb';
    import ListArea from "./body/ListArea";
    import ListCardDetail from "./body/ListCardDetail";

    export default {
        name: 'Body',
        components: {
            Lnb,
            ListArea,
            ListCardDetail
        },
        data() {
            return {
                isDetail: false
            }
        },
        watch: {
            '$route': 'setDetail'
        },
        methods: {
            setDetail() {
                this.isDetail = this.$route.path.indexOf('articles') !== 1;
            }
        }
    };
</script>
