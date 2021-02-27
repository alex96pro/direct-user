import { combineReducers } from 'redux';
import authReducer from '../reducers/auth.reducer';
import feedReducer from '../reducers/feed.reducer';
import cartReducer from '../reducers/cart.reducer';
import menuReducer from './menu.reducer';

const allReducers = combineReducers(
    {
        authentication: authReducer,
        feed: feedReducer,
        cart: cartReducer,
        menu: menuReducer
    }
);

export default allReducers;