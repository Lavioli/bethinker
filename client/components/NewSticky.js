import React from 'react';
import ReactDOM from 'react-dom';
import {postStickies} from '../actions/actions';
import {connect} from 'react-redux';

var Login = React.createClass({
    
    onSubmit: function () {
        this.props.onAddSubmit(this.refs.titleText.value, this.refs.contentText.value);
    },
    
    render: function() {
        return (
            <div className="Login">
                <form className="login-page">
                    <legend>Login to your account</legend>
                    <span>Title:</span>
                    <input type="text" id="title" ref="titleText" />
                    <span>Content:</span>
                    <input type="text" name="content" ref="contentText" onBlur={this.onSubmit} required />

                </form>
            </div>
        );
    }
});
        // this.refs.titleText.value = "";
        // this.refs.contentText.value = "";
                    // <input type="submit" onClick={this.onSubmit} value="Submit"></input>
function mapDispatchToProps (dispatch) {
    return {
        onAddSubmit: function(title, content) {
            dispatch(postStickies(title, content));
        }
    };
}

export default connect(null,mapDispatchToProps)(Login);