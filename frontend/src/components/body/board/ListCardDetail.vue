<template>
    <div>
        <div class="wrap_topic" v-if="modifyMode">
            <section class="topic_view">
                <div class="article seo modify">
                    <div class="tit_area">
                        <label>
                            <h1><input style="line-height: 40px; width: 250px" type="text"
                                       :value="post.title" @input="modifyTitle=$event.target.value" required></h1>
                        </label>
                        <div class="writer">
                            <div><span>{{post.company}}</span>
                                <span><span slot="reference"><a><span
                                        class="name">{{post.nickname}}</span></a></span></span>
                            </div>
                        </div>
                        <div class="tit_info">
                            <span :title="post.u_created"
                                  class="date">{{post.u_created | convertDateToMonthDay }}</span>
                        </div>
                        <div class="article_func" v-if="getUserData.seq === post.user_seq">
                            <ul>
                                <li>
                                    <div class="btn_close" @click="closeModify">Close</div>
                                </li>
                            </ul>
                        </div>
                    </div> <!---->
                    <div class="detail word-break">
                        <label>
                            <h1><input style="line-height: 40px; width: 250px" type="text"
                                       :value="post.description" @input="modifyDescription=$event.target.value" required></h1>
                        </label>
                        <div class="attach" v-if="post.img_url">
                            <img :src="post.img_url" alt="image"
                                 data-vue-img-src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/927/f2b0ec66afe7952bf832096573af56d0.jpeg"
                                 data-vue-img-group="articleGroup" style="cursor: pointer;">
                        </div>
                    </div>
                    <div class="info">
                        <button @click="modifyPost" style="margin-left: 78%;">> Submit <</button>
                    </div>
                </div>
            </section>
        </div>
        <div class="wrap_topic" v-if="!modifyMode">
            <section class="topic_view">
                <div class="article seo">
                    <div class="tit_area">
                        <h1 class="word-break">{{post.title}}</h1>

                        <div class="writer">
                            <div><span>{{post.company}}</span>
                                <span><span slot="reference"><a><span
                                        class="name">{{post.nickname}}</span></a></span></span>
                            </div>
                        </div>
                        <div class="tit_info">
                            <span :title="post.u_created"
                                  class="date">{{post.u_created | convertDateToMonthDay }}</span>
                        </div>
                        <div class="article_func" v-if="getUserData.seq === post.user_seq">
                            <ul>
                                <li>
                                    <div class="btn_save" @click="openModify">Modify</div>
                                </li>
                                <li>
                                    <div class="delete_btn" @click="deletePost">Delete</div>
                                </li>
                            </ul>
                        </div>
                    </div> <!---->
                    <div class="detail word-break">
                        <p id="contentArea">{{post.description}}</p>
                        <div class="attach" v-if="post.img_url">
                            <img :src="post.img_url" alt="image"
                                 data-vue-img-src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/927/f2b0ec66afe7952bf832096573af56d0.jpeg"
                                 data-vue-img-group="articleGroup" style="cursor: pointer;">
                        </div>
                    </div>
                    <div class="info">
                        <a class="like">{{post.likes}}</a>
                        <a class="comment">{{post.comments}}</a>
                    </div>
                </div>
                <div class="topic_comments">
                    <h2 class="blind">{{post.comments}}</h2>
                    <LoginPop v-if="!Boolean(getUserData.nickname)"></LoginPop>
                    <ListCardComments
                            v-on:deleteComment="deleteComment"
                            :boardSeq="boardSeq"
                            :comments="comments"
                            :totalCommentsCnt="this.post.comments"
                            v-on:updateReplyComments="updateReplyComments"
                    ></ListCardComments>
                    <div v-if="isEnd" class="end">End of contents :)</div>
                </div>
                <WriteComment v-on:updateComments="updateComments" :boardSeq="boardSeq" v-if="Boolean(getUserData.nickname)"></WriteComment>
            </section>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {dateFilters} from "../../mixins/dateUtils";
    import LoginPop from "./comment/LoginPop";
    import ListCardComments from "./comment/ListCardComments";
    import WriteComment from "./comment/WriteComment";

    export default {
        name: 'ListCardDetail',
        components: {WriteComment, ListCardComments, LoginPop},
        mixins: [dateFilters],
        computed: {
            ...mapGetters([
                'getUserData'
            ])
        },
        data() {
            return {
                post: {},
                boardSeq: '',
                commentSeq: 0,
                modifyMode: false,
                modifyTitle: '',
                modifyDescription: '',
                isEnd: false,
                comments: []
            }
        },
        methods: {
            getDetail() {
                this.modifyMode = false;
                const url = this.$route.path.split('-');
                const boardSeq = this.boardSeq = url[url.length - 1];
                this.$store.dispatch('GET_POST', boardSeq)
                    .then((res) => this.post = res);
            },
            deletePost() {
                if (!confirm('정말로 삭제하시겠습니까?')) return;
                this.$store.dispatch('DELETE_POST', this.boardSeq)
                    .then((res) => res ? this.$router.push('/') : alert('오류가 있습니다. 현상이 지속되면 고객지원팀에 문의해주세요.'));
            },
            modifyPost() {
                let title = this.modifyTitle.trim();
                let desc = this.modifyDescription.trim();
                if(title === undefined || title === '') title = this.post.title;
                if(desc === undefined || desc === '') desc =  this.post.description;

                const data = {
                    'boardSeq': this.boardSeq,
                    'title': title,
                    'description': desc
                };

                this.$store.dispatch('UPDATE_POST', data)
                    .then((res)=> res ? this.getDetail() : alert('오류가 있습니다. 현상이 지속되면 고객지원팀에 문의해주세요.'));
            },
            openModify() {
                this.modifyMode = true;
            },
            closeModify() {
                this.modifyMode = false;
            },
            updateComments(value) {
                if(value) {
                    this.comments = [];
                    this.isEnd = value.isEnd;
                    this.commentSeq = 0;
                }
                if(this.isEnd) return;
                let data = {
                    'boardSeq': this.boardSeq,
                    'commentSeq': this.commentSeq
                };
                this.$store.dispatch('GET_COMMENT_LIST', data)
                    .then((data) => {
                        this.comments.push(...data);
                        if(data.length < 5) {
                            this.isEnd = true;
                            return;
                        }
                        this.commentSeq = data[data.length - 1].seq;
                    });
            },
            updateReplyComments(data) {
                this.comments.find(e => e.seq === data[0].parent).reply.unshift(...data);
            },
            deleteComment(seq) {
                this.comments = this.comments.map(e => {
                    if(e.seq === seq) e.deleted = 1;
                    return e;
                });
            },
            scroll() {
                window.onscroll = () => {
                    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                    if (bottomOfWindow) this.updateComments();
                }
            }
        },
        created() {
            document.documentElement.scrollTop = 0;
            this.getDetail();
            this.updateComments();
            this.scroll();
        }
    }
