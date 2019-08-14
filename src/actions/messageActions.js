import { createAction } from 'redux-actions';
import { messageActionTypes } from './types';

const messageReceive = createAction(messageActionTypes.MESSAGE_RECEIVE);

export default {
    messageReceive
};
