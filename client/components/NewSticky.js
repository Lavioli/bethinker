import React from 'react';
import ReactDOM from 'react-dom';
import {postSticky} from '../actions/actions';
import {connect} from 'react-redux';
// import FontAwesome from 'react-fontawesome';


var checkDisplay = false;

var NewSticky = React.createClass({
    getInitialState: function() {
        return {
            show: false
        };
    },
    changeState: function () {
        this.setState({
            show: !this.state.show
        });
    },

    onBlurSubmit: function() {
       this.props.onAddSubmit(this.refs.titleText.value, this.refs.contentText.value);
       this.changeState();
    },
    onAddSticky: function() {
        return (
            <div className="sticky">
                <form className="sticky" >
                    <span>Title:</span>
                        <input type="text" id="title" ref="titleText" />
                    <span>Content:</span>
                        <input type="text" name="content" ref="contentText" onBlur={this.onBlurSubmit} required />
                </form>
            </div>
        )
    },
    render: function() {
        console.log(this.state.show);
        return (
            <div>

                <div className="add_sticky_button">
                    <button type="button" onClick={this.changeState}>Add Sticky</button>
                </div>
                {(this.state.show == true)? this.onAddSticky(): ''}
                
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
            dispatch(postSticky(title, content));
        }
    };
}

export default connect(null,mapDispatchToProps)(NewSticky);