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
						<input type="submit" value="Delete" onClick={this.onClickDelete} />
					</div>
					<textarea className="title" rows="2" cols="49" onFocus="" value={stickyTitle} />
					<textarea className="content"rows="5" cols="47" onClick="" value={stickyContent} />
				</div>
			</div>	
	);
	}
});


export default Sticky;