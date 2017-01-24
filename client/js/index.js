var React = require('react');
var ReactDOM = require('react-dom');
var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var thunk = require('redux-thunk').default;
var Provider = require('react-redux').Provider;
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var IndexRoute = router.IndexRoute;
var browserHistory = router.browserHistory;
var injectTapEventPlugin = require('react-tap-event-plugin');

var App = require('./components/App');
var Homepage = require('./components/Homepage');
var Register = require ('./components/account/Register');
var MyAccount = require('./components/account/MyAccount');
var Login = require('./components/account/Login');
var Logout = require('./components/account/Logout');
var StickyList = require('./components/sticky/StickyList');
var reducers = require('./reducers/reducers').stickyReducer;

//use with material-ui to prevent "Unknown prop 'onTouchTap' on <label> tag error"
injectTapEventPlugin();

console.log(`Client running in ${process.env.NODE_ENV} mode`);

var store = createStore(reducers, applyMiddleware(thunk));

var routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Homepage}/>
            <Route path="/login" component={Login} />
            <Route path="/myaccount" component={MyAccount} />
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