var React = require('react');
var connect = require('react-redux').connect;
var Link = require('react-router').Link;

var registerRequest = require('../../actions/actions').registerRequest;

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

module.exports = connect(mapStateToProps,mapDispatchToProps)(MyAccount);
