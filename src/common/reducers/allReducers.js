import { combineReducers } from 'redux';
import authReducer from '../reducers/auth.reducer';
import feedReducer from '../reducers/feed.reducer';
import cartReducer from '../reducers/cart.reducer';
import menuReducer from './menu.reducer';
import orderReducer from './order.reducer';
import { LOGOUT } from '../actions/auth.actions';

const allReducers = combineReducers(
    {
        authentication: authReducer,
        feed: feedReducer,
        cart: cartReducer,
        menu: menuReducer,
        order: orderReducer
    }
);

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined;
        localStorage.clear();
    }
    return allReducers(state, action);
};

export default rootReducer;