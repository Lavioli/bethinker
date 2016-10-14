import React from 'react';
import ReactDOM from 'react-dom';
import {postSticky} from '../actions/actions';
import {editSticky} from '../actions/actions';
import {connect} from 'react-redux';
import {deleteSticky} from '../actions/actions';

var Login = React.createClass({
    
    onSubmit: function (event) {
        event.preventDefault();
        this.props.onAddSubmit();
    },
    // this.refs.titleText.value, this.refs.contentText.value
    render: function() {
        return (
            <div className="sticky">
                <form className="sticky">
                    <span>Title:</span>
                    <input type="text" id="title" ref="titleText" />
                    <span>Content:</span>
                    <input type="text" name="content" ref="contentText" onBlur={this.onSubmit} required />
                    <input type="submit" value="Submit" onClick={this.onSubmit} />
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
        onAddSubmit: function() {
            dispatch(deleteSticky('57ff2800ec0a9f07e539f5a8'));
        }
    };
}

export default connect(null,mapDispatchToProps)(Login);