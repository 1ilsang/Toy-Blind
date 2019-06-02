<template>
    <div>
        <div class="fnc_top">
        <div class="welcome">
            <div class="signup">
                <button title="LOG IN" class="btn_logIn" @click="openModal('Login')">LOG IN</button>
                <button title="SIGN UP" class="btn_signIn" @click="openModal('SignUp')">SIGN UP</button>
            </div>
        </div>
        </div>
        <div class="ly_submenu">
            <div class="flex submenu">
                <div class="ly_menu">
                    <div>
                        <div class="gnb_list">
                            <ul><!----> <!----><!----> <!----><!----> <!----><!----> <!----><!----> <!----><!---->
                                <!---->
                                <li class="topics_category"><span class="uselect active"><span></span> <span><a><i>All Topics</i></a></span></span>
                                    <!---->
                                    <div class="fnc"><a style="display:;"><span class="txt_manage">Manage Topics</span></a>
                                        <div style="display:none;"><a
                                                onclick="ga('send', 'event', 'Manage-topics', 'Setting', 'Cancel');"><span
                                                class="btn">Cancel</span></a> <a
                                                onclick="ga('send', 'event', 'Manage-topics', 'Setting', 'Save');"><span
                                                class="btn">Save</span></a></div>
                                    </div>
                                    <div style="display:;">
                                        <div class="option" style="display:none;"><span
                                                onclick="ga('send', 'event', 'Manage-topics', 'Setting', 'Select-all');"
                                                class="select"><em>SELECT ALL</em></span> <span class="sort"><span><span
                                                style="display:none;"> <span class="popper"><div
                                                class="more_menu menu_basic"><ol><li><a class="selected"><span
                                                class="item">HOT TOPICS</span></a></li><li><a
                                                class=""><span
                                                class="item">ALPHABETICAL ORDER</span></a></li></ol></div></span></span> <span><em
                                                onclick="ga('send', 'event', 'Manage-topics', 'Setting', 'Order-setting');"><i>HOT TOPICS</i></em></span></span></span>
                                        </div>
                                        <ul class="list">
                                            <li><a href="/articles/Topics" title="All Topics"
                                                   onclick="ga('send', 'event', 'Indiv.-list', 'All-menu', 'Topics-all');"
                                                   class="">
                                                <div class="bx"><span>All</span></div>
                                            </a></li> <!---->
                                            <li><a href="/articles/Tech-Careers" title="Tech Careers" class="">
                                                <div class="bx"><span>Tech Careers</span></div>
                                            </a></li>
                                            <li><a href="/articles/Misc" title="Misc." class="">
                                                <div class="bx"><span>Misc.</span></div>
                                            </a></li>
                                            <li><a href="/articles/Compensation" title="Compensation" class="">
                                                <div class="bx"><span>Compensation</span></div>
                                            </a></li><!---->
                                            <li><a href="/articles/Money" title="Money" class="">
                                                <div class="bx"><span>Money</span></div>
                                            </a></li>
                                            <li><a href="/articles/Housing" title="Housing" class="">
                                                <div class="bx"><span>Housing</span></div>
                                            </a></li>
                                            <li><a href="/articles/Work-VISA" title="Work VISA" class="">
                                                <div class="bx"><span>Work VISA</span></div>
                                            </a></li>
                                            <li><a href="/articles/Politics" title="Politics" class="">
                                                <div class="bx"><span>Politics</span></div>
                                            </a></li>
                                            <li><a href="/articles/Relationships" title="Relationships" class="">
                                                <div class="bx"><span>Relationships</span></div>
                                            </a></li>
                                            <li><a href="/articles/Startups" title="Startups" class="">
                                                <div class="bx"><span>Startups</span></div>
                                            </a></li>
                                            <li><a href="/articles/Office-Life" title="Office Life" class="">
                                                <div class="bx"><span>Office Life</span></div>
                                            </a></li><!----><!---->
                                            <li><a href="/articles/HR-Issues" title="HR Issues" class="">
                                                <div class="bx"><span>HR Issues</span></div>
                                            </a></li>
                                            <li><a href="/articles/Health" title="Health" class="">
                                                <div class="bx"><span>Health</span></div>
                                            </a></li><!---->
                                            <li><a href="/articles/Women-in-Tech" title="Women in Tech" class="">
                                                <div class="bx"><span>Women in Tech</span></div>
                                            </a></li>
                                            <li><a href="/articles/Food--Travel" title="Food &amp; Travel " class="">
                                                <div class="bx"><span>Food &amp; Travel </span></div>
                                            </a></li><!---->
                                            <li><a href="/articles/Auto" title="Auto" class="">
                                                <div class="bx"><span>Auto</span></div>
                                            </a></li><!----><!----><!---->
                                            <li><a href="/articles/Layoffs" title="Layoffs" class="">
                                                <div class="bx"><span>Layoffs</span></div>
                                            </a></li><!----><!----><!----><!----><!----><!----><!---->
                                            <li><a href="/articles/IPO" title="IPO" class="">
                                                <div class="bx"><span>IPO</span></div>
                                            </a></li><!----><!----><!----><!----><!----><!----><!----><!---->
                                            <li class="point disabled"><a href="/articles/Finance-Careers"
                                                                          title="Finance Careers" class="">
                                                <div class="bx"><span>Finance Careers</span></div>
                                            </a></li>
                                            <li class="point disabled"><a href="/articles/Gaming-Careers"
                                                                          title="Gaming Careers" class="">
                                                <div class="bx"><span>Gaming Careers</span></div>
                                            </a></li>
                                            <li class="point disabled"><a href="/articles/HW-Careers" title="HW Careers"
                                                                          class="">
                                                <div class="bx"><span>HW Careers</span></div>
                                            </a></li>
                                        </ul>
                                    </div>
                                </li> <!----></ul>
                            <!--<div class="signup_lead_area"><p>-->
                                <!--Join now to get more access to your favorite topics<br>-->
                                <!--and exclusive channels.-->
                            <!--</p>-->
                                <!--<button type="button" name="button" class="submit"><strong class="next">SIGN UP</strong>-->
                                <!--</button>-->
                            <!--</div>-->
                            <!--<div class="motive">-->
                                <!--Already have an account? <a><span class="login_link">LOG IN</span></a></div>-->
                        </div>
                        <!--<div class="menu seo">-->
                            <!--<div class="m_about"><strong>Company</strong>-->
                                <!--<ul>-->
                                    <!--<li><a href="/whyBlind"-->
                                           <!--onclick="ga('send', 'event', 'Menu', 'Why-blind', 'All-menu');"-->
                                           <!--class="">Why Blind</a></li>-->
                                    <!--<li><a href="/about" onclick="ga('send', 'event', 'Menu', 'About', 'All-menu');"-->
                                           <!--class="">About Us</a></li>-->
                                    <!--<li><a href="http://blog.teamblind.com" target="_blank"-->
                                           <!--onclick="ga('send', 'event', 'Menu', 'Blog', 'All-menu');">Blog</a></li>-->
                                    <!--<li><a onclick="ga('send', 'event', 'Menu', 'Careers', 'All-menu');">Careers</a>-->
                                    <!--</li>-->
                                    <!--<li>-->
                                        <!--<div class="rts_ad"><a href="https://www.rooftopslushie.com" target="_blank"-->
                                                               <!--onclick="ga('send', 'event', 'Menu', 'Rooftop-slushie', 'All-menu');"><span-->
                                                <!--class="ico ico_rts_logo"><i class="blind">Rooftop Slushie BI</i></span>-->
                                            <!--<span>Rooftop Slushie</span><em class="befefit">Give Advice. Get Paid.</em></a>-->
                                        <!--</div>-->
                                    <!--</li>-->
                                <!--</ul>-->
                            <!--</div>-->
                            <!--<div class="m_support"><strong>Support</strong>-->
                                <!--<ul>-->
                                    <!--<li><a href="/community-guidelines"-->
                                           <!--onclick="ga('send', 'event', 'Menu', 'Community Guidelines', 'All-menu');"-->
                                           <!--class="">Community Guidelines</a></li>-->
                                    <!--<li><a href="/faqs" onclick="ga('send', 'event', 'Menu', 'FAQs', 'All-menu');"-->
                                           <!--class="">FAQs</a>-->
                                    <!--</li>-->
                                    <!--<li><a href="/updates" onclick="ga('send', 'event', 'Menu', 'Updates', 'All-menu');"-->
                                           <!--class="">Updates</a></li>-->
                                    <!--<li><a href="/sitemap" onclick="ga('send', 'event', 'Menu', 'Sitemap', 'All-menu');"-->
                                           <!--class="">Sitemap</a></li>-->
                                <!--</ul>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="sns">-->
                            <!--<ul class="list">-->
                                <!--<li><a href="https://www.facebook.com/BlindApp" target="_blank"-->
                                       <!--onclick="ga('send', 'event', 'SNS', 'FB', 'All-menu');" class="fb"><i-->
                                        <!--class="blind">Facebook</i></a>-->
                                <!--</li>-->
                                <!--<li><a href="https://instagram.com/teamblind" target="_blank"-->
                                       <!--onclick="ga('send', 'event', 'SNS', 'Insta', 'All-menu');" class="insta"><i-->
                                        <!--class="blind">Instagram</i></a></li>-->
                                <!--<li><a href="https://twitter.com/teamblindapp" target="_blank"-->
                                       <!--onclick="ga('send', 'event', 'SNS', 'Twitter', 'All-menu');" class="tw"><i-->
                                        <!--class="blind">Twitter</i></a></li>-->
                                <!--<li><a href="https://medium.com/@BlindApp" target="_blank"-->
                                       <!--onclick="ga('send', 'event', 'SNS', 'Medium', 'All-menu');" class="md"><i-->
                                        <!--class="blind">Medium</i></a></li>-->
                                <!--<li><a href="/rss" onclick="ga('send', 'event', 'SNS', 'RSS', 'All-menu');"-->
                                       <!--class="rss_sns"><i-->
                                        <!--class="blind">RSS and Atom Feeds</i></a></li>-->
                            <!--</ul>-->
                        <!--</div>-->
                        <!--<div class="footer"><p class="copy">-->
                            <!--© 2018 Teamblind, Inc. <br><a href="/setting/privacy" target="_blank">Privacy</a> and <a-->
                                <!--href="/setting/term" target="_blank">Terms</a></p>-->
                            <!--<div class="appDown"><a class="apple"><i class="blind">appstore Download Link</i></a> <a-->
                                    <!--class="google"><i class="blind">playstore Download Link</i></a></div>-->
                        <!--</div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {modalMethods} from "../mixins/modalMethods";

    export default {
        name: 'Hamburger',
        mixins: [modalMethods]
    }
