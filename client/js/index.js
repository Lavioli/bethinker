import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import StickyList from '../components/StickyList'
import stickyReducer from '../reducers/reducers.js'

console.log(`Client running in ${process.env.NODE_ENV} mode`);

let store = createStore(stickyReducer, applyMiddleware(thunk));

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <Provider store={store}>
            <StickyList />
        </Provider>,
        document.getElementById('app')
    );
});
//setup store

//store.dispatch();