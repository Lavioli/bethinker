var React = require('react');
var connect = require('react-redux').connect;


var Link = require('react-router').Link;

var actions = require('../actions/actions');

import Header from './Header';
import Login from './Login';

var App = function (props) {
    return (
        <div className="App">
            <nav>
                <ul>
                    <Header currentUser={props.currentUser} />
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