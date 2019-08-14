import { messageActionTypes } from '../actions/types';

const messageReducer = (state = null, action) => {
    switch (action.type) {
    case messageActionTypes.MESSAGE_RECEIVE: {
        return {
            ...state,
            ...action.payload
        };
    }
    default:
        return state;
    }
};

export default messageReducer;
