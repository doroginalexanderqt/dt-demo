import moment from 'moment';

const TIME_FORMAT = 'MMMM Do YYYY, H:mm:ss';

const formatTime = date => `${moment(date).format(TIME_FORMAT)}`;

export default {
    formatTime
};
