import React from 'react';
import ReactDOM from 'react-dom';
import {loginRequest} from '../actions/actions'
import {connect} from 'react-redux';
import Login from './Login';

var Header = React.createClass({
    render: function(currentUser){
         if (!currentUser) {
        return [
            <li><Link to="/login">Sign In</Link></li>,
            <li>Register</li>
        ];
        } 
        else {
            return [
                <li>Welcome, {currentUser}!</li>,
                <li><Link to="/stickies">Stickies</Link></li>
            ];
        }
    }
});       

//     var renderLoginNav = (currentUser) => {
  
