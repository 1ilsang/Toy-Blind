<template>
    <div class="lst_header">
        <div class="wrap"><h1 class="">
            All Topics
        </h1>
            <h2 class="h_tit_lst blind">article list</h2>
            <button class="btn_follow active" style="display: none;"><span class="blind">+ Follow</span></button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ListHeader'
    }
</script>

<style>
    .lst_area .lst_header {
        position: relative;
        font-size: 0;
    }

    .lst_area .lst_header .wrap {
        position: relative;
        max-width: 1164px;
        margin: 0 auto;
        padding: 0 30px;
        min-height: 40px;
        box-sizing: border-box;
    }

    .lst_area .lst_header h1 {
        display: inline-block;
        font-size: 12px;
        font-weight: 700;
        color: #222;
        padding: 14px 0 12px;
    }

    .lst_area .h_tit_lst.blind {
        width: 0;
        height: 0;
    }

    .lst_area .lst_header .feeds {
        display: inline-block;
        margin-left: 0;
        vertical-align: top;
        padding-top: 11px;
    }

</style>