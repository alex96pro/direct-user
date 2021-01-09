import { combineReducers } from 'redux';
import authReducer from '../reducers/auth.reducer';
import { LOGOUT } from '../actions/auth.actions';

const allReducers = combineReducers(
    {
        authentication:authReducer
    }
);

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined;
    }
    return allReducers(state, action);
};

export default rootReducer;