</script>

<style>
    .fnc_top {
        display: block;
        z-index: 10000;
        position: relative;
    }
    .fnc_top .welcome .signup {
        position: absolute;
        top: 20px;
        left: 30px;
        white-space: nowrap;
        font-size: 0;
        background-color: transparent;
    }

    .fnc_top .welcome .signup > button:first-of-type {
        margin-left: 0;
    }

    .fnc_top .welcome .signup .btn_logIn {
        background-color: #42424b;
    }

    .fnc_top .welcome .signup > button {
        color: #fff;
        font-size: 14px;
        font-weight: 400;
        background-color: #da3238;
        text-decoration: none;
        vertical-align: top;
        min-width: 80px;
        height: 26px;
        margin-left: 8px;
    }

    a, button, input {
        outline: none;
        -webkit-tap-highlight-color: transparent;
    }

    button {
        *overflow: visible;
        overflow: hidden;
        background-color: transparent;
        border: none;
        cursor: pointer;
        text-align: center;
    }
    ul {
        list-style: none;
    }
    .fnc_top .welcome .signup > button {
        color: #fff;
        font-size: 14px;
        font-weight: 400;
        background-color: #da3238;
        text-decoration: none;
        vertical-align: top;
        min-width: 80px;
        height: 26px;
        margin-left: 8px;
    }

    .ly_submenu {
        opacity: 1;
        position: absolute;
        z-index: 9999;
        width: 100%;
        top: 47px;
        box-shadow: 0 60px 60px 0 rgba(0, 0, 0, .1);
    }

    .submenu {
        padding-top: 69px;
        background: #fff;
        margin: 0 auto;
    }

    .ly_menu {
        position: relative;
        border-top: 1px solid #eceef3;
        min-height: 450px;
        height: auto;
        z-index: 1;
    }

    .ly_menu .gnb_list {
        padding: 14px 30px 16px;
    }

    .ly_menu .gnb_list ul li {
        position: relative;
        min-height: 43px;
    }

    fieldset, img, input, li {
        border: 0;
        vertical-align: top;
    }

    .topics_category .uselect {
        margin: 15px 0;
    }

    .uselect {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }

    .topics_category .uselect span:last-of-type a {
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 700;
    }
    .uselect span:last-of-type a {
        font-size: 12px;
        font-weight: 700;
        color: #222;
        padding-right: 13px;
    }
    a {
        text-decoration: none;
        cursor: pointer;
    }
    em, i {
        font-style: normal;
    }
    .topics_category .fnc {
        position: absolute;
        right: 0;
        top: 8px;
    }
    .topics_category .fnc .txt_manage {
        display: inline-block;
        margin-top: 7px;
        font-size: 12px;
        font-weight: 700;
        text-decoration: underline;
    }
    .topics_category .fnc span {
        text-transform: uppercase;
    }
    .topics_category .fnc>div {
        vertical-align: top;
        font-size: 0;
    }
    .topics_category .fnc .btn {
        display: inline-block;
        min-width: auto;
        line-height: 1.26em;
        padding: 6px 9.5px 5px;
        border: 1px solid #dfe1e4;
        border-radius: 0;
        vertical-align: top;
        margin-left: 5px;
        font-size: 12px;
        font-weight: 700;
        color: #94969b;
    }
    .topics_category .option {
        position: static;
        margin: 10px 0 8px;
    }
    .topics_category .option>span.select {
        cursor: pointer;
        color: #94969b;
    }
    .topics_category .option>span {
        display: inline-block;
        vertical-align: top;
        margin: 0;
        line-height: 1.26em;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
    }
    .topics_category .option>span.sort {
        color: #222;
    }
    .sort {
        margin-top: 15px;
        background: transparent;
        color: #94969b;
        font-size: 10px;
        line-height: 17px;
    }
    .topics_category .list {
        display: flex;
        flex-wrap: wrap;
    }
    .topics_category .list li {
        width: 50%;
        min-width: 0;
        padding: 0 18px 0 0;
        min-height: 38px!important;
        margin-top: 10px;
        box-sizing: border-box;
        line-height: 1.6em;
    }
    .topics_category .list li div.bx {
        position: relative;
        display: flex;
        align-items: center;
        height: 100%;
        font-size: 14px;
        font-weight: 300;
        padding: 0;
    }
    .topics_category .list li div.bx span {
        display: inline-block;
        word-break: break-all;
        word-wrap: break-word;
        letter-spacing: -.2px;
        line-height: 1.26em;
    }
    .point {
        color: #da3238;
    }
    .topics_category .list li.point .bx span:first-of-type {
        position: relative;
        display: inline-block;
    }
    .topics_category .list li.disabled .bx span {
        color: #94969b;
    }
    .topics_category .list li.point .bx span:first-of-type:after {
        content: "";
        position: absolute;
        top: 2px;
        right: -6px;
        width: 3px;
        height: 3px;
        border-radius: 100%;
        background-color: #da3238;
    }
</style>