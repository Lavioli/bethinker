import React from 'react';
import { connect } from 'react-redux';
import { fetchStickies } from '../actions/actions'
import { deleteSticky } from '../actions/actions'
import { editSticky } from '../actions/actions'


var Sticky = React.createClass({
	getInitialState: function() {
		return {
			highlight: false
		}
	},

	changeState: function() {
		this.setState({
			highlight: !this.state.highlight
		});
	},

	onClickDelete: function(e) {
		e.preventDefault();
		this.props.deleteSticky(this.props.stickyId);
	},

	onEditSticky: function(e) {
		e.preventDefault();
		var titleText = e.target[3].value;
		var contentText = e.target[4].value;
		this.props.editSticky(this.props.stickyId, titleText, contentText);
	},

	makeEditable: function () {
		var stickyTitle = this.props.title;
		var stickyContent = this.props.content;

		this.stickyDisplayMode = [
			<textarea className="title" rows="2" cols="49" onFocus="" key="0" defaultValue={stickyTitle} name="titleText" />,
			<textarea className="content"rows="5" cols="47" onClick="" key="1" defaultValue={stickyContent} name="contentText" />
		]
		this.refs.doneButton.className = "";
		this.refs.editButton.className = "hidden";
		this.forceUpdate();
	},

	componentWillMount: function() {
		var stickyTitle = this.props.title;
		var stickyContent = this.props.content;

		this.stickyDisplayMode = [
			<div className="title" rows="2" cols="49" onFocus="" key="0" >{stickyTitle}</div>,
			<div className="content"rows="5" cols="47" onClick="" key="1" >{stickyContent}</div>
		]
	},



	render: function() {
	
		var stickyId = this.props.stickyId;
		var stickyTitle = this.props.title;
		var stickyContent = this.props.content;

		//1st display: as divs
		//change textarea to divs

		return (
			<div className = "container">
				<form className="sticky_container" onSubmit={this.onEditSticky}>

					<input id="delete_button" type="button" value="Delete" onClick={this.onClickDelete} />
					<input id="edit_button" type="button" value="Edit" ref="editButton" onClick={this.makeEditable}/>
					<input id="done_button" className="hidden" type="submit" value="Done" ref="doneButton" />
					
					{this.stickyDisplayMode}
					
				</form>
				
			</div>	
	);
	}
});

var mapStateToProps = function(state) {
    return {
        currentUser: state.currentUser,
        stickies: state.stickies

    };
};

var mapDispatchToProps = function(dispatch) {
    return {
        fetchStickies: function(currentUser) {
            dispatch(fetchStickies(currentUser));
        },

        deleteSticky: function(stickyId) {
            dispatch(deleteSticky(stickyId));
        },

        editSticky: function(stickyId, title, content) {
            dispatch(editSticky(stickyId, title, content));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Sticky);