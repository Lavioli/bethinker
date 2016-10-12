import React from 'react';
import ReactDOM from 'react-dom';
import {fetchStickies} from '../actions/actions'
import {connect} from 'react-redux';

var Login = React.createClass({
    
    onClicker: function (event) {
        event.preventDefault();
        this.props.fetchSticky();
    },
    
    render: function() {
        return (
            <div className="Login">
                <form className="login-page">
                    <legend>Login to your account</legend>
                    <span>Username:</span>
                    <input type="text" id="username" placeholder="Enter username" required />
                    
                    <span>Password:</span>
                    <input type="password" name="password" placeholder="Enter password" required />
                    <input type="submit" onClick={this.onClicker} value="Submit"></input>
                </form>
            </div>
        );
    }
});

export default Login;