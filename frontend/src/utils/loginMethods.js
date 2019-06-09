import {EventBus} from "./event-bus";
import axios from "axios";

export const isLogin = () => {
    return JSON.parse(localStorage.getItem('userData'));
};

export const logout = () => {
    localStorage.removeItem('userData');
    delete localStorage.accessToken;
    EventBus.$emit('closeHamburgerMenu');
};

// 새로고침해도 엑세스토큰 헤더에 박도록 함.
export const enhanceAccessToken = () => {
    const {accessToken} = localStorage;
    if (!accessToken) return;
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};