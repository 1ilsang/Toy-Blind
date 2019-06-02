<template>
    <section id="container" role="main">
        <Lnb></Lnb>
        <!-- TODO 카드 리스트(인피니트), 디테일 아키텍처(여기다 할것인가?), 댓글 등 작업 해야함. -->
        <ListArea v-if="!isDetail"></ListArea>
        <ListCardDetail v-if="isDetail"></ListCardDetail>
    </section>
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
        }
    };
</script>
