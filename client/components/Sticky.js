import React from 'react';
import { connect } from 'react-redux';
import { fetchStickies } from '../actions/actions'
import { deleteSticky } from '../actions/actions'
import { editSticky } from '../actions/actions'

import Paper from 'material-ui/Paper'


import EditStickyModal from './EditStickyModal';


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
		this.props.deleteSticky(this.props.sticky._id);
	},
	
	render: function() {
		return (
			<div className = "container">
				<Paper zDepth={3} className="sticky_container" onSubmit={this.onEditSticky}>
				<form className="sticky_container">
					<div id="delete_button_container">
						<input id="delete_button" type="button" value="x" onClick={this.onClickDelete} />
						<EditStickyModal editSticky={this.props.editSticky.bind(this)} sticky={this.props.sticky}/>
						<div className="title" rows="2" cols="49" onFocus="" key="0" >{this.props.sticky.title}</div>
						<div className="content"rows="5" cols="47" onClick="" key="1" >{this.props.sticky.content}</div>
					</div>
				</Paper>
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
        deleteSticky: function(stickyId) {
            dispatch(deleteSticky(stickyId));
        },

        editSticky: function(stickyId, title, content) {
            dispatch(editSticky(stickyId, title, content));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Sticky);