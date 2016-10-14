var React = require('react');
var connect = require('react-redux').connect;
import {logoutUser} from '../actions/actions';

var Logout = React.createClass({
    render: function (props){
        return (
            <div className="Logout">
                        <p>Thanks for stopping by, {this.props.previousUser}!</p>
                        <p>Remember, Stick It so you can Forget It.</p>
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
     
export default connect(mapStateToProps, mapDispatchToProps)(Logout);