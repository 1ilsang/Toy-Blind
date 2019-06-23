import axios from 'axios';
import server from '../../const/server-host';
import {DELETE_COMMENT, GET_COMMENT, GET_COMMENT_LIST, GET_MORE_COMMENTS, WRITE_COMMENT} from "../const/comment-type";
import router from '../../router';

export const actions = {
    [WRITE_COMMENT]({commit}, payload) {
        return axios.post(`${server.BoardServer}/comment`, payload)
            .then(() => true)
            .catch(() => false);
    },
    [GET_COMMENT_LIST]({commit}, payload) {
        return axios.post(`${server.BoardServer}/comment/list`, payload)
            .then(({data}) => {
                return data.sort((a, b) => {
                    return a.seq > b.seq ? -1 : a.seq < b.seq ? 1 : 0;
                });
            })
            .catch(() => false);
    },
    [GET_COMMENT]({commit}, {commentSeq}) {
        return axios.get(`${server.BoardServer}/comment/${commentSeq}`)
            .then(({data}) => data)
            .catch(() => false);
    },
    [GET_MORE_COMMENTS]({commit}, payload) {
        return axios.post(`${server.BoardServer}/comment/more`, payload)
            .then(({data}) => {
                return data.sort((a, b) => {
                    return a.seq > b.seq ? 1 : a.seq < b.seq ? -1 : 0;
                });
            })
            .catch(() => false);
    },
    [DELETE_COMMENT]({commit}, commentSeq) {
        return axios.delete(`${server.BoardServer}/comment/${commentSeq}`)
            .then(({data}) => data)
            .catch(() => false);
    }
};

