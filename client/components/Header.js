import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
var Link = require('react-router').Link;

import Login from './Login';
import {loginRequest} from '../actions/actions'


var Header = function(props){
    console.log(this.props);
    if (!this.props.currentUser) {
        return [
            <li><Link to="/login">Sign In</Link></li>,
            <li>Register</li>
        ];
    } 
    else {
        return [
            <li>Welcome, {this.props.currentUser}!</li>,
            <li><Link to="/stickies">Stickies</Link></li>
        ];
    }
};
       

//     var renderLoginNav = (currentUser) => {
 
function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}
export default connect(mapStateToProps)(Header);