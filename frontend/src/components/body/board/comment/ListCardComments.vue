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
            <span class="comment">{{ totalCommentsCnt }} Comments</span>
        </div>
        <ul>
            <li
                    v-for="(item, idx) in comments"
                    :key="idx"
                    class="comment_area word-break"
            >
                <div
                        v-if="item.deleted === 1"
                        class="content"
                >
                    <div class="writer">
                        -
                    </div>
                    <div class="detail">
                        삭제된 댓글입니다.
                    </div>
                    <div class="info">
                        <span class="date">{{ item.created | convertDateToMonthDay }}</span>
                    </div>
                </div>
                <div
                        v-else
                        class="content"
                >
                    <div class="writer">
                        <div>
                            <span>{{ item.company }}</span>
                            <span class="name">{{ item.nickname }}</span>
                        </div>
                    </div>
                    <span
                            v-if="item.user_seq === getUserData.seq"
                            class="delete_btn2"
                            @click="deleteComment(item.seq)"
                    >Delete</span>
                    <div class="detail">
                        {{ item.description }}
                    </div>
                    <div class="info">
                        <span class="date">{{ item.created | convertDateToMonthDay }}</span>
                        <a class="like">{{ item.likes }}</a>
                        <a class="comment">{{ item.replys }}</a>
                    </div>
                </div>
                <div v-if="item.reply" class="reply">
                    <ul>
                        <div
                                v-if="!isReplyEnd && item.reply.length > 4"
                                class="reply-comments-more"
                                @click="viewMoreReply(item)"
                        >
                            + VIEW MORE
                        </div>
                        <li
                                v-for="(e, idx) in item.reply"
                                :key="idx"
                                class="comment_area word-break"
                        >
                            <div class="content">
                                <div class="writer">
                                    <div v-if="e.deleted === 0">
                                        <span>{{ e.company }}</span>
                                        <span class="name">{{ e.nickname }}</span>
                                    </div>
                                    <!--<i class="op">OP</i>-->
                                </div>
                                <div class="detail">
                                    <span>{{ e.description }}</span>
                                </div>
                                <div class="info">
                                    <span class="date">{{ e.created | convertDateToMonthDay }}</span>
                                    <a
                                            v-if="e.deleted === 0"
                                            class="like"
                                    >{{ e.likes }}</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {dateFilters} from '../../../mixins/dateUtils';
import {mapGetters} from 'vuex';

export default {
    name: 'ListCardComments',
    mixins: [dateFilters],
    props: ['boardSeq', 'comments', 'totalCommentsCnt'],
    data() {
        return {
            isReplyEnd: false
        };
    },
    computed: {
        ...mapGetters([
            'getUserData'
        ])
    },
    methods: {
        deleteComment(seq) {
            this.$store.dispatch('DELETE_COMMENT', seq)
                .then(() => this.$emit('deleteComment', seq));
        },
        viewMoreReply(item) {
            let data = {
                boardSeq: item.board_seq,
                commentSeq: item.seq,
                lastReplySeq: item.reply[0].seq
            };
            this.$store.dispatch('GET_MORE_COMMENTS', data)
                .then(res => {
                    if (res.length > 0) this.$emit('updateReplyComments', res);
                    else this.isReplyEnd = true;
                });
        }
    }
};
</script>

<style>
.delete_btn2 {
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

.reply-comments-more {
    border: none;
    background-color: #eceef3;
    color: black;
    text-align: center;
    height: 30px;
    padding-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
}
</style>
