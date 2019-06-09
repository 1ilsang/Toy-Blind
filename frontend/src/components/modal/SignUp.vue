<template>
    <!-- TODO :: phase 에 따른 몸집이 너무 비대해짐. 모듈화하자. -->
    <div class="ly_signup">
        <div class="top_area">
            <h2 class="tit" v-if="phase===1">Join Blind!</h2>
            <h2 class="tit" v-if="phase===2">Check your email</h2>
            <a @click="closeModal" class="btn_clse"><i class="blind">close</i></a>
        </div>
        <div class="contents">
            <div class="desc">
                <p v-if="phase===1">
                    Joining a new company? Stuck in your career?<br class="is_mobile">
                    Get raw and unfiltered career advice from verified employees, anonymously.
                </p>
                <div v-if="phase===2">
                    <p>
                        Enter the verification code we sent to <br class="is_mobile"> <strong>{{inputEmail}}</strong><br
                            class="is_mobile">
                        The code will expire shortly, so enter it soon.
                    </p>
                    <a><span class="change_email" @click="phase=1">Change email</span></a>
                </div>
            </div>
            <div class="usrform_wrap siginin" v-if="phase===1">
                <div class="signup_form">
                    <div class="fieldset" :class="serverCode">
                        <label for="signup-email" class="blind">Enter your work email</label>
                        <input type="text" id="signup-email" placeholder="Enter your work email." class="email"
                               v-model="inputEmail">
                    </div>
                    <div class="fieldsubmit">
                        <button type="button" name="button" @click="next" class="submit" :class="disabled"><strong
                                class="next">Next</strong>
                        </button>
                    </div>
                </div>
            </div>
            <span class="msg alert" v-if="serverCode==='error' && phase===1">
                            This email domain has been restricted from Blind. Please verify with a different email.
                        </span>
            <div class="motive" v-if="phase===1">
                Already have an account? <span class="login_link" @click="openModal('Login')">LOG IN</span></div>
            <div class="vcode_area" v-if="phase >= 2" :class="serverCode">
                <div class="vcode_wrap">
                    <input v-model="verifyCode" type="text" maxlength="6" placeholder="Enter verification code">
                </div>
                <div v-if="phase===3" class="phase3">
                    <br>
                    <input v-model="nickname" type="text" placeholder="Enter nickname"><br>
                    <input v-model="company" type="text" placeholder="Enter your company"><br>
                    <input v-model="password" type="password" placeholder="Enter password"><br>
                    <input v-model="password2" type="password" placeholder="One more enter password"><br>
                    <br><span>Select your Role</span><br>
                    <input type="radio" id="developer" value="Developer" v-model="role">
                    <label for="developer">Developer</label>
                    <input type="radio" id="HR" value="HR" v-model="role">
                    <label for="HR">HR</label>
                    <input type="radio" id="designer" value="Designer" v-model="role">
                    <label for="designer">Designer</label><br><br>
                    <button @click="submit">Submit</button>
                </div>
            </div>
            <span class="msg alert" v-if="tryCnt > 5">Verification failed [1069]</span>
            <span class="msg alert" v-if="tryCnt <= 5 && serverCode==='alert'">Invalid verification code. Please try again.</span>
            <div class="help" v-if="phase===1"><p class="why_email"><a href="https://us.teamblind.com/logic"
                                                                       target="_blank">Why Work
                Email?</a></p>
                By creating an account,<br class="is_mobile">
                you agree to our
                <span class="ui_underline"><a href="https://us.teamblind.com/setting/term"
                                              target="_blank">Terms of Use</a></span>
                and <span class="ui_underline"><a href="https://us.teamblind.com/setting/privacy" target="_blank">Privacy Policy</a></span>.
            </div>
            <div class="help" v-if="phase===2">
                Didn't get an email?<br class="is_mobile">
                Check your spam folder, or
                <span class="ui_underline"><a>Resend Code</a></span> <!----></div>
        </div>
    </div>
</template>

<script>
    import {modalMethods} from "../mixins/modalMethods";
    import server from '../../utils/server-host';

    export default {
        name: 'SignUp',
        mixins: [modalMethods],
        data() {
            return {
                phase: 1,
                inputEmail: '',
                tryCnt: 1,
                verifyCode: '',
                serverCode: '',
                disabled: 'disabled',
                isClick: false,
                nickname: '',
                password: '',
                password2: '',
                company: '',
                role: ''
            }
        },
        watch: {
            inputEmail: function () {
                this.serverCode = '';
                this.disabled = 'disabled';
            },
            verifyCode: function (value) {
                if (value.length !== 6 || this.tryCnt > 5 || this.phase === 3) return;

                this.$http.post(`${server.AuthServer}/auth/code`, {
                    "code": value,
                    "email": this.inputEmail
                }).then(() => {
                    this.phase = 3;
                    alert('Success!');
                }).catch(() => {
                    this.tryCnt++;
                    this.serverCode = 'alert';
                });
            }
        },
        methods: {
            next() {
                /*
                   TODO
                    1. 인증이 가능한 이메일 형식(회사)이면 페이즈 넘어가도록 추가
                        지금은 모든 이메일이 가입 가능한 상태.
                    2. .com 등 도메인 들어오면 NEXT 버튼 회색->검은색 처리 해줘야 함.
                        1번이 안되어있어 2번도 불가능
                 */
                // 요청 올때까지 한 번만 요청하도록 조정.
                if (this.isClick) return;
                else this.isClick = true;

                this.$http.post(`${server.AuthServer}/auth/signup`, {
                    "email": this.inputEmail
                }).then(() => {
                    this.phase = 2;
                    this.serverCode = '';
                }).catch((message) => {
                    this.serverCode = 'error';
                    this.disabled = '';
                    alert(`${message.response.data}`);
                }).finally(() => this.isClick = false);
            },
            submit() {
                if (this.password !== this.password2 || this.password.trim() === '' ||
                    this.inputEmail.trim() === '' || this.verifyCode.trim() === '' ||
                    this.nickname.trim() === '' || this.role.trim() === '' || this.company.trim() === '') {

                    alert('ERR: Please check your input.');
                    return;
                }

                this.$http.post(`${server.AuthServer}/auth/info`, {
                    'code': this.verifyCode,
                    'email': this.inputEmail,
                    'nickname': this.nickname,
                    'password': this.password,
                    'role': this.role,
                    'company': this.company
                }).then(() => {
                    alert('Success sign up!');
                    this.openModal('Login');
                }).catch((err) => {
                    alert(`fail, ${err}`);
                });
            }
        }
    }
