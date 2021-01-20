import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './common/reducers/allReducers';

const loadState = () => {
    const cartProperties = JSON.parse(localStorage.getItem("cart"));
    let cart;
    if(cartProperties !== null){
        cart = {cart: cartProperties};
    }
    return cart;
};

const saveState = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

export default function configureStore() {
    const state = loadState();
    const store = createStore(rootReducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)));
    store.subscribe(() => {
        saveState(store.getState().cart);
    });
    return store;
}