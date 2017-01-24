var React = require('react');
var Link = require('react-router').Link;

module.exports = function () {
    return (
        <div className="homepage">
            <div id="app_title">BeThinker</div>
            <Link to="/login"></Link>
            <div id="app_subline">Stick it and Forget it!</div>
        </div>
    );
};