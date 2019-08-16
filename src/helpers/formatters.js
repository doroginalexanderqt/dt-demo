import moment from 'moment';

const TIME_FORMAT = 'MMMM Do YYYY, H:mm:ss';

const formatTime = ({ date, timezone, timezone_type: timeZoneType }) =>
    `${moment(date).format(TIME_FORMAT)} (${timezone}${timeZoneType > 0 ? `+${timeZoneType}`: `-${timeZoneType}`})`;

export default {
    formatTime
};
