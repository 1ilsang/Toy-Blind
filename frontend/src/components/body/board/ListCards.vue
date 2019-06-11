<template>
    <ul class="lst">
        <div v-for="(item, idx) in postList" :key="item.seq">
            <li class="word-break">
                <div class="mark">
                    <div class="tag_">
                        <a title="Tech Careers" class="topic" v-if="topic === 'Topics'">{{item.topic}}</a>
                    </div>
                </div>
                <router-link :to="item.title | urlTitleFilter(item.seq)" class="">
                    <div class="tit_area">
                        <div class="h_tit">
                            <strong>{{item.title}}</strong>
                            <span>{{item.description | reduceDescription }}</span>
                        </div>
                        <div class="attach" v-if="item.thumb_url !== null">
                            <div class="file">
                                <div><img :src=item.thumb_url alt="Image thumbnail"></div>
                            </div>
                        </div>
                    </div>
                </router-link>
                <div class="writer">
                    <div><span>{{item.company}}</span><span class="name">{{item.nickname}}</span></div>
                </div>
                <div class="info">
                    <a class="view">{{item.hit}}</a>
                    <a class="like">{{item.likes}}</a>
                    <a class="comment">{{item.comments}}</a>
                    <div class="opt">
                        <a class="time">{{item.u_created | convertDateToMonthDay }}</a>
                        <a class="save"><i class="blind">Bookmark</i></a>
                    </div>
                </div>
            </li>
        </div>
        <div v-if="isEnd" class="end">End of contents :)</div>
    </ul>
</template>

<script>
    import {dateFilters} from "../../mixins/dateUtils";
    import {convertDescription} from "../../mixins/descriptionUtils";

    export default {
        name: 'ListCards',
        mixins: [dateFilters, convertDescription],
        data() {
            return {
                boardSeq: 0,
                postList: [],
                topic: '',
                isEnd: false
            }
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                this.postList = [];
                this.boardSeq = 0;

                let boardSeq = this.boardSeq;
                let topic = this.topic = this.$route.path.substring(Number(this.$route.path.indexOf('/', 2) + 1));

                this.$store.dispatch('GET_POST_LIST', {topic, boardSeq})
                    .then((res) => {
                        this.postList.push(...res);
                        if (res.length < 5) this.boardSeq = 0;
                        else this.boardSeq = res[res.length - 1].seq - 1;
                    });
            },
            scroll() {
                window.onscroll = () => {
                    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

                    if (bottomOfWindow) {
                        let boardSeq = this.boardSeq;
                        let topic = this.topic;
                        if (boardSeq === 0) {
                            this.isEnd = true;
                            return;
                        }
                        this.$store.dispatch('GET_POST_LIST', {topic, boardSeq})
                            .then((res) => {
                                this.postList.push(...res);
                                this.boardSeq = res[res.length - 1].seq - 1;
                            });
                    }
                }
            }
        },
        mounted() {
            this.scroll();
        },
        created() {
            this.fetchData();
        }
    }
</script>

