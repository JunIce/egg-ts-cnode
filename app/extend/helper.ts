import * as dayjs from 'dayjs';

export default {
    formatDate: (date: Date) => dayjs(date).format('YYYY-MM-DD')
};
