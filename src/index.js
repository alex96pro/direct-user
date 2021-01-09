import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './common/reducers/allReducers';

const myStore = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);

// const MyStore = createStore(rootReducer, applyMiddleware(thunkMiddleware)); //PRODUCTION

ReactDOM.render(
    <Provider store={myStore}>
        <App />
    </Provider>,
    document.getElementById('root')
);
