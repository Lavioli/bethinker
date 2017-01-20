import React from 'react';
import ReactDOM from 'react-dom';
import { registerRequest } from '../actions/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router';

var MyAccountChoices = (currentUser) => {
    if (!currentUser) {
        return [
            <li key="1">Please login to review your account</li>
        ];
    } else {
        return [
             <li key="1"><Link to="myaccount/changepassword">Change Password</Link></li>,
             <li key="2"><Link to="myaccount/deleteaccount">Delete My Account</Link></li>
        ];
    }
};

var MyAccount = function (props) {
    return (
        <div className="my-account">
            <ul>
                {MyAccountChoices(props.currentUser)}
            </ul>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

function mapDispatchToProps (dispatch) {
    return {
        onRegisterSubmit: function(username, password) {
            dispatch(registerRequest(username, password));
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(MyAccount);
