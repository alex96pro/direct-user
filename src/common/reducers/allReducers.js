import { combineReducers } from 'redux';
import authReducer from '../reducers/auth.reducer';
import feedReducer from '../reducers/feed.reducer';
import cartReducer from '../reducers/cart.reducer';
import menuReducer from './menu.reducer';
import { LOGOUT } from '../actions/auth.actions';

const allReducers = combineReducers(
    {
        authentication: authReducer,
        user: feedReducer,
        cart: cartReducer,
        menu: menuReducer
    }
);

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined;
    }
    return allReducers(state, action);
};

export default rootReducer;