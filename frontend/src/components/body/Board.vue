<template>
    <div id="wrap">
        <section
                id="container"
                role="main"
        >
            <Lnb />
            <ListArea v-if="!isDetail" />
            <ListCardDetail v-if="isDetail" />
        </section>
    </div>
</template>

<script>
import Lnb from './board/Lnb';
import ListArea from './board/ListArea';
import ListCardDetail from './board/ListCardDetail';

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
        };
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
