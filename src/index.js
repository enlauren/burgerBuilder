import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider} from "react-redux";
import thunk from 'redux-thunk'
import {BrowserRouter } from "react-router-dom"



import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from  './store/reducers/order';
import authReducer from './store/reducers/UserAuth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    burger: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);

registerServiceWorker();
