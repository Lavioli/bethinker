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
	
	doneEditing: function() {
		console.log(6)
		
		var stickyTitle = this.props.title;
		var stickyContent = this.props.content;
		
		this.stickyDisplayMode = [
			<div className="title" rows="2" cols="49" onFocus="" key="0" >{stickyTitle}</div>,
			<div className="content"rows="5" cols="47" onClick="" key="1" >{stickyContent}</div>
		]
		this.forceUpdate();
	},
	
	onEditSticky: function(e) {
		console.log(5)
		e.preventDefault();
		var titleText = e.target[3].value;
		var contentText = e.target[4].value;
		this.props.editSticky(this.props.stickyId, titleText, contentText);
		
		this.refs.doneButton.className = "hidden";
		this.refs.editButton.className = "";
		this.doneEditing();
	},

	makeEditable: function () {
		console.log(4)
		
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
		console.log(1)

		this.doneEditing();

		this.props.fetchStickies(this.props.currentUser);
		
	},
	// componentWillMount: function() {
 //       this.props.fetchStickies(this.props.currentUser);
 //   },
    componentDidMount: function() {
    	console.log(3)
        this.props.fetchStickies(this.props.currentUser);
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
					<div id="delete_button_container">
						<input id="delete_button" type="button" value="x" onClick={this.onClickDelete} />
						<input id="edit_button" type="button" value="/" ref="editButton" onClick={this.makeEditable}/>
						<input id="done_button" className="hidden" type="submit" value="o" ref="doneButton" />
						
						{this.stickyDisplayMode}
					</div>
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