import { combineReducers } from 'redux';
import authReducer from '../reducers/auth.reducer';
import feedReducer from '../reducers/feed.reducer';
import { LOGOUT } from '../actions/auth.actions';

const allReducers = combineReducers(
    {
        authentication: authReducer,
        user: feedReducer
    }
);

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined;
    }
    return allReducers(state, action);
};

export default rootReducer;