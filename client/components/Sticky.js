import React from 'react';
import { connect } from 'react-redux';


var Sticky = React.createClass({

	onClickDelete: function(e) {
		e.preventDefault();
		this.props.deleteSticky(this.props.stickyId);


	},

	render: function() {
		
		var deleteThis = this.onClickDelete;
		var stickyId = this.props.stickyId;
		var stickyTitle = this.props.title;
		var stickyContent = this.props.content;

		return (
			<div className = "container">
				<div className="sticky_container" id={stickyId}>
					<div>
						<input type="submit" value="Delete" onClick={this.onClickDelete()} />
					</div>
					<div className="titles">{stickyTitle}</div>
					<div className="content">{stickyContent}</div>
				</div>
			</div>	
	);
	}
});

//working append
/*var Sticky = function (props) {
	var deleteThis = props.deleteSticky;

	return (
		<div className = "container">
			<div className="sticky_container" id={props.stickyId}>
				<div>
					<button type="button" onClick={deleteThis(props.stickyId)}>Delete</button>
				</div>
				<div className="titles">{props.title}</div>
				<div className="content">{props.content}</div>
			</div>
		</div>	
	);
};*/

export default Sticky;