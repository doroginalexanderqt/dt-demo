import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import messages from './messageReducer';

export default combineReducers({
    messages,
    routing
});
