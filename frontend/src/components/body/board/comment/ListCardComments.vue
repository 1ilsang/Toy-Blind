<template>
    <div class="topic_comments_wrap">
        <div class="sec_fnc seo">
            <span class="select">
                <span>
                    <span style="display: none;">
                        <span class="popper">
                            <div class="more_menu menu_basic">
                                <ol>
                                    <li><a class="selected"><span class="item">TOP</span></a></li>
                                    <li><a class=""><span class="item">RECENT</span></a></li>
                                    <li><a class=""><span class="item">OLD</span></a></li>
                                </ol>
                            </div>
                        </span>
                    </span>
                    <span><a><i>TOP</i></a></span>
                </span>
            </span>
            <span class="comment">{{this.totalCommentsCnt}} Comments</span>
        </div>
        <ul>
            <li v-for="(item, idx) in comments" :key="idx" class="comment_area word-break">
                <div class="content" v-if="item.deleted === 1">
                    <div class="writer">
                        <div>
                        </div>
                    </div>
                    <div class="detail">삭제된 댓글입니다.</div>
                    <div class="info">
                        <span class="date">{{item.created | convertDateToMonthDay }}</span>
                    </div>
                </div>
                <div class="content" v-else>
                    <div class="writer">
                        <div>
                            <span>{{item.company}}</span>
                            <span class="name">{{item.nickname}}</span>
                        </div>
                    </div>
                    <span class="delete_btn" v-if="item.user_seq === getUserData.seq" @click="deleteComment(item.seq)">Delete</span>
                    <div class="detail">{{item.description}}</div>
                    <div class="info">
                        <span class="date">{{item.created | convertDateToMonthDay }}</span>
                        <a class="like">{{item.likes}}</a>
                        <a class="comment">{{item.replys}}</a>
                    </div>
                </div>
                <div class="reply" v-if="item.reply">
                    <ul>
                        <!-- TODO View more + -->
                        <li v-for="(e, idx) in item" :key="idx" class="comment_area word-break">
                            <div class="content">
                                <div class="writer">
                                    <div>
                                        <span>{{e.company}}</span>
                                        <span class="name">{{e.nickname}}</span>
                                    </div>
                                    <!--<i class="op">OP</i>-->
                                </div>
                                <div class="detail">
                                    <span>{{e.description}}</span>
                                </div>
                                <div class="info">
                                    <span class="date">{{e.created | convertDateToMonthDay }}</span><a class="like">{{e.likes}}</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
            <!--<li id="5153776" tabindex="0" class="comment_area word-break">-->
                <!--<div class="content">-->
                    <!--<div class="writer">-->
                        <!--<div>-->
                            <!--<span>Finisar</span>-->
                            <!--<span class="name">abc_xyz_1</span>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="detail"><span>Yes</span> &lt;!&ndash;&ndash;&gt;</div>-->
                    <!--<div class="info">-->
                        <!--<span class="date">Apr 29</span>-->
                        <!--<a class="like">1</a>-->
                        <!--<a class="comment">1</a>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="reply">&lt;!&ndash;&ndash;&gt;-->
                    <!--<ul>-->
                        <!--<li id="5153792" tabindex="0" class="comment_area word-break">-->
                            <!--<div class="content">-->
                                <!--<div class="writer">-->
                                    <!--<div>-->
                                        <!--<span>New</span>-->
                                        <!--<span class="name">h1Trauma</span>-->
                                    <!--</div>-->
                                    <!--<i class="op">OP</i>-->
                                <!--</div>-->
                                <!--<div class="detail">-->
                                    <!--<span>What law firm? Did they say any cut off date?</span>-->
                                <!--</div>-->
                                <!--<div class="info">-->
                                    <!--<span class="date">Apr 29</span> <a class="like">0</a>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</div>-->
            <!--</li>-->
            <!--<li id="5158955" tabindex="1" class="comment_area word-break">-->
                <!--<div class="content">-->
                    <!--<div class="writer">-->
                        <!--<div>-->
                            <!--<span>EA</span>-->
                            <!--<span>-->
                                <!--<span slot="reference">-->
                                    <!--<a><span class="name">mdyson</span></a>-->
                                <!--</span>-->
                            <!--</span>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="detail">-->
                        <!--<span>Yes still waiting. Lost all hopes though</span>-->
                    <!--</div>-->
                    <!--<div class="info">-->
                        <!--<span class="date">Apr 29</span>-->
                        <!--<a class="like">1</a>-->
                        <!--<a class="comment">0</a>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="reply" style="display: none;">-->
                    <!--<ul></ul>-->
                <!--</div>-->
            <!--</li>-->
        </ul>
    </div>
</template>

<script>
    import {dateFilters} from "../../../mixins/dateUtils";
    import {mapGetters} from "vuex";

    export default {
        name: 'ListCardComments',
        props: ['boardSeq', 'comments', 'totalCommentsCnt'],
        mixins: [dateFilters],
        computed: {
            ...mapGetters([
                'getUserData'
            ])
        },
        data() {
            return {}
        },
        methods: {
            deleteComment(seq) {
                this.$store.dispatch('DELETE_COMMENT', seq)
                    .then(() => this.$emit('deleteComment', seq));
            }
        },
        created() {

        }
    }
</script>

<style>
    .delete_btn {
        margin-top: 20px;
        margin-right: 0;
        font-size: 0.5em;
        float: right;
        width: auto;
        height: 13px;
        background-size: 325px 420px;
        background-position: -215px -80px;
        background-color: navajowhite;
    }
</style>