import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';

import actions from '../actions/actions';
import App from './App'

var Header = function(props) {
    var headerArr;
    if (!props.currentUser) {
        headerArr =
        [
            <li key="1"><Link to="/login">Sign In</Link></li>,
            <li key="2"><Link to="/register">Register</Link></li>
        ];
        return <span><AppBar showMenuIconButton={false} title="Bethinker">{headerArr}</AppBar></span>
    }
    else {
        headerArr = [
            <li id="welcome_user" key="1">Welcome, {props.currentUser}!</li>,
            <li className="stickies_logout" key="2"><Link to="/myaccount">My Account</Link></li>,
            <li className="stickies_logout" key="3"><Link to="/stickies">My Stickies</Link></li>,
            <li className="stickies_logout" key="4"><Link to="/logout">Logout</Link></li>
        ];
        return <span><AppBar showMenuIconButton={false}>{headerArr}</AppBar></span>
    }
}

export default Header;
