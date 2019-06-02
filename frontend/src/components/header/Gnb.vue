<template>
        <div id="gnb">
            <div class="mask">
                <div class="gnb_tab">
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide active">TOPICS</li>
                        <li class="swiper-slide point">Find Your Colleagues</li>
                    </ul>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: 'Gnb',
        data() {
            return {
            }
        },
        components: {
        }
    }
</script>

<style>
    .swiper-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1;
        display: flex;
        transition-property: -webkit-transform;
        transition-property: transform;
        transition-property: transform,-webkit-transform;
        box-sizing: content-box;
    }
    #gnb .gnb_tab {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        margin: 2px 10px 0;
    }
    #gnb .gnb_tab ul li {
        cursor: pointer;
        padding: 2px 0 0;
    }
    #gnb .swiper-slide {
        width: auto;
        height: 60px;
        text-align: center;
        font-size: 16px;
        line-height: 1.26em;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
    }
    #gnb .swiper-slide.active {
        color: #222;
    }
    #gnb .gnb_tab ul li.point {
        color: #37acc9;
        text-decoration: underline;
    }
    #gnb .mask {
        margin: 0 20px;
        overflow: hidden;
        position: relative;
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
</style>
