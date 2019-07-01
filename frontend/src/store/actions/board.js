import {DELETE_POST, GET_POST, GET_POST_LIST, UPDATE_POST, WRITE_POST} from '../const/board-type';
import axios from 'axios';
import server from '../../const/server-host';

export const actions = {
    [GET_POST_LIST]({commit}, {topic, boardSeq}) {
        return axios.post(`${server.BoardServer}/board/list/${topic}`, {boardSeq})
            .then(({data}) => {
                return data.sort((a, b) => {
                    return a.seq > b.seq ? -1 : a.seq < b.seq ? 1 : 0;
                });
            });
    },
    [WRITE_POST]({commit}, {data, config}) {
        return axios.post(`${server.BoardServer}/board`, data, config.headers)
            .then(({data}) => {
                return data;
            });
    },
    [GET_POST]({commit}, boardSeq) {
        return axios.post(`${server.BoardServer}/board/article/view`, {
            'boardSeq': boardSeq
        }).then(({data}) => data);
    },
    [DELETE_POST]({commit}, boardSeq) {
        return axios.delete(`${server.BoardServer}/board/${boardSeq}`)
            .then(() => true)
            .catch(() => false);
    },
    [UPDATE_POST]({commit}, data) {
        return axios.put(`${server.BoardServer}/board/${data.boardSeq}`, data)
            .then(() => true)
            .catch(() => false);
    }
};
