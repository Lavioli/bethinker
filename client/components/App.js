var React = require('react');
var connect = require('react-redux').connect;

var Link = require('react-router').Link;

var actions = require('../actions/actions');

import Login from './Login';

var renderLoginNav = (currentUser) => {
    if (!currentUser) {
        return [
            <li><Link to="/login">Sign In</Link></li>,
            <li>Register</li>
        ];
    } else {
        return [
            <li>Welcome, {currentUser}!</li>,
            <li><Link to="/stickies">Stickies</Link></li>
        ];
    }
};
var App = function (props) {
    return (
        <div className="App">
            <nav>
                <ul>
                    {renderLoginNav(props.currentUser)}
                </ul>
            </nav>
            {props.children}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps)(App);