<style>
    .lst_area .lst li {
        display: inline-block;
        position: relative;
        width: 100%;
        padding: 0 30px 17px;
        border-bottom: 1px solid #eceef3;
        box-sizing: border-box;
    }

    .word-break {
        word-wrap: break-word;
        word-break: break-word;
    }

    .lst_area .lst li .tag_, .lst_area .lst li .tag_hot, .lst_area .lst li .tag_now {
        display: block;
        margin-top: 18px;
        vertical-align: top;
        font-size: 12px;
        font-weight: 400;
    }

    .lst_area .lst li .tag_ .topic, .lst_area .lst li .tag_hot .topic, .lst_area .lst li .tag_now .topic {
        display: inline-block;
        font-size: 12px;
        vertical-align: middle;
    }

    .lst_area .lst li .tag_ a, .lst_area .lst li .tag_hot a, .lst_area .lst li .tag_hot i, .lst_area .lst li .tag_ i, .lst_area .lst li .tag_now a, .lst_area .lst li .tag_now i {
        color: #94969b;
        font-style: normal;
        font-weight: 400;
        letter-spacing: .5px;
        cursor: pointer;
    }

    .lst_area .lst li .tit_area {
        display: table;
        width: 100%;
        padding-top: 11px;
        font-size: 20px;
        min-height: 48px;
    }

    .lst_area .lst li .tit_area .h_tit {
        display: table-cell;
        width: 75%;
        color: #222;
        vertical-align: top;
        line-height: 1.6em;
    }

    .lst_area .lst li .tit_area .h_tit span, .lst_area .lst li .tit_area .h_tit strong {
        display: block;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        word-wrap: break-word;
        word-break: break-word;
    }

    .lst_area .lst li .tit_area .h_tit strong {
        line-height: 21px;
        font-size: 18px;
        line-height: 1.33em;
        font-weight: 400;
    }

    .lst_area .lst li .tit_area .h_tit .ico, .lst_area .lst li .tit_area .h_tit .search .srch .btn_clse, .lst_area .lst li .tit_area .h_tit .search .srch .btn_prv, .search .srch .lst_area .lst li .tit_area .h_tit .btn_clse, .search .srch .lst_area .lst li .tit_area .h_tit .btn_prv {
        margin-top: -3px;
    }

    .ico_circle_link {
        width: 12px;
        height: 12px;
        background-position: -272px -368px;
    }

    .ico, .search .srch .btn_clse, .search .srch .btn_prv {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-set.png?20180406=) no-repeat;
        background-size: 325px 420px;
        margin-top: -1px;
    }

    .lst_area .lst li .tit_area .h_tit span {
        line-height: 1.5em;
        margin-top: 8px;
        color: #222;
        font-size: 13px;
        font-weight: 300;
    }

    .lst_area .lst li .tit_area .h_tit span, .lst_area .lst li .tit_area .h_tit strong {
        display: block;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        word-wrap: break-word;
        word-break: break-word;
    }

    .lst_area .lst li .tit_area .attach {
        display: table-cell;
        width: 25%;
        text-align: right;
        vertical-align: top;
        padding-left: 20px;
        box-sizing: border-box;
    }

    .lst_area .lst li .tit_area .attach a, .lst_area .lst li .tit_area .attach div.file {
        display: inline-block;
        position: relative;
        overflow: hidden;
        width: 85px;
        height: 85px;
        box-sizing: border-box;
    }

    .lst_area .lst li .tit_area .attach .file {
        margin-top: 4px;
    }

    .lst_area .lst li .tit_area .attach a img, .lst_area .lst li .tit_area .attach div.file img {
        width: 100%;
        height: 100%;
        -o-object-fit: cover;
        object-fit: cover;
    }

    .lst_area .lst li .tit_area .attach .more_img {
        position: absolute;
        top: 0;
        right: 0;
        width: 85px;
        height: 85px;
        background: rgba(0, 0, 0, .3);
        box-sizing: border-box;
    }

    .lst_area .lst li .tit_area .attach .more_img i {
        color: #fff;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        letter-spacing: 2.5px;
    }

    .lst_area .lst li .tit_area .attach .graph:before, .lst_area .lst li .tit_area .attach .more_img i, .ly_wrap div[class^=ly_], .middle, .wrap_memberOnly .members .in {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
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

    .info, .info a {
        position: relative;
    }

    .info a {
        margin-left: 17px;
        color: #222;
        font-size: 12px;
    }

    .info {
        margin-top: 12px;
        width: 100%;
        box-sizing: border-box;
        font-size: 12px;
    }

    .lst_area .lst li .info a:first-of-type {
        margin-left: 0;
    }

    .info a.view:before {
        width: 12px;
        height: 9px;
        background-position: -159px -5px;
        margin-right: 4px;
    }

    .info a:before {
        display: inline-block;
        height: 10px;
        margin-right: 5px;
        margin-top: -3px;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-set.png?20180406=) no-repeat;
        background-size: 325px 420px;
        vertical-align: middle;
        content: "";
    }

    .lst_area .lst li .info a:first-of-type {
        margin-left: 0;
    }

    .info a.like:before {
        width: 10px;
        background-position: -159px -48px;
        margin-right: 4px;
    }

    .info a:before {
        display: inline-block;
        height: 10px;
        margin-right: 5px;
        margin-top: -3px;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-set.png?20180406=) no-repeat;
        background-size: 325px 420px;
        vertical-align: middle;
        content: "";
    }

    .info a.comment:before {
        width: 12px;
        height: 10px;
        background-position: -159px -64px;
        cursor: pointer;
        margin-right: 3px;
        margin-top: -3px;
    }

    .info a:before {
        display: inline-block;
        height: 10px;
        margin-right: 5px;
        margin-top: -3px;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-set.png?20180406=) no-repeat;
        background-size: 325px 420px;
        vertical-align: middle;
        content: "";
    }

    .info .opt {
        float: right;
        text-align: right;
    }

    .info .opt .save {
        margin-left: 13px;
        padding-right: 0;
    }

    .info .opt a {
        color: #222;
        cursor: pointer;
    }

    .info .opt .save:before {
        margin-right: 0;
        width: 9px;
        height: 9px;
        background-position: -159px -82px;
    }

    .info a:before {
        display: inline-block;
        height: 10px;
        margin-right: 5px;
        margin-top: -3px;
        background: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www/sp-set.png?20180406=) no-repeat;
        background-size: 325px 420px;
        vertical-align: middle;
        content: "";
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

    .end {
        margin: 10px;
        text-align: center;
    }
</style>