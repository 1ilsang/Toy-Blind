module.exports = (Vue) => {
    // dom 업데이트시 스크롤을 최하단으로 이동시킵니다.
    Vue.directive('auto-bottom', {
        update: (el) => {
            setTimeout(() => {
                el.scrollTop = el.scrollHeight;
            }, 0);
        },
    });
};