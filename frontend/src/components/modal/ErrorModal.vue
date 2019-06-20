<template>
    <!-- FIXME Error 으로 변경 -->
    <div aria-expanded="true" data-modal="login" class="v--modal-overlay scrollable">
        <div class="v--modal-top-right"></div>
        <div class="v--modal-box v--modal v--size-s">
            <div class="flex">
                <div class="ly_signup"><h1 class="blind">Error Modal</h1>
                    <div class="top_area"><h2 class="tit">Error Modal</h2> <a class="btn_clse" @click="closeModal()"><i
                            class="blind">close</i></a>
                    </div>
                    <div class="contents">
                        <div class="clst_wrap">
                            <ul class="loginform">
                                <li>
                                    <div class="input_wrap"><input type="text" placeholder="Enter your work email."
                                                                  >
                                    </div>
                                </li>
                                <li>
                                    <div class="input_wrap"><input type="password" placeholder="Password"
                                                                   ></div>
                                </li>
                            </ul>
                            <div class="fieldsubmit">
                                <button type="button" class="submit disabled" ><strong>Log in</strong>
                                </button> <!---->
                            </div>
                            <span class="msg alert" >
                            </span>
                            <div class="or"><span>or</span></div>
                            <div class="fieldsubmit security">
                                <button type="button" class="submit"><strong>Log in with security code</strong></button>
                            </div>
                        </div>
                        <div class="motive">New to Blind? <span class="login_link">SIGN UP</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {modalMethods} from "../mixins/modalMethods";

    export default {
        name: 'ErrorModal',
        mixins: [modalMethods]
    }
</script>

<style>
    .v--modal-overlay.scrollable {
        min-height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        font-size: 0;
        vertical-align: top;
    }

    .v--modal-overlay {
        position: fixed;
        box-sizing: border-box;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 10001;
        opacity: 1;
        font-size: 0;
        text-align: center;
        -webkit-tap-highlight-color: transparent;
    }

    .v--modal-top-right {
        display: none;
        position: absolute;
        right: 0;
        top: 0;
    }

    .v--modal-overlay.scrollable .v--modal-box {
        margin-bottom: 0;
    }

    .v--modal-overlay .v--modal {
        background: #fff;
        overflow-y: auto;
        font-size: 12px;
        height: 100%;
    }

    .v--modal-overlay .v--modal-box {
        position: relative;
        box-sizing: border-box;
        z-index: 9999;
    }

    .v--modal-overlay .v--modal .flex {
        text-align: left;
        height: 100%;
    }

    .ly_signup {
        font-size: 12px;
        min-height: 460px;
        padding: 30px;
    }

    .ly_signup .top_area {
        position: relative;
        padding: 0;
        box-sizing: border-box;
    }

    .ly_signup .top_area .tit {
        font-weight: 700;
        font-size: 20px;
        text-transform: uppercase;
    }

    .ly_signup .contents {
        max-width: 100%;
        margin-top: 30px;
        padding: 0;
    }

    .contents {
        position: relative;
        margin: 0 auto;
        padding: 0 30px;
    }

    .ly_signup .contents .clst_wrap {
        margin-top: 0;
    }

    .ly_signup .contents .clst_wrap .loginform {
        padding-top: 10px;
    }

    .ly_signup .contents .clst_wrap .loginform li:first-of-type {
        margin-top: 0;
    }

    .ly_signup .contents .clst_wrap .loginform .input_wrap {
        width: 100%;
        min-height: 48px;
        padding: 15px 16px;
        box-sizing: border-box;
        border: 1px solid #d9d9df;
    }

    .ly_signup .contents .clst_wrap .loginform .input_wrap input {
        width: 100%;
        font-size: 15px;
        font-weight: 400;
        border-radius: 0;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        border: 0;
        vertical-align: top;
    }

    .ly_signup .contents .clst_wrap .loginform + .fieldsubmit {
        margin-top: 8px;
    }

    .ly_signup .contents .fieldsubmit {
        font-size: 15px;
        font-weight: 400;
    }

    .ly_signup .fieldsubmit {
        position: relative;
    }

    .ly_signup .contents .or {
        display: flex;
        height: 54px;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: 400;
        color: #bbc0c5;
    }

    .ly_signup .contents .or:after, .ly_signup .contents .or:before {
        content: "";
        display: inline-flex;
        width: 50%;
        height: 1px;
        background-color: #dfe1e4;
    }

    .ly_signup .contents .or span {
        display: inline-block;
        margin: 0 8px;
        text-transform: uppercase;
    }

    .ly_signup .contents .or:after, .ly_signup .contents .or:before {
        content: "";
        display: inline-flex;
        width: 50%;
        height: 1px;
        background-color: #dfe1e4;
    }

    .ly_signup .contents .clst_wrap .fieldsubmit.security {
        margin-top: 0;
    }

    .ly_signup .contents .fieldsubmit {
        font-size: 15px;
        font-weight: 400;
    }

    .ly_signup .fieldsubmit {
        position: relative;
    }

    .ly_signup .contents .clst_wrap .fieldsubmit.security button {
        text-align: center;
        background-color: #37acc9;
    }

    .ly_signup .contents .clst_wrap .fieldsubmit button {
        padding: 15px;
    }

    .ly_signup .contents .fieldsubmit button {
        position: relative;
        display: block;
        width: 100%;
        height: 48px;
        background-color: #222;
        text-align: left;
        box-sizing: border-box;
        padding: 15px 0 15px 15.5px;
        text-transform: uppercase;
        color: #fff;
        cursor: pointer;
        font-size: 15px;
        font-weight: 400;
    }

    .ly_signup .contents .fieldsubmit button strong {
        font-weight: 400;
    }

    .ly_signup .contents .clst_wrap .loginform li {
        margin-top: 8px;
    }

    .ly_signup .contents .clst_wrap .loginform + .fieldsubmit button {
        text-align: center;
    }

    .ly_signup .top_area .btn_clse {
        position: absolute;
        right: 0;
        top: 0;
        width: 20px;
        height: 20px;
        cursor: pointer;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-union.png) no-repeat;
        background-size: 600px 900px;
        background-position: -40px -364px;
        z-index: 1;
    }

    .ly_signup .contents .msg.alert {
        color: #da3238;
    }

    .ly_signup .contents .msg {
        display: block;
        margin-top: 8px;
        min-height: 28px;
        font-size: 12px;
        font-weight: 400;
    }
</style>