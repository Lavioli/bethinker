// var React = require('react');
// var connect = require('react-redux').connect;

// var Link = require('react-router').Link;

// var actions = require('../actions/actions');

// import Header from './Header';
// import Login from './Login';

// var ChangePassword= React.createClass({
    
// var onSubmit = function (event) {
//     event.preventDefault();
//     this.props.onAddSubmit(this.props.onDeleteSubmit)
// }

//     render = function () {
//         return (
//             <div className="delete-account">
//                 <input type="submit" onClick={this.props.onSubmit} value="Change Password" className="change-password-button"></input>
//             </div>
//         );
//     };

// function mapDispatchToProps(state) {
//     return {
//         onDeleteSubmit: function(username, password) {
//             dispatch(deleteAccountRequest(username, password));
//         };
//     }
// }

// export default connect(null, mapDispatchToProps)(ChangePassword);