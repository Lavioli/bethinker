import React from 'react';
import { postSticky } from '../actions/actions';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton'

var NewSticky = React.createClass({
    getInitialState: function() {
        return {
            show: false
        };
    },

    changeState: function () {
        this.setState({
            show: !this.state.show //toggle the add "+" button display
        });
    },

    onSubmitAddSticky: function(e) {
        e.preventDefault();
        (this.refs.contentText.value.length !== 0) ? this.props.onAddSubmit(this.refs.titleText.value, this.refs.contentText.value) : "";
        this.changeState();
    },

    onAddSticky: function() {
        return (
            <div className="sticky">
                <form className="sticky" onSubmit={this.onSubmitAddSticky}>
                    <span id="title">Title:</span>
                        <input type="text" id="title" ref="titleText" />
                    <span id="content">Content:</span>
                        <input type="text" name="content" ref="contentText" onBlur={this.onSubmitAddSticky} />
                        <input type="submit" value="Add Sticky" onClick={this.onSubmitAddSticky}/>
                </form>
            </div>
        )
    },

    render: function() {
        return (
            <div>
                <div className="add_sticky_button_container">
                    <FloatingActionButton type="button" className="add_sticky_button" onClick={this.changeState}>+</FloatingActionButton>
                </div>
                { (this.state.show == true)? this.onAddSticky(): '' }

            </div>
        );
    }
});

function mapDispatchToProps (dispatch) {
    return {
        onAddSubmit: function(title, content) {
            dispatch(postSticky(title, content));
        }
    };
}

export default connect(null, mapDispatchToProps)(NewSticky);
