export const convertDescription = {
    filters:  {
        reduceDescription(desc)  {
            if(desc.length < 200) return desc;
            return desc.substring(0, 200) + "...";
        },
        urlTitleFilter(str, seq) {
            // TODO 숫자 노출되는거 가리기
            // const bSeq = btoa(seq).replace(/_/g, '-').replace(/-/g, '+');
            return '/article/' + encodeURIComponent(str) + `-${seq}`;
        }
    }
};
