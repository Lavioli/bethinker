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
                    <span className="username">Username:</span>
                    <input type="text" id="username" className="input" ref="usernameText" required />
                    
                    <span className="password">Password:</span>
                    <input type="password" className="input" name="password" ref="passwordText" required />
                    <input type="submit" id="submit" onClick={this.onSubmit} value="Submit" className="submit-button"></input>
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