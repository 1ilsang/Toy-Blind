<template>
    <div class="lnb">
        <div class="lnb_wrap">
            <div class="mask">
                <div class="slide_tab swiper-container-initialized swiper-container-horizontal swiper-container-free-mode swiper-container-android">
                    <ul class="categorys_wrap swiper-wrapper"
                        style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">
                        <!-- FIXME topics 디비에서 땡겨오면 v-for 로 이부분 깔끔하게 할것. -->
                        <li data-idx="0" class="category swiper-slide swiper-slide-prev" :class="[clickedTopic === 'Topics' ? 'active' : '']" @click="changeTopic('Topics')">
                            <router-link
                                    to="/articles/Topics"
                                    class="nuxt-link-exact-active nuxt-link-active"
                                    title="Topics">
                                All
                            </router-link>
                        </li>
                        <li data-idx="1" class="category swiper-slide point swiper-slide-active" :class="[clickedTopic === 'IPO' ? 'active' : '']" @click="changeTopic('IPO')">
                            <router-link to="/articles/IPO"
                                         class=""
                                         title="IPO">
                                IPO
                            </router-link>
                        </li>
                        <li data-idx="2" class="category swiper-slide swiper-slide-next" :class="[clickedTopic === 'Tech' ? 'active' : '']" @click="changeTopic('Tech')">
                            <router-link to="/articles/Tech-Careers" class=""
                                         title="Tech Careers">
                                Tech Careers
                            </router-link>
                        </li>
                        <li data-idx="3" class="category swiper-slide" :class="[clickedTopic === 'Misc' ? 'active' : '']" @click="changeTopic('Misc')">
                            <router-link to="/articles/Misc" class="" title="Misc.">
                                Misc.
                            </router-link>
                        </li>
                        <li data-idx="4" class="category swiper-slide" :class="[clickedTopic === 'Compensation' ? 'active' : '']" @click="changeTopic('Compensation')">
                            <router-link to="/articles/Compensation" class=""
                                                                          title="Compensation">
                            Compensation
                        </router-link></li>
                        <li data-idx="5" class="category swiper-slide"><a href="/articles/Money" class="" title="Money">
                            Money
                        </a></li>
                        <li data-idx="6" class="category swiper-slide"><a href="/articles/Housing" class=""
                                                                          title="Housing">
                            Housing
                        </a></li>
                        <li data-idx="7" class="category swiper-slide"><a href="/articles/Work-VISA" class=""
                                                                          title="Work VISA">
                            Work VISA
                        </a></li>
                        <li data-idx="8" class="category swiper-slide"><a href="/articles/Politics" class=""
                                                                          title="Politics">
                            Politics
                        </a></li>
                        <li data-idx="9" class="category swiper-slide"><a href="/articles/Relationships" class=""
                                                                          title="Relationships">
                            Relationships
                        </a></li>
                        <li data-idx="10" class="category swiper-slide"><a href="/articles/Startups" class=""
                                                                           title="Startups">
                            Startups
                        </a></li>
                        <li data-idx="11" class="category swiper-slide"><a href="/articles/Office-Life" class=""
                                                                           title="Office Life">
                            Office Life
                        </a></li>
                        <li data-idx="12" class="category swiper-slide"><a href="/articles/HR-Issues" class=""
                                                                           title="HR Issues">
                            HR Issues
                        </a></li>
                        <li data-idx="13" class="category swiper-slide"><a href="/articles/Health" class=""
                                                                           title="Health">
                            Health
                        </a></li>
                        <li data-idx="14" class="category swiper-slide"><a href="/articles/Women-in-Tech" class=""
                                                                           title="Women in Tech">
                            Women in Tech
                        </a></li>
                        <li data-idx="15" class="category swiper-slide"><a href="/articles/Food--Travel" class=""
                                                                           title="Food &amp; Travel ">
                            Food &amp; Travel
                        </a></li>
                        <li data-idx="16" class="category swiper-slide"><a href="/articles/Auto" class="" title="Auto">
                            Auto
                        </a></li>
                        <li data-idx="17" class="category swiper-slide"><a href="/articles/Layoffs" class=""
                                                                           title="Layoffs">
                            Layoffs
                        </a></li>
                        <li data-idx="18" class="category swiper-slide point disabled"><a
                                href="/articles/Finance-Careers"
                                class=""
                                title="Finance Careers">
                            Finance Careers
                        </a></li>
                        <li data-idx="19" class="category swiper-slide point disabled"><a
                                href="/articles/Gaming-Careers"
                                class=""
                                title="Gaming Careers">
                            Gaming Careers
                        </a></li>
                        <li data-idx="20" class="category swiper-slide point disabled"><a href="/articles/HW-Careers"
                                                                                          class=""
                                                                                          title="HW Careers">
                            HW Careers
                        </a></li>
                    </ul>
                    <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // FIXME swiper 분석해서 클릭시 active 띄우는거 다시해보기
    export default {
        name: 'Lnb',
        data() {
            return  {
                clickedTopic: 'Topics'
            }
        },
        methods: {
            changeTopic(e) {
                this.clickedTopic = e;
            }
        }
    }
</script>

<style>
    #container .lnb {
        z-index: 9998;
    }

    .lnb {
        position: -webkit-sticky;
        position: sticky;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/bg-lnb-line-m.png) 50% 100% repeat-x #fff;
        background-color: #fff;
        top: 0;
        z-index: 10000;
        height: 41px;
        line-height: 1.26em;
    }

    .lnb .lnb_wrap {
        position: relative;
        max-width: 1164px;
        margin: 0 auto;
        height: 41px;
        overflow: hidden;
    }

    .lnb .mask {
        position: relative;
        height: 39px;
        margin: 0 44px 0 20px;
        overflow: hidden;
    }

    .mask:before {
        left: 0;
        background-position: 0 0;
    }

    a {
        color: #333;
        cursor: pointer;
        text-decoration: none;
    }

    .mask:after {
        right: 0;
        background-position: 100% 0;
    }

    .lnb .slide_tab .categorys_wrap .category.active, .lnb .slide_tab .categorys_wrap .swiper-slide.active, .lnb .slide_tab .swiper-wrapper .category.active, .lnb .slide_tab .swiper-wrapper .swiper-slide.active {
        color: #222;
        font-weight: 700;
    }

    .lnb .slide_tab .categorys_wrap li.active {
        color: #222;
    }

    .lnb .slide_tab .categorys_wrap .category, .lnb .slide_tab .categorys_wrap .swiper-slide, .lnb .slide_tab .swiper-wrapper .category, .lnb .slide_tab .swiper-wrapper .swiper-slide {
        width: auto;
        height: 41px;
        text-align: center;
        font-size: 14px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #94969b;
        margin-right: 25px;
    }

    .mask div {
        width: 0;
    }

    .lnb .mask .point > a:first-of-type:after {
        content: "";
        position: absolute;
        top: 10px;
        right: -3px;
        width: 3px;
        height: 3px;
        border-radius: 100%;
        background-color: #da3238;
    }
</style>