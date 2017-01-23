import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
var Link = require('react-router').Link;

var actions = require('../actions/actions');

import Header from './Header';
import Login from './account/Login';

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

export default connect(mapStateToProps)(App);
