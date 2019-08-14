import { combineEpics } from 'redux-observable';
import messageEpic from './messageEpic';

export default combineEpics(
    messageEpic
);
