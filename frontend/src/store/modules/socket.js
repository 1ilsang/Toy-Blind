import {PUSH_MSG_DATA, DELETE_MSG_DATA} from '../const/socket-type';

const state = {
    msgDatas: [],
};

const getters = {

};

const mutations = {
    [PUSH_MSG_DATA]: (state, payload) => {
        state.msgDatas.push(payload);
    },
    [DELETE_MSG_DATA]: (state) =>  {
        state.msgDatas = [];
    }
};

const actions = {

};

export default {
    state,
    getters,
    mutations,
    actions
}