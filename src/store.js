import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import allReducers from './common/reducers/allReducers';

const loadState = () => {
    const store = JSON.parse(localStorage.getItem("store"));
    let storeObject;
    if(store !== null){
        storeObject = {
            authentication: store.authentication,
            feed: { ...store.feed, endOfResultsFlag: false, meals:[], scrollCount: 1, redirectedToFeed: false, search:'' },
            cart: store.cart,
            menu: store.menu,
            modifiers: store.modifiers
        };
    }
    return storeObject;
};

const saveState = (state) => {
    localStorage.setItem("store", JSON.stringify(state));
};

export default function configureStore() {
    const state = loadState();
    const store = createStore(allReducers, state, composeWithDevTools(applyMiddleware(thunkMiddleware)));
    store.subscribe(() => {
        saveState(store.getState());
    });
    return store;
}