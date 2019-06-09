export const dateFilters = {
    filters: {
        convertDateToMonthDay(date) {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            let ret = new Date(date);
            return `${monthNames[ret.getMonth()]} ${ret.getDate()}`;
        }
    }
};