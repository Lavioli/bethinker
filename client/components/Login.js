import React from 'react';
import ReactDOM from 'react-dom';
import {loginRequest} from '../actions/actions'
import {connect} from 'react-redux';

var Login = React.createClass({
    
    onSubmit: function (event) {
        event.preventDefault();
        this.props.onAddSubmit(this.refs.usernameText.value, this.refs.passwordText.value);
        this.refs.usernameText.value = "";
        this.refs.passwordText.value = "";
    },
    
    render: function() {
        return (
            <div className="Login">
                <form className="login-page">
                    <legend>Login to your account</legend>
                    <span>Username:</span>
                    <input type="text" id="username" ref="usernameText" required />
                    
                    <span>Password:</span>
                    <input type="password" name="password" ref="passwordText" required />
                    <input type="submit" onClick={this.onSubmit} value="Submit"></input>
                </form>
            </div>
        );
    }
});


function mapDispatchToProps (dispatch) {
    return {
        onAddSubmit: function(username, password) {
            dispatch(loginRequest(username, password));
        }
    };
}

export default connect(null,mapDispatchToProps)(Login);