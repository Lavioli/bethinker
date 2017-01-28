var React = require('react');
var connect = require('react-redux').connect;

var logoutUser = require('../../actions/actions').logoutUser;

var Logout = React.createClass({
    render: function (props){
        return (
            <div className="Logout">
                <p className="logoutMessage">Thanks for stopping by, {this.props.previousUser}!</p>
                <p className="logoutMessage">Remember, Stick It so you can Forget It.</p>
            </div>
        );
    },

    componentWillMount: function(props) {
        this.props.logoutProcess();
    }
});

var mapStateToProps = function(state) {
        return {
            previousUser: state.previousUser
        };
};

var mapDispatchToProps = function(dispatch) {
        return {
            logoutProcess: function() {
                dispatch(logoutUser());
            }
        };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Logout);
