var React = require('react');
var connect = require('react-redux').connect;
var Link = require('react-router').Link;
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var actions = require('../actions/actions');
var Header = require('./Header');
var Login = require('./account/Login');

var App = function (props) {
    return (
        <MuiThemeProvider>
            <div className="App">
                <nav>
                    <ul>
                        <Header currentUser={props.currentUser} />
                    </ul>
                </nav>
                {props.children}
            </div>
        </MuiThemeProvider>
    );
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

module.exports = connect(mapStateToProps)(App);
