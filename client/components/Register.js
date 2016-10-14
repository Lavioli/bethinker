import React from 'react';
import ReactDOM from 'react-dom';
import {registerRequest} from '../actions/actions';
import {connect} from 'react-redux';

var Register = React.createClass({
    
    onLinkClick: function (event) {
        event.preventDefault();
        this.props.onRegisterSubmit(this.refs.usernameText.value, this.refs.passwordText.value);
        this.refs.usernameText.value = "";
        this.refs.passwordText.value = "";
    },
    
    render: function() {
        return (
            <div className="Register">
                <form className="register-page">
                    <legend>Register for an account</legend>
                    <span>Username:</span>
                    <input type="text" id="username" ref="usernameText" required />
                    
                    <span>Password:</span>
                    <input type="password" name="password" ref="passwordText" required />
                    <input type="submit" onClick={this.onLinkClick} value="Submit"></input>
                </form>
            </div>
        );
    }
});


function mapDispatchToProps (dispatch) {
    return {
        onRegisterSubmit: function(username, password) {
            dispatch(registerRequest(username, password));
        }
    };
}

export default connect(null,mapDispatchToProps)(Register);