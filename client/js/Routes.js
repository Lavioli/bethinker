var React = require('react');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndxRoute;
var Link = router.Link;

import App from '../components/App'
import Login from '../components/Login';
import StickyListContainer from '../components/StickyListContainer'

var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="/login" component={Login} />
            <Route path="/stickies" component={StickyListContainer} />
        </Route>
    </Router>
);

module.exports = routes;