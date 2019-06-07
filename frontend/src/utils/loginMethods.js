import {EventBus} from "./event-bus";

export const isLogin = () => {
    return JSON.parse(localStorage.getItem('userData'));
};

export const logout = () => {
    localStorage.removeItem('userData');
    delete localStorage.accessToken;
    EventBus.$emit('closeHamburgerMenu');
};