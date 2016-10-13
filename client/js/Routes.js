var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="/login" component={Login} />
            <Route path="/stickies" component={StickyListContainer} />
        </Route>
    </Router>
);

module.exports = routes;