import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
var Link = require('react-router').Link;

import actions from '../actions/actions';
import App from './App'

var Header = function(props) {
    var headerArr;
    if (!props.currentUser) {
        headerArr =
        [
            <li><Link to="/login">Sign In</Link></li>,
            <li><Link to="/register">Register</Link></li>
        ];
        return <span>{headerArr}</span>
    } 
    else {
        headerArr = [
            <li>Welcome, {props.currentUser}!</li>,
            <li><Link to="/stickies">Stickies</Link></li>,
            <li><Link to="/logout">Logout</Link></li>
        ];
        return <span>{headerArr}</span>
    }
}

export default Header;