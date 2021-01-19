import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './common/reducers/allReducers';

const loadState = () => {

};

const saveState = (store) => {

};

export default function configureStore() {
    const state = loadState();
    const store = createStore(rootReducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)));
    // store.subscribe(() => {
    //     saveState(store.getState());
    // });
    return store;
}