</script>

<style>
    .ly_signup {
        font-size: 12px;
        min-height: 460px;
        padding: 30px;
        text-align: left;
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

    .ly_signup .contents {
        max-width: 100%;
        margin-top: 30px;
        padding: 0;
    }

    .ly_signup .contents .desc {
        font-size: 15px;
        font-weight: 400;
    }

    .is_mobile {
        display: inline-block;
    }

    .ly_signup .contents .usrform_wrap {
        margin-top: 40px;
    }

    .ly_signup .contents .usrform_wrap .fieldset {
        position: relative;
        margin-top: 8px;
        min-height: 48px;
        border: 1px solid #dfe1e4;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 15px;
        font-weight: 400;
    }

    .blind, .fullscreen-v-img .next-v-img i, .fullscreen-v-img .prev-v-img i, .fullscreen_attach .content_wrap .ly_attach .next i, .fullscreen_attach .content_wrap .ly_attach .prev i, legend {
        overflow: hidden;
        position: absolute;
        top: -999em;
        left: -999em;
        width: 1px;
        height: 1px;
        font-size: 1px;
        line-height: 0;
        margin: 0 !important;
        padding: 0 !important;
        white-space: nowrap;
        z-index: -1;
        visibility: hidden;
    }

    .ly_signup .contents .usrform_wrap .fieldset input {
        padding: 15px 16px;
        width: 100%;
        box-sizing: border-box;
        font-size: 15px;
        font-weight: 400;
    }

    .ly_signup .contents .usrform_wrap .fieldsubmit {
        margin-top: 8px;
    }

    .ly_signup .contents .fieldsubmit {
        font-size: 15px;
        font-weight: 400;
    }

    .ly_signup .fieldsubmit {
        position: relative;
    }

    .ly_signup .contents .fieldsubmit button.disabled, .ly_signup .contents .fieldsubmit button:disabled {
        background-color: #94969b;
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
        border: none;
    }

    .ly_signup .contents .fieldsubmit button strong {
        font-weight: 400;
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

    .ly_signup .contents .fieldsubmit button:after {
        content: "";
        position: absolute;
        right: 16px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-union.png) no-repeat;
        background-size: 600px 900px;
        background-position: -10px -304px;
    }

    .ly_signup .contents .motive {
        margin-top: 40px;
        font-size: 15px;
        font-weight: 400;
    }

    .ly_signup .contents .login_link {
        color: #37acc9;
        font-weight: 700;
    }

    .ly_signup .contents .motive + .help {
        margin-top: 40px;
    }

    .ly_signup .contents .help {
        color: #94969b;
        margin-top: 50px;
        font-size: 12px;
        font-weight: 400;
    }

    .ly_signup .contents .help .why_email {
        margin-bottom: 12px;
        text-decoration: underline;
    }

    .ui_underline {
        text-decoration: underline;
        cursor: pointer;
    }

    .ly_signup .contents .desc .change_email {
        position: relative;
        display: inline-block;
        margin-top: 12px;
        color: #37acc9;
        text-transform: uppercase;
        vertical-align: baseline;
        font-weight: 700;
    }

    .ly_signup .contents .desc .change_email:after {
        content: "";
        position: absolute;
        right: -18px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-union.png) no-repeat;
        background-size: 600px 900px;
        background-position: -62px -62px;
        margin-top: -.5px;
    }

    .ly_signup .contents .vcode_area {
        width: 100%;
        margin-top: 40px;
    }

    .ly_signup .contents .vcode_area .vcode_wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 80px;
        border: 1px solid #222;
        padding: 0 8px;
        box-sizing: border-box;
    }

    .ly_signup .contents .vcode_area .vcode_wrap input {
        width: 100%;
        font-size: 20px;
        font-weight: 400;
        color: #222;
        text-align: center;
    }

    .ly_signup .contents .msg {
        display: block;
        margin-top: 8px;
        min-height: 28px;
        font-size: 12px;
        font-weight: 400;
    }

    .ly_signup .contents .usrform_wrap .fieldset.error {
        border: 1px solid #da3238;
    }

    .ly_signup .contents .usrform_wrap .fieldset.error input {
        color: #da3238;
    }

    .ly_signup .contents .usrform_wrap .fieldset.error:after {
        content: "";
        position: absolute;
        right: 16px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-union.png) no-repeat;
        background-size: 600px 900px;
        background-position: -36px -88px;
    }

    .ly_signup .contents .msg.alert {
        color: #da3238;
    }

    .phase3 input{
        border: 1px solid lightgray;
        margin: 5px;
        width: 200px;
    }
    .phase3 input[type='radio'] {
        /*width: 10px;*/
    }
    .phase3 button {
        height: 40px;
        background-color: rgba( 100, 255, 255, 0.5 );
    }
</style>