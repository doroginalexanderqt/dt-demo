import moment from 'moment';

const TIME_FORMAT = 'MMMM Do YYYY, H:mm:ss';

const formatTime = ({ date, timezone, timezone_type }) =>
    `${moment(date).format(TIME_FORMAT)} (${timezone}${timezone_type > 0 ? `+${timezone_type}`: `-${timezone_type}`})`;

export default {
    formatTime
};
