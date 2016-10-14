import React from 'react';
import ReactDOM from 'react-dom';
import {postSticky} from '../actions/actions';
import {editSticky} from '../actions/actions';
import {connect} from 'react-redux';
import {deleteSticky} from '../actions/actions';

var Login = React.createClass({
    
    onSubmit: function (event) {
        event.preventDefault();
        
        var form = event.target;
        var content = form.querySelector('[name="content"]').value;
        console.log(content);
        
        // this.props.onAddSubmit();
    },
    // this.refs.titleText.value, this.refs.contentText.value
    render: function() {
        return (
            <div className="sticky" onClick={this.onSubmit} ref="gogogo">
                <form className="sticky">
                    <span>Title:</span>
                    <textarea className="title" />
                    <span>Content:</span>
                    <textarea className="content" onBlur={this.onSubmit} required />
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
            dispatch(deleteSticky('57ff274bec0a9f07e539f5a6'));
        }
    };
}

export default connect(null,mapDispatchToProps)(Login);