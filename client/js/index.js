import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var browserHistory = router.browserHistory;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndxRoute;
var Link = router.Link;
import App from '../components/App';
import Header from '../components/Header';
import Register from '../components/Register';
import Login from '../components/Login';
import Logout from '../components/Logout';
import StickyList from '../components/StickyList';
import reducers from '../reducers/reducers';

console.log(`Client running in ${process.env.NODE_ENV} mode`);

let store = createStore(reducers, applyMiddleware(thunk));

var routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/login" component={Login} />
            <Route path="/stickies" component={StickyList} />
            <Route path="/register" components={Register} />
            <Route path="/logout" components={Logout} />
        </Route>
    </Router>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <Provider store={store}>
            {routes}
        </Provider>,
        document.getElementById('app')
    );
});

exports.store = store;