</script>

<style>
    .article {
        padding: 0 30px;
        border-bottom: 1px solid #dfe1e4;
        background: #fff;
    }

    .modify {
        padding: 0 30px;
        border-bottom: 1px solid #dfe1e4;
        background: floralwhite;
    }

    .article .tit_area {
        position: relative;
        border-top: 1px solid transparent;
    }

    .article.seo .tit_area h1 {
        margin-top: 39px;
        margin-bottom: 0px;
    }

    .article .tit_area h1 {
        margin-top: 20px;
        font-size: 23px;
        font-weight: 400;
        line-height: 29px;
    }

    .word-break {
        word-wrap: break-word;
        word-break: break-word;
    }

    .article.seo .tit_area .writer {
        padding-right: 45px;
        margin-top: 20px;
    }

    .writer, .writer .name, .writer a, .writer span {
        color: #222;
    }

    .writer {
        position: relative;
        margin-top: 18px;
        font-size: 12px;
    }

    .sort, .writer {
        display: inline-block;
    }

    .writer, .writer .name, .writer a, .writer span {
        color: #222;
    }

    .writer, .writer .name, .writer a, .writer span {
        color: #222;
    }

    .writer, .writer .name, .writer a, .writer span {
        color: #222;
    }

    .writer span + span.name:before, .writer span + span span.name:before {
        display: inline-block;
        width: 2px;
        height: 2px;
        margin: -3px 4px 0 2px;
        background: #222;
        vertical-align: middle;
        content: "";
    }

    .article.seo .tit_area .tit_info {
        display: block;
        vertical-align: top;
        margin-top: 5px;
    }

    .article.seo .tit_area .tit_info span.date {
        margin-left: 0;
    }

    .article.seo .tit_area .tit_info .comment, .article.seo .tit_area .tit_info .date {
        margin-top: 0;
        font-size: 12px;
        color: #222;
    }

    .article.seo .tit_area .tit_info span {
        display: inline-block;
        margin-left: 12px;
    }

    .article .tit_area .date {
        display: block;
        margin-top: 6px;
        color: #222;
        font-size: 12px;
    }

    .article .tit_area .date:before {
        margin-top: -2px;
        content: "";
        display: inline-block;
        width: 10px;
        height: 10px;
        vertical-align: middle;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-set.png?20180406=) no-repeat;
        background-size: 325px 420px;
        background-position: -159px -118px;
        margin-right: 3px;
    }

    .article.seo .tit_area .tit_info .comment, .article.seo .tit_area .tit_info .date {
        margin-top: 0;
        font-size: 12px;
        color: #222;
    }

    .article.seo .tit_area .tit_info span {
        display: inline-block;
        margin-left: 12px;
    }

    .article.seo .tit_area .tit_info .comment:before {
        margin-top: -3px;
        content: "";
        display: inline-block;
        width: 11.5px;
        height: 10px;
        vertical-align: middle;
        margin-right: 3px;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-set.png?20180406=) no-repeat;
        background-size: 325px 420px;
        background-position: -159px -64px;
    }

    .article.seo .tit_area .article_func {
        top: inherit !important;
        bottom: 8.5px;
        padding-top: 0;
    }

    .article .tit_area .article_func {
        position: absolute;
        top: 25px;
        right: 0;
        padding-top: 3px;
    }

    .article .tit_area .article_func ul li:first-of-type {
        padding-left: 0;
    }

    .article .tit_area .article_func ul li {
        float: left;
        padding-left: 15px;
    }

    fieldset, img, input, li {
        border: 0;
        vertical-align: top;
    }

    .article .tit_area .article_func ul li a {
        cursor: pointer;
    }

    .delete_btn {
        margin-right: 15px;
        font-size: 0.5em;
        display: inline-block;
        width: 13px;
        height: 13px;
        background-size: 325px 420px;
        background-position: -215px -80px;
        background-color: navajowhite;
    }

    .btn_close {
        margin-right: 15px;
        font-size: 0.5em;
        display: inline-block;
        width: 13px;
        height: 13px;
        background-color: navajowhite;
        background-size: 325px 420px;
        background-position: -215px -80px;
    }

    .article .tit_area .btn_save {
        margin-right: 15px;
        font-size: 0.5em;
        display: inline-block;
        width: 13px;
        height: 13px;
        background-color: navajowhite;
        background-size: 325px 420px;
        background-position: -215px -80px;
    }

    .popper, .tooltip {
        position: absolute;
        text-align: center;
        border: 1px solid #94969b;
        z-index: 10002;
        background: #fff;
    }

    .popper .more_menu {
        padding: 9px;
        box-sizing: border-box;
        text-align: left;
    }

    .popper .more_menu ol {
        margin: 0;
        padding: 1px 0 0;
    }

    .popper .more_menu ol li {
        float: none !important;
        position: relative;
        padding-left: 0 !important;
        margin-left: 0 !important;
    }

    .popper .more_menu ol li a {
        padding: 0 !important;
        margin-right: 0 !important;
    }

    .popper .more_menu ol span {
        width: 100%;
        display: block;
        font-size: 11px;
        font-weight: 700;
        padding: 9.5px 10px 8px;
        white-space: nowrap;
        box-sizing: border-box;
    }

    .article.seo .detail {
        border-top: 0;
        margin-top: 0;
        padding: 40px 0;
    }

    .article .detail {
        margin-top: 17px;
        padding: 23px 0 30px;
        border-top: 1px solid #eceef3;
        font-size: 15px;
        line-height: 1.4em;
    }

    .word-break {
        word-wrap: break-word;
        word-break: break-word;
    }

    .article .info {
        border-top: 1px solid #eceef3;
        line-height: 60px;
        margin-top: 0;
    }

    button, dd, div, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, img, input, legend, li, ol, p, select, table, td, textarea, th, ul {
        margin: 0;
        padding: 0;
        color: #222;
        webkit-tap-highlight-color: transparent;
    }

    .topic_comments {
        border-top: 3px solid #eceef3;
        background: #fff;
    }

    .topic_comments .topic_comments_wrap {
        background: #eceef3;
        position: relative;
        margin-top: 0;
        padding-top: 5px;
        border-bottom: 1px solid #dfe1e4;
    }

    .topic_comments .topic_comments_wrap .sec_fnc.seo {
        min-height: 60px;
    }

    .topic_comments .topic_comments_wrap .sec_fnc {
        position: relative;
        min-height: 40px;
        background: #fff;
    }

    .topic_comments .topic_comments_wrap .sec_fnc.seo .select {
        top: 20px;
        right: 30px;
    }

    .topic_comments .topic_comments_wrap .sec_fnc .select {
        position: absolute;
        top: 14px;
        right: 28px;
        text-transform: uppercase;
    }

    .select {
        display: inline-block;
    }

    .select:before {
        position: relative;
        content: "";
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 0;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-union.png) no-repeat;
        background-size: 600px 900px;
        background-position: -114px -62px;
        vertical-align: top;
        margin-top: 2px;
    }

    .topic_comments .topic_comments_wrap .sec_fnc.seo .select span:last-of-type a {
        font-size: 12px;
    }

    .select span:last-of-type a {
        font-size: 10px;
        font-weight: 700;
        color: #222;
        padding-right: 0;
    }

    .topic_comments .topic_comments_wrap .sec_fnc.seo .comment {
        top: 21px;
        left: 30px;
    }

    .topic_comments .topic_comments_wrap .sec_fnc .comment {
        position: absolute;
        top: 21px;
        left: 30px;
        font-size: 14px;
        font-weight: 400;
    }

    .topic_comments .topic_comments_wrap .sec_fnc:after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: "";
        width: 100%;
        border-bottom: 1px solid #eceef3;
    }

    .topic_comments .topic_comments_wrap > ul {
        background: #fff;
    }

    .topic_comments .comment_area {
        padding: 0 30px;
        border-bottom: 1px solid #eceef3;
    }

    .topic_comments ul li {
        outline: 0;
    }

    .word-break {
        word-wrap: break-word;
        word-break: break-word;
    }

    .topic_comments .comment_area .writer {
        margin-top: 20px;
    }

    .writer, .writer .name, .writer a, .writer span {
        color: #222;
    }

    .writer {
        position: relative;
        margin-top: 18px;
        font-size: 12px;
    }

    .topic_comments .comment_area .writer span {
        color: #222;
    }

    .topic_comments .comment_area .detail {
        margin-top: 15px;
        font-size: 15px;
        line-height: 21px;
    }

    .topic_comments .comment_area .info {
        margin-top: 15px;
        padding-bottom: 19px;
    }

    .info, .info a {
        position: relative;
    }

    .info {
        margin-top: 12px;
        width: 100%;
        box-sizing: border-box;
    }

    .topic_comments .comment_area .info .date {
        font-size: 12px;
    }

    .topic_comments .comment_area .info .date:before {
        content: "";
        display: inline-block;
        width: 10px;
        height: 10px;
        vertical-align: middle;
        margin-right: 5px;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-set.png?20180406=) no-repeat;
        background-size: 325px 420px;
        background-position: -159px -118px;
        margin-top: -3px;
    }

    .topic_comments .comment_area .reply {
        margin: 0 -30px;
        border-top: 1px solid #eceef3;
        background: #f6f7fa;
    }

    .topic_comments .comment_area .reply .comment_area:last-of-type {
        border-bottom: none;
    }

    .topic_comments .comment_area .reply .comment_area {
        padding: 0 30px 0 50px;
    }

    .writer .op {
        position: absolute;
        top: 1px;
        right: -11px;
        color: red;
        width: 8px;
        height: 5px;
        text-indent: -10em;
        overflow: hidden;
        font-size: 0;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-set.png?20180406=) no-repeat;
        background-size: 325px 420px;
        background-position: -159px -372px;
    }

    .article .detail .attach {
        margin-top: 24px;
    }

    .article .detail .attach img:first-of-type {
        margin-top: 0;
    }

    .topic_view img {
        max-width: 100%;
        margin-top: 20px;
        text-indent: -99999px;
        display: block;
    }

</style>