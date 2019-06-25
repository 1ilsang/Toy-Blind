<template>
    <div class="lst_area">
        <ListHeader />
        <ListCards />
    </div>
</template>

<script>
import ListHeader from './ListHeader';
import ListCards from './ListCards';

export default {
    name: 'ListArea',
    components: {
        ListHeader,
        ListCards
    }
};
</script>

<style>
.lst_area {
    position: relative;
    border-top: 10px solid #eceef3;
    padding: 0;
    border-bottom: 0;
    background-color: #fff;
}